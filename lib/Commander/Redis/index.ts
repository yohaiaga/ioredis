import { noop } from "../../utils/lodash";
import Deque = require("denque");
import Command from "../../command";
import { Commander } from "..";
import { isInt, CONNECTION_CLOSED_ERROR_MSG, Debug, toInt } from "../../utils";
import asCallback from "standard-as-callback";
import * as eventHandler from "./eventHandler";
import { StandaloneConnector, SentinelConnector } from "./connectors";
import ScanStream from "../../ScanStream";
import * as commands from "redis-commands";
import * as PromiseContainer from "../../promiseContainer";
import { addTransactionSupport } from "../../transaction";
import {
  IRedisOptions,
  ReconnectOnError,
  IInternalRedisOptions
} from "./RedisOptions";
import { parseOptions } from "./utils";
import { IConnector, NetStream } from "./connectors/types";
import { CallbackFunction, ICommand, ConnectionStatus } from "../../types";
import { ICondition, IRedisQueueItem } from "./types";

const debug = Debug("redis");

interface IFlushQueueOptions {
  offlineQueue: boolean;
  commandQueue: boolean;
}

/**
 * Creates a Redis instance
 *
 * @param {(number|string|Object)} [port=6379] - Port of the Redis server,
 * or a URL string(see the examples below),
 * or the `options` object(see the third argument).
 * @param {string|Object} [host=localhost] - Host of the Redis server,
 * when the first argument is a URL string,
 * this argument is an object represents the options.
 * @param {number} [options.port=6379] - Port of the Redis server.
 * @param {string} [options.host=localhost] - Host of the Redis server.
 * @param {string} [options.family=4] - Version of IP stack. Defaults to 4.
 * @param {string} [options.path=null] - Local domain socket path. If set the `port`,
 * `host` and `family` will be ignored.
 * @param {boolean} [options.enableTLSForSentinelMode=false] - Whether to support the `tls` option
 * when connecting to Redis via sentinel mode.
 * @param {NatMap} [options.natMap=null] NAT map for sentinel connector.
 * @param {boolean} [options.updateSentinels=true] - Update the given `sentinels` list with new IP
 * addresses when communicating with existing sentinels.
 * @example
 * ```js
 * const Redis = require('ioredis');
 *
 * const redis = new Redis();
 *
 * const redisOnPort6380 = new Redis(6380);
 * const anotherRedis = new Redis(6380, '192.168.100.1');
 * const unixSocketRedis = new Redis({ path: '/tmp/echo.sock' });
 * const unixSocketRedis2 = new Redis('/tmp/echo.sock');
 * const urlRedis = new Redis('redis://user:password@redis-service.com:6379/');
 * const urlRedis2 = new Redis('//localhost:6379');
 * const authedRedis = new Redis(6380, '192.168.100.1', { password: 'password' });
 * ```
 */
class Redis extends Commander {
  protected retryAttempts: number;
  protected connector: IConnector;
  public commandQueue: Deque<IRedisQueueItem>;
  protected serverInfo: { [key: string]: any };
  protected prevCommandQueue?: Deque;
  protected offlineQueue: Deque<IRedisQueueItem>;
  private _status: ConnectionStatus;
  public stream?: NetStream;
  protected manuallyClosing: boolean;
  protected reconnectTimeout: NodeJS.Timeout | null;
  public condition: ICondition;
  public prevCondition: ICondition | null;
  public options: IInternalRedisOptions;

  public get status(): ConnectionStatus {
    return this._status;
  }

  /**
   * Create a Redis instance
   */
  public static createClient(...args: any[]): Redis {
    return new Redis(args[0], args[1], args[2]);
  }

  public constructor(
    port: number,
    host: string,
    options: Partial<IRedisOptions>
  );
  public constructor(path: string, options: Partial<IRedisOptions>);
  public constructor(port: number, options: Partial<IRedisOptions>);
  public constructor(port: number, host: string);
  public constructor(options: Partial<IRedisOptions>);
  public constructor(path: string);
  public constructor(port?: number);
  public constructor() {
    const options = parseOptions(arguments[0], arguments[1], arguments[2]);
    super(options);

    this.options = options;

    this.retryAttempts = 0;
    this.manuallyClosing = false;

    this.resetCommandQueue();
    this.resetOfflineQueue();

    if (options.Connector) {
      this.connector = new this.options.Connector(options);
    } else if (options.sentinels) {
      this.connector = new SentinelConnector(options);
    } else {
      this.connector = new StandaloneConnector(options);
    }

    // end(or wait) -> connecting -> connect -> ready -> end
    if (options.lazyConnect) {
      this.setStatus("wait");
    } else {
      this.connect().catch(noop);
    }
  }

  protected resetCommandQueue() {
    this.commandQueue = new Deque();
  }

