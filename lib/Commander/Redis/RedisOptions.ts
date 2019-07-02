import { ISentinelConnectionOptions } from "./connectors/SentinelConnector";
import { IConnector } from "./connectors/types";
import {
  IIpcConnectionOptions,
  ITcpConnectionOptions
} from "./connectors/StandaloneConnector";
import { ICommanderOptions } from "../CommanderOptions";

export type ReconnectOnError = (err: Error) => boolean | 1 | 2;

export interface IInternalRedisOptions
  extends ISentinelConnectionOptions,
    IIpcConnectionOptions,
    ITcpConnectionOptions {
  Connector: { new (options: Partial<IRedisOptions>): IConnector };
  retryStrategy: (times: number) => number | void | null;

  /**
   * TCP KeepAlive on the socket with a X ms delay before start.
   * Set to a non-number value to disable keepAlive.
   */
  keepAlive: number;

  /**
   * Whether to disable the Nagle's Algorithm. By default we disable
   * it to reduce the latency.
   */
  noDelay: boolean;

  /**
   * Connection name. Useful for debugging.
   */
  connectionName: string;

  /**
   * If set, client will send AUTH command with the value of this
   * option when connected.
   */
  password: string;

  /**
   * Database index to use.
   */
  db: number;

  /**
   * By default, if there is no active connection to the Redis server,
   * commands are added to a queue and are executed once the connection is
   * "ready" (when `enableReadyCheck` is `true`, "ready" means the Redis
   * server has loaded the database from disk, otherwise means the connection
   * to the Redis server has been established). If this option is false, when
   * execute the command when the connection isn't ready,
   * an error will be returned.
   */
  enableOfflineQueue: boolean;

  /**
   *
   * When a connection is established to the Redis server, the server might
   * still be loading the database from disk. While loading, the server not
   * respond to any commands. To work around this, when this option is `true`,
   * ioredis will check the status of the Redis server, and when the Redis
   * server is able to process commands, a `ready` event will be emitted.
   */
  enableReadyCheck: boolean;

  /**
   * By default, When a new `Redis` instance is created, it will connect to
   * Redis server automatically. If you want to keep the instance
   * disconnected until a command is called, you can pass the `lazyConnect`
   * option to the constructor:
   *
   * ```js
   * const redis = new Redis({ lazyConnect: true });
   * // No attempting to connect to the Redis server here.
   * // Now let's connect to the Redis server
   * redis.get('foo', function () {
   * });
   * ```
   */
  lazyConnect: boolean;

  /**
   * The milliseconds before a timeout occurs during the initial
   * connection to the Redis server.
   */
  connectTimeout: number;

  /**
   * After reconnected, if the previous connection was in the
   * subscriber mode, client will auto re-subscribe these channels.
   */
  autoResubscribe: boolean;

  /**
   * If true, client will resend unfulfilled commands(e.g. block commands)
   * in the previous connection when reconnected.
   */
  autoResendUnfulfilledCommands: boolean;

  reconnectOnError: ReconnectOnError;

  /**
   * Enable READONLY mode for the connection.
   */
  readOnly: boolean;

  /**
   * Force numbers to be always returned as JavaScript strings. This option is
   * necessary when dealing with big numbers (exceed the [-2^53, +2^53] range).
   */
  stringNumbers: boolean;
  maxRetriesPerRequest: number;

  /**
   * When redis server is not ready, we will wait for `loading_eta_seconds`
   * from `info` command or maxLoadingRetryTime (milliseconds), whichever
   * is smaller.
   */
  maxLoadingRetryTime: number;
  monitor: boolean;
}

export interface IRedisOptions
  extends IInternalRedisOptions,
    ICommanderOptions {}

export const DEFAULT_REDIS_OPTIONS: IInternalRedisOptions = {
  Connector: null,
  // Connection
  port: 6379,
  host: "localhost",
  family: 4,
  connectTimeout: 10000,
  retryStrategy: function(times) {
    return Math.min(times * 50, 2000);
  },
  path: undefined,
  keepAlive: 0,
  noDelay: true,
  connectionName: null,
  // Sentinel
  sentinels: null,
  name: null,
  role: "master",
  sentinelRetryStrategy: function(times) {
    return Math.min(times * 10, 1000);
  },
  natMap: null,
  enableTLSForSentinelMode: false,
  updateSentinels: true,
  // Status
  password: null,
  db: 0,
  // Others
  enableOfflineQueue: true,
  enableReadyCheck: true,
  autoResubscribe: true,
  autoResendUnfulfilledCommands: true,
  lazyConnect: false,
  reconnectOnError: null,
  readOnly: false,
  stringNumbers: false,
  maxRetriesPerRequest: 20,
  maxLoadingRetryTime: 10000,
  monitor: false
};
