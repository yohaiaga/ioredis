import Redis from "./Commander/Redis";

exports = module.exports = Redis;

export default Redis;
export { default as Cluster } from "./Commander/Cluster";
export { default as Command } from "./command";
export { default as ScanStream } from "./ScanStream";
export { Pipeline } from "./Commander/Pipeline";
export {
  default as AbstractConnector
} from "./Commander/Redis/connectors/AbstractConnector";
export {
  default as SentinelConnector,
  SentinelIterator
} from "./Commander/Redis/connectors/SentinelConnector";

// Type Exports
export {
  ISentinelAddress
} from "./Commander/Redis/connectors/SentinelConnector";
export { IRedisOptions } from "./Commander/Redis/RedisOptions";

// No TS typings
export const ReplyError = require("redis-errors").ReplyError;

const PromiseContainer = require("./promiseContainer");
Object.defineProperty(exports, "Promise", {
  get() {
    return PromiseContainer.get();
  },
  set(lib) {
    PromiseContainer.set(lib);
  }
});

export function print(err: Error | null, reply?: any) {
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log("Reply: " + reply);
  }
}
