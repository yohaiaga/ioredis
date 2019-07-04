import Command from "../../command";
import { deprecate } from "util";
import asCallback from "standard-as-callback";
import { exists, hasFlag } from "redis-commands";
import { generateMulti } from "cluster-key-slot";
import * as PromiseContainer from "../../promiseContainer";
import { CallbackFunction, ICommand } from "../../types";
import { Commander } from "..";
import { Cluster } from "../..";
import Script from "../../script";
import { ICommander } from "../../ICommander";
import { ICommanderOptions, ICommandSender } from "../../ICommandSender";
import { GenericCommand, commandList, generateFunction } from "../utils";

function isCluster(commander: Commander): commander is Cluster {
  return commander instanceof Cluster;
}

class Pipeline implements ICommandSender {
  private isCluster: boolean;
  private _queue: ICommand[] = [];
  private _result = [];
  private _transactions = 0;
  private preferKey?: string;
  private replyPending: number;
  public commanderOptions: ICommanderOptions;
  private _shaToScript: { [sha: string]: Script } = {};
  private nodeifiedPromise: boolean = false;
  private promise: Promise<any[]>;
  private leftRedirections: { value?: number };
  private resolve: (result: any[]) => void;
  private reject: (error: Error) => void;

  constructor(private redis: Commander) {
    Object.keys(redis.scriptsSet).forEach(name => {
      const script = redis.scriptsSet[name];
      this._shaToScript[script.sha] = script;
      this[name] = redis[name];
      this[name + "Buffer"] = redis[name + "Buffer"];
    });

    const Promise = PromiseContainer.get();
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    const _this = this;
    Object.defineProperty(this, "length", {
      get: function() {
        return _this._queue.length;
      }
    });
  }

  fillResult(value: any[], position: number): void {
    if (this._queue[position].name === "exec" && Array.isArray(value[1])) {
      const execLength = value[1].length;
      for (let i = 0; i < execLength; i++) {
        if (value[1][i] instanceof Error) {
          continue;
        }
        const cmd = this._queue[position - (execLength - i)];
        try {
          value[1][i] = cmd.transformReply(value[1][i]);
        } catch (err) {
          value[1][i] = err;
        }
      }
    }
    this._result[position] = value;

    if (--this.replyPending) {
      return;
    }

    const { redis: cluster } = this;
    if (isCluster(cluster)) {
      let retriable = true;
      let commonError: { name: string; message: string };
      let inTransaction: boolean;
      for (let i = 0; i < this._result.length; ++i) {
        var error = this._result[i][0];
        var command = this._queue[i];
        if (command.name === "multi") {
          inTransaction = true;
        } else if (command.name === "exec") {
          inTransaction = false;
        }
        if (error) {
          if (
            command.name === "exec" &&
            error.message ===
              "EXECABORT Transaction discarded because of previous errors."
          ) {
            continue;
          }
          if (!commonError) {
            commonError = {
              name: error.name,
              message: error.message
            };
          } else if (
            commonError.name !== error.name ||
            commonError.message !== error.message
          ) {
            retriable = false;
            break;
          }
        } else if (!inTransaction) {
          var isReadOnly =
            exists(command.name) && hasFlag(command.name, "readonly");
          if (!isReadOnly) {
            retriable = false;
            break;
          }
        }
      }
      if (commonError && retriable) {
        const errv = commonError.message.split(" ");
        const queue = this._queue;
        inTransaction = false;
        this._queue = [];
        for (let i = 0; i < queue.length; ++i) {
          if (
            errv[0] === "ASK" &&
            !inTransaction &&
            queue[i].name !== "asking" &&
            (!queue[i - 1] || queue[i - 1].name !== "asking")
          ) {
            const asking = new Command("asking");
            asking.ignore = true;
            this.sendCommand(asking);
          }
          queue[i].initPromise();
          this.sendCommand(queue[i]);
          if (queue[i].name === "multi") {
            inTransaction = true;
          } else if (queue[i].name === "exec") {
            inTransaction = false;
          }
        }

        let matched = true;
        if (typeof this.leftRedirections === "undefined") {
          this.leftRedirections = {};
        }
        const exec = () => {
          this.exec();
        };
        cluster.handleError(commonError, this.leftRedirections, {
          moved: (slot, key) => {
            this.preferKey = key;
            cluster.slots[errv[1]] = [key];
            cluster.refreshSlotsCache();
            this.exec();
          },
          ask: (slot, key) => {
            this.preferKey = key;
            this.exec();
          },
          tryagain: exec,
          clusterDown: exec,
          connectionClosed: exec,
          maxRedirections: () => {
            matched = false;
          },
          defaults: () => {
            matched = false;
          }
        });
        if (matched) {
          return;
        }
      }
    }

    let ignoredCount = 0;
    for (let i = 0; i < this._queue.length - ignoredCount; ++i) {
      if (this._queue[i + ignoredCount].ignore) {
        ignoredCount += 1;
      }
      this._result[i] = this._result[i + ignoredCount];
    }
    this.resolve(this._result.slice(0, this._result.length - ignoredCount));
  }

