import { wrapMultiResult } from "./utils";
import asCallback from "standard-as-callback";
import { Pipeline } from "./Commander/Pipeline";
import { CallbackFunction } from "./types";
import { ICommander } from "./ICommander";
import { Commander } from "./commander";

interface IMultiOptions {
  pipeline: boolean;
}

export interface ITransaction {
  pipeline(commands?: [keyof ICommander, ...any[]][]): Pipeline;
  multi(options?: IMultiOptions): Pipeline;
  multi(
    commands: [keyof ICommander, ...any[]][],
    options?: IMultiOptions
  ): Pipeline;
  exec(callback?: CallbackFunction): Promise<any>;
}

export function addTransactionSupport(redis: Commander) {
  (<any>redis).pipeline = function(
    commands?: [keyof ICommander, ...any[]][]
  ): Pipeline {
    const pipeline = new Pipeline(this);
    if (Array.isArray(commands)) {
      pipeline.addBatch(commands);
    }
    return pipeline;
  };

  const { multi } = <any>redis;
  (<any>redis).multi = function(
    commands?: [keyof ICommander, ...any[]][] | null,
    options?: IMultiOptions
  ): Pipeline {
    if (typeof options === "undefined" && !Array.isArray(commands)) {
      options = commands;
      commands = null;
    }
    if (options && options.pipeline === false) {
      return multi.call(this);
    }
    const pipeline = new Pipeline(this);
    pipeline.multi();
    if (Array.isArray(commands)) {
      pipeline.addBatch(commands);
    }
    const exec = pipeline.exec;
    pipeline.exec = function(callback: CallbackFunction) {
      if (this._transactions > 0) {
        exec.call(pipeline);
      }

      // Returns directly when the pipeline
      // has been called multiple times (retries).
      if (this.nodeifiedPromise) {
        return exec.call(pipeline);
      }
      const promise = exec.call(pipeline);
      return asCallback(
        promise.then(function(result) {
          const execResult = result[result.length - 1];
          if (typeof execResult === "undefined") {
            throw new Error(
              "Pipeline cannot be used to send any commands when the `exec()` has been called on it."
            );
          }
          if (execResult[0]) {
            execResult[0].previousErrors = [];
            for (let i = 0; i < result.length - 1; ++i) {
              if (result[i][0]) {
                execResult[0].previousErrors.push(result[i][0]);
              }
            }
            throw execResult[0];
          }
          return wrapMultiResult(execResult[1]);
        }),
        callback
      );
    };

    return pipeline;
  };

  const { exec } = redis;
  redis.exec = function(callback: CallbackFunction) {
    return asCallback(
      exec.call(this).then(function(results) {
        if (Array.isArray(results)) {
          results = wrapMultiResult(results);
        }
        return results;
      }),
      callback
    );
  };
}