  protected resetOfflineQueue() {
    this.offlineQueue = new Deque();
  }

  /**
   * Change instance's status
   */
  protected setStatus(status: ConnectionStatus, arg?: any) {
    // @ts-ignore
    if (debug.enabled) {
      debug(
        "status[%s]: %s -> %s",
        this._getDescription(),
        this.status || "[empty]",
        status
      );
    }
    this._status = status;
    process.nextTick(this.emit.bind(this, status, arg));
  }

  /**
   * Create a connection to Redis.
   *
   * This method will be invoked automatically when creating a new Redis instance
   * unless `lazyConnect: true` is passed.
   *
   * @param callback
   * @returns A Promise that resolved/rejected when the first attempt of
   *          connecting is finished.
   */
  public connect(callback?: CallbackFunction<void>): Promise<void> {
    var _Promise = PromiseContainer.get();
    var promise = new _Promise((resolve, reject) => {
      if (
        this.status === "connecting" ||
        this.status === "connect" ||
        this.status === "ready"
      ) {
        reject(new Error("Redis is already connecting/connected"));
        return;
      }
      this.setStatus("connecting");

      const { options } = this;

      this.condition = {
        select: options.db,
        auth: options.password,
        subscriber: false
      };

      var _this = this;
      asCallback(
        this.connector.connect(function(type, err) {
          _this.silentEmit(type, err);
        }),
        function(err, stream) {
          if (err) {
            _this.flushQueue(err);
            _this.silentEmit("error", err);
            reject(err);
            _this.setStatus("end");
            return;
          }
          var CONNECT_EVENT = options.tls ? "secureConnect" : "connect";
          if (options.sentinels && !options.enableTLSForSentinelMode) {
            CONNECT_EVENT = "connect";
          }

          _this.stream = stream;
          if (typeof options.keepAlive === "number") {
            stream.setKeepAlive(true, options.keepAlive);
          }

          stream.once(CONNECT_EVENT, eventHandler.connectHandler(_this));
          stream.once("error", eventHandler.errorHandler(_this));
          stream.once("close", eventHandler.closeHandler(_this));

          if (options.connectTimeout) {
            /*
             * Typically, Socket#setTimeout(0) will clear the timer
             * set before. However, in some platforms (Electron 3.x~4.x),
             * the timer will not be cleared. So we introduce a variable here.
             *
             * See https://github.com/electron/electron/issues/14915
             */
            var connectTimeoutCleared = false;
            stream.setTimeout(options.connectTimeout, function() {
              if (connectTimeoutCleared) {
                return;
              }
              stream.setTimeout(0);
              stream.destroy();

              var err = new Error("connect ETIMEDOUT");
              // @ts-ignore
              err.errorno = "ETIMEDOUT";
              // @ts-ignore
              err.code = "ETIMEDOUT";
              // @ts-ignore
              err.syscall = "connect";
              eventHandler.errorHandler(_this)(err);
            });
            stream.once(CONNECT_EVENT, function() {
              connectTimeoutCleared = true;
              stream.setTimeout(0);
            });
          }

          if (options.noDelay) {
            stream.setNoDelay(true);
          }

          var connectionReadyHandler = function() {
            _this.removeListener("close", connectionCloseHandler);
            resolve();
          };
          var connectionCloseHandler = function() {
            _this.removeListener("ready", connectionReadyHandler);
            reject(new Error(CONNECTION_CLOSED_ERROR_MSG));
          };
          _this.once("ready", connectionReadyHandler);
          _this.once("close", connectionCloseHandler);
        }
      );
    });

    return asCallback(promise, callback);
  }

  /**
   * Disconnect from Redis.
   *
   * This method closes the connection immediately,
   * and may lose some pending replies that haven't written to client.
   * If you want to wait for the pending replies, use Redis#quit instead.
   */
  public disconnect(reconnect: boolean = false): void {
    if (!reconnect) {
      this.manuallyClosing = true;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.status === "wait") {
      eventHandler.closeHandler(this)();
    } else {
      this.connector.disconnect();
    }
  }

  /**
   * Disconnect from Redis.
   *
   * @deprecated
   */
  public end() {
    this.disconnect();
  }

  /**
   * Create a new instance with the same options as the current one.
   *
   * @example
   * ```js
   * var redis = new Redis(6380);
   * var anotherRedis = redis.duplicate();
   * ```
   */
  public duplicate(override: Partial<IRedisOptions> = {}): Redis {
    return new Redis(Object.assign({}, this.options, override));
  }

  public recoverFromFatalError(
    commandError: Error,
    err: Error,
    options?: Partial<IFlushQueueOptions>
  ): void {
    this.flushQueue(commandError, options);
    this.silentEmit("error", err);
    this.disconnect(true);
  }

