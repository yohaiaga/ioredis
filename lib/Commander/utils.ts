import Command, { ICommandOptions } from "../command";
import { Commander } from ".";
import { ICommandSender } from "../ICommandSender";
import Script from "../script";

export type GenericCommand<T extends ICommandSender> = (
  this: T,
  ...args: any[]
) => ReturnType<T["sendCommand"]>;

export function generateFunction<T extends ICommandSender>(
  _encoding: string
): GenericCommand<T>;
export function generateFunction<T extends ICommandSender>(
  _commandName: string | void,
  _encoding: string
): GenericCommand<T>;
export function generateFunction<T extends ICommandSender>(
  _commandName?: string,
  _encoding?: string
): GenericCommand<T> {
  if (typeof _encoding === "undefined") {
    _encoding = _commandName;
    _commandName = null;
  }
  return function(this: T): ReturnType<T["sendCommand"]> {
    let firstArgIndex = 0;
    let commandName = _commandName;
    if (commandName === null) {
      commandName = arguments[0];
      firstArgIndex = 1;
    }
    let length = arguments.length;
    let lastArgIndex = length - 1;
    let callback = arguments[lastArgIndex];
    if (typeof callback !== "function") {
      callback = undefined;
    } else {
      length = lastArgIndex;
    }
    const args = new Array(length - firstArgIndex);
    for (var i = firstArgIndex; i < length; ++i) {
      args[i - firstArgIndex] = arguments[i];
    }

    const options: ICommandOptions = { replyEncoding: _encoding };

    if (this.commanderOptions.showFriendlyErrorStack) {
      options.errorStack = new Error().stack;
    }
    if (this.commanderOptions.keyPrefix) {
      options.keyPrefix = this.commanderOptions.keyPrefix;
    }

    return this.sendCommand(new Command(commandName, args, options, callback));
  };
}

export function generateScriptingFunction(
  _script: Script,
  _encoding: string | null
) {
  return function(this: ICommandSender) {
    let { length } = arguments;
    let lastArgIndex = length - 1;
    let callback = arguments[lastArgIndex];
    if (typeof callback !== "function") {
      callback = undefined;
    } else {
      length = lastArgIndex;
    }
    const args = new Array(length);
    for (let i = 0; i < length; i++) {
      args[i] = arguments[i];
    }

    const options: ICommandOptions = { replyEncoding: _encoding };

    if (this.commanderOptions.showFriendlyErrorStack) {
      options.errorStack = new Error().stack;
    }

    return _script.execute(this, args, options, callback);
  };
}