  public sendCommand(command: ICommand): this {
    const position = this._queue.length;

    command.promise
      .then(result => {
        this.fillResult([null, result], position);
      })
      .catch(error => {
        this.fillResult([error], position);
      });

    this._queue.push(command);

    return this;
  }

  addBatch(commands: [keyof ICommander, ...any[]][]): this {
    for (let i = 0; i < commands.length; ++i) {
      const command = commands[i];
      const commandName = command[0];
      const args = command.slice(1);
      this[commandName].apply(this, args);
    }

    return this;
  }

  public multi(callback?: CallbackFunction<any>): this {
    this._transactions += 1;
    super.multi(...arguments);
    return this;
  }

  public exec(callback?: CallbackFunction<any>): Promise<any> {
    if (this._transactions > 0) {
      this._transactions -= 1;
      return this.execBuffer.apply(this, arguments);
    }
    if (!this.nodeifiedPromise) {
      this.nodeifiedPromise = true;
      asCallback(this.promise, callback);
    }
    if (!this._queue.length) {
      this.resolve([]);
    }
    let pipelineSlot: number;
    if (this.isCluster) {
      // List of the first key for each command
      const sampleKeys: (string | Buffer)[] = [];
      for (let i = 0; i < this._queue.length; i++) {
        const keys = this._queue[i].getKeys();
        if (keys.length) {
          sampleKeys.push(keys[0]);
        }
      }

      if (sampleKeys.length) {
        pipelineSlot = generateMulti(sampleKeys);
        if (pipelineSlot < 0) {
          this.reject(
            new Error("All keys in the pipeline should belong to the same slot")
          );
          return this.promise;
        }
      } else {
        // Send the pipeline to a random node
        pipelineSlot = (Math.random() * 16384) | 0;
      }
    }

    // Check whether scripts exists
    const scripts = [];
    for (let i = 0; i < this._queue.length; ++i) {
      var item = this._queue[i];
      if (this.isCluster && item.isCustomCommand) {
        this.reject(
          new Error(
            "Sending custom commands in pipeline is not supported in Cluster mode."
          )
        );
        return this.promise;
      }
      if (item.name !== "evalsha") {
        continue;
      }
      const script = this._shaToScript[item.args[0]];
      if (!script) {
        continue;
      }
      scripts.push(script);
    }

    var _this = this;
    if (!scripts.length) {
      return execPipeline();
    }

    return this.redis
      .script("exists", Array.from(new Set(scripts.map(({ sha }) => sha))))
      .then(function(results) {
        var pending = [];
        for (var i = 0; i < results.length; ++i) {
          if (!results[i]) {
            pending.push(scripts[i]);
          }
        }
        var Promise = PromiseContainer.get();
        return Promise.all(
          pending.map(function(script) {
            return _this.redis.script("load", script.lua);
          })
        );
      })
      .then(execPipeline);

    function execPipeline() {
      let data: Buffer | string = "";
      let writePending: number = (_this.replyPending = _this._queue.length);

      let node;
      if (_this.isCluster) {
        node = {
          slot: pipelineSlot,
          redis: _this.redis.connectionPool.nodes.all[_this.preferKey]
        };
      }
      let bufferMode = false;
      const stream = {
        write: function(writable) {
          if (writable instanceof Buffer) {
            bufferMode = true;
          }
          if (bufferMode) {
            data = Buffer.concat([
              typeof data === "string" ? Buffer.from(data, "utf8") : data,
              typeof writable === "string"
                ? Buffer.from(writable, "utf8")
                : writable
            ]);
          } else {
            data += writable;
          }
          if (!--writePending) {
            if (_this.isCluster) {
              node.redis.stream.write(data);
            } else {
              _this.redis.stream.write(data);
            }

            // Reset writePending for resending
            writePending = _this._queue.length;
            data = "";
            bufferMode = false;
          }
        }
      };

      for (let i = 0; i < _this._queue.length; ++i) {
        _this.redis.sendCommand(_this._queue[i], stream, node);
      }
      return _this.promise;
    }
  }
}

export { Pipeline };

interface Pipeline {
  call: GenericCommand<Pipeline>;
  callBuffer: GenericCommand<Pipeline>;
}

Pipeline.prototype.call = generateFunction<Pipeline>("utf8");
Pipeline.prototype.callBuffer = generateFunction<Pipeline>(null);

type PipelineCommander = {
  [P in Exclude<keyof ICommander, "exec">]: ICommander[P] extends (
    ...args: infer U
  ) => infer R
    ? (...args: U) => Pipeline
    : ICommander[P];
};

interface Pipeline extends PipelineCommander {}

commandList.forEach(commandName => {
  if (commandName === "exec") {
    return;
  }
  Pipeline.prototype[commandName] = generateFunction<Pipeline>(
    commandName,
    "utf8"
  );
  Pipeline.prototype[commandName + "Buffer"] = generateFunction<Pipeline>(
    commandName,
    null
  );
});