  public handleReconnection(err: Error, item: IRedisQueueItem): void {
    var needReconnect: ReturnType<ReconnectOnError> = false;
    if (this.options.reconnectOnError) {
      needReconnect = this.options.reconnectOnError(err);
    }

    switch (needReconnect) {
      case 1:
      case true:
        if (this.status !== "reconnecting") {
          this.disconnect(true);
        }
        item.command.reject(err);
        break;
      case 2:
        if (this.status !== "reconnecting") {
          this.disconnect(true);
        }
        if (
          this.condition.select !== item.select &&
          item.command.name !== "select"
        ) {
          this.select(item.select);
        }
        this.sendCommand(item.command);
        break;
      default:
        item.command.reject(err);
    }
  }

  /**
   * Flush offline queue and command queue with error.
   *
   * @param error - The error object to send to the commands
   * @param options
   */
  protected flushQueue(
    error: Error,
    options: Partial<IFlushQueueOptions> = {}
  ) {
    const { offlineQueue, commandQueue } = {
      offlineQueue: true,
      commandQueue: true,
      ...options
    };

    let item;
    if (offlineQueue) {
      while (this.offlineQueue.length > 0) {
        item = this.offlineQueue.shift();
        item.command.reject(error);
      }
    }

    if (commandQueue) {
      if (this.commandQueue.length > 0) {
        if (this.stream) {
          this.stream.removeAllListeners("data");
        }
        while (this.commandQueue.length > 0) {
          item = this.commandQueue.shift();
          item.command.reject(error);
        }
      }
    }
  }

  /**
   * Check whether Redis has finished loading the persistent data and is able to
   * process commands.
   *
   * @param callback
   */
  protected _readyCheck(
    callback: CallbackFunction<{ [key: string]: any }>
  ): void {
    this.info((err, res) => {
      if (err) {
        return callback(err);
      }
      if (typeof res !== "string") {
        return callback(null, res);
      }

      var info: { [key: string]: any } = {};

      var lines = res.split("\r\n");
      for (var i = 0; i < lines.length; ++i) {
        var parts = lines[i].split(":");
        if (parts[1]) {
          info[parts[0]] = parts[1];
        }
      }

      if (!info.loading || info.loading === "0") {
        callback(null, info);
      } else {
        var loadingEtaMs = (info.loading_eta_seconds || 1) * 1000;
        var retryTime =
          this.options.maxLoadingRetryTime &&
          this.options.maxLoadingRetryTime < loadingEtaMs
            ? this.options.maxLoadingRetryTime
            : loadingEtaMs;
        debug(
          "Redis server still loading, trying again in " + retryTime + "ms"
        );
        setTimeout(function() {
          this._readyCheck(callback);
        }, retryTime);
      }
    });
  }

  /**
   * Emit only when there's at least one listener.
   *
   * @param eventName - Event to emit
   * @param args - Arguments
   * @return true if event had listeners, false otherwise.
   */
  public silentEmit(eventName: string, ...args: any[]) {
    let error;
    if (eventName === "error") {
      error = args[0];

      if (this.status === "end") {
        return;
      }

      if (this.manuallyClosing) {
        // ignore connection related errors when manually disconnecting
        if (
          error instanceof Error &&
          (error.message === CONNECTION_CLOSED_ERROR_MSG ||
            // @ts-ignore
            error.syscall === "connect" ||
            // @ts-ignore
            error.syscall === "read")
        ) {
          return;
        }
      }
    }
    if (this.listeners(eventName).length > 0) {
      return this.emit(eventName, ...args);
    }
    if (error && error instanceof Error) {
      console.error("[ioredis] Unhandled error event:", error.stack);
    }
    return false;
  }

  /**
   * Listen for all requests received by the server in real time.
   *
   * This command will create a new connection to Redis and send a
   * MONITOR command via the new connection in order to avoid disturbing
   * the current connection.
   *
   * @param callback The callback function. If omit, a promise will be returned.
   * @example
   * ```js
   * var redis = new Redis();
   * redis.monitor(function (err, monitor) {
   *   // Entering monitoring mode.
   *   monitor.on('monitor', function (time, args, source, database) {
   *     console.log(time + ": " + util.inspect(args));
   *   });
   * });
   *
   * // supports promise as well as other commands
   * redis.monitor().then(function (monitor) {
   *   monitor.on('monitor', function (time, args, source, database) {
   *     console.log(time + ": " + util.inspect(args));
   *   });
   * });
   * ```
   */
  public monitor(callback?: CallbackFunction<Redis>): Promise<Redis> {
    var monitorInstance = this.duplicate({
      monitor: true,
      lazyConnect: false
    });

    const Promise = PromiseContainer.get();
    return asCallback(
      new Promise(function(resolve) {
        monitorInstance.once("monitoring", function() {
          resolve(monitorInstance);
        });
      }),
      callback
    );
  }

