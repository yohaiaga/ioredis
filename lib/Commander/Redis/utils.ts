import { parseURL } from "../../utils";
import {
  DEFAULT_REDIS_OPTIONS,
  IInternalRedisOptions,
  IRedisOptions
} from "./RedisOptions";

export function parseOptions(
  ...args: any[]
): Partial<IRedisOptions> & IInternalRedisOptions {
  let options: Partial<IRedisOptions> = {};
  for (const arg of args) {
    if (arg === null || typeof arg === "undefined") {
      continue;
    }
    if (typeof arg === "object") {
      options = {
        ...arg,
        ...options
      };
    } else if (typeof arg === "string") {
      options = {
        ...parseURL(arg),
        ...options
      };
    } else if (typeof arg === "number") {
      options.port = arg;
    } else {
      throw new Error("Invalid argument " + arg);
    }
  }

  if (typeof options.port === "string") {
    options.port = parseInt(options.port, 10);
  }
  if (typeof options.db === "string") {
    options.db = parseInt(options.db, 10);
  }

  return Object.assign({}, DEFAULT_REDIS_OPTIONS, options);
}
