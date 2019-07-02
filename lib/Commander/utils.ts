import { list } from "redis-commands";
import Command, { ICommandOptions } from "../command";
import Commander from ".";

export const commandList = (list as string[])
  .filter(name => name !== "monitor")
  .concat("sentinel");

export type GenericCommand = (...args: any[]) => Promise<any>;

export function generateFunction(_encoding: string): GenericCommand;
export function generateFunction(
  _commandName: string | void,
  _encoding: string
): GenericCommand;
export function generateFunction(
  _commandName?: string,
  _encoding?: string
): GenericCommand {
  if (typeof _encoding === "undefined") {
    _encoding = _commandName;
    _commandName = null;
  }
  return function(this: Commander) {
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

export function generateScriptingFunction(_script, _encoding) {
  return function(this: Commander) {
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