  /**
   * Send a command to Redis
   *
   * This method is used internally by the `Redis#set`, `Redis#lpush` etc.
   * Most of the time you won't invoke this method directly.
   * However when you want to send a command that is not supported by ioredis yet,
   * this command will be useful.
   *
   * @param command - The Command instance to send.
   * @example
   * ```js
   * const redis = new Redis();
   *
   * // Use callback
   * const get = new Command('get', ['foo'], 'utf8', function (err, result) {
   *   console.log(result);
   * });
   * redis.sendCommand(get);
   *
   * // Use promise
   * const set = new Command('set', ['foo', 'bar'], 'utf8');
   * set.promise.then(function (result) {
   *   console.log(result);
   * });
   * redis.sendCommand(set);
   * ```
   */
  public sendCommand(command: ICommand): Promise<any> {
    return this.internalSendCommand(command);
  }

  /**
   * TODO: private
   */
  public internalSendCommand(
    command: ICommand,
    stream?: NetStream
  ): Promise<any> {
    if (this.status === "wait") {
      this.connect().catch(noop);
    }
    if (this.status === "end") {
      command.reject(new Error(CONNECTION_CLOSED_ERROR_MSG));
      return command.promise;
    }
    if (
      this.condition.subscriber &&
      !Command.checkFlag("VALID_IN_SUBSCRIBER_MODE", command.name)
    ) {
      command.reject(
        new Error(
          "Connection in subscriber mode, only subscriber commands may be used"
        )
      );
      return command.promise;
    }

    var writable =
      this.status === "ready" ||
      (!stream &&
        this.status === "connect" &&
        commands.hasFlag(command.name, "loading"));
    if (!this.stream) {
      writable = false;
    } else if (!this.stream.writable) {
      writable = false;
      // @ts-ignore
    } else if (this.stream._writableState && this.stream._writableState.ended) {
      // https://github.com/iojs/io.js/pull/1217
      writable = false;
    }

    if (!writable && !this.options.enableOfflineQueue) {
      command.reject(
        new Error(
          "Stream isn't writeable and enableOfflineQueue options is false"
        )
      );
      return command.promise;
    }

    if (
      !writable &&
      command.name === "quit" &&
      this.offlineQueue.length === 0
    ) {
      this.disconnect();
      command.resolve(Buffer.from("OK"));
      return command.promise;
    }

    if (writable) {
      // @ts-ignore
      if (debug.enabled) {
        debug(
          "write command[%s]: %d -> %s(%o)",
          this._getDescription(),
          this.condition.select,
          command.name,
          command.args
        );
      }
      (stream || this.stream).write(command.toWritable());

      this.commandQueue.push({
        command: command,
        stream: stream,
        select: this.condition.select
      });

      if (Command.checkFlag("WILL_DISCONNECT", command.name)) {
        this.manuallyClosing = true;
      }
    } else if (this.options.enableOfflineQueue) {
      // @ts-ignore
      if (debug.enabled) {
        debug(
          "queue command[%s]: %d -> %s(%o)",
          this._getDescription(),
          this.condition.select,
          command.name,
          command.args
        );
      }
      this.offlineQueue.push({
        command: command,
        stream: stream,
        select: this.condition.select
      });
    }

    if (command.name === "select" && isInt(command.args[0])) {
      const db = toInt(command.args[0]);
      if (this.condition.select !== db) {
        this.condition.select = db;
        this.emit("select", db);
        debug("switch to db [%d]", this.condition.select);
      }
    }

    return command.promise;
  }

  /**
   * Get description of the connection. Used for debugging.
   * @private
   */
  private _getDescription() {
    let description;
    if (this.options.path) {
      description = this.options.path;
    } else if (
      this.stream &&
      this.stream.remoteAddress &&
      this.stream.remotePort
    ) {
      description = this.stream.remoteAddress + ":" + this.stream.remotePort;
    } else {
      description = this.options.host + ":" + this.options.port;
    }
    if (this.options.connectionName) {
      description += ` (${this.options.connectionName})`;
    }
    return description;
  }
}

addTransactionSupport(Redis.prototype);

[
  "scan",
  "sscan",
  "hscan",
  "zscan",
  "scanBuffer",
  "sscanBuffer",
  "hscanBuffer",
  "zscanBuffer"
].forEach(function(command) {
  Redis.prototype[command + "Stream"] = function(key, options) {
    if (command === "scan" || command === "scanBuffer") {
      options = key;
      key = null;
    }
    return new ScanStream({
      ...options,
      key,
      command,
      objectMode: true,
      redis: this
    });
  };
});

export default Redis;
