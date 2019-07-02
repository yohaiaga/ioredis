import { AbortError } from "redis-errors";

export default class MaxRetriesPerRequestError extends AbortError {
  public constructor(maxRetriesPerRequest: number) {
    const message = `Reached the max retries per request limit (which is ${maxRetriesPerRequest}). Refer to "maxRetriesPerRequest" option for details.`;

    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  public get name(): string {
    return this.constructor.name;
  }
}
