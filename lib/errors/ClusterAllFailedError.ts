import { RedisError } from "redis-errors";

export default class ClusterAllFailedError extends RedisError {
  public constructor(message, public lastNodeError: RedisError) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  public get name(): string {
    return this.constructor.name;
  }
}
