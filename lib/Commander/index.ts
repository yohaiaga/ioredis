import Script from "../script";
import {
  generateFunction,
  GenericCommand,
  generateScriptingFunction
} from "./utils";
import { EventEmitter } from "events";
import { ICommand } from "../types";
import { ICommander, commandList } from "../ICommander";
import { ICommanderOptions, ICommandSender } from "../ICommandSender";

/**
 * Commander
 *
 * This is the base class of `Redis`, `Cluster` and `Pipeline`
 */
abstract class Commander extends EventEmitter implements ICommandSender {
  public commanderOptions: ICommanderOptions;
  // TODO: protected
  public scriptsSet: { [name: string]: Script } = {};

  public constructor(options: Partial<ICommanderOptions> = {}) {
    super();

    this.commanderOptions = {
      showFriendlyErrorStack: false,
      ...options
    };
  }

  /**
   * Return supported builtin commands
   *
   * @returns command list
   */
  public getBuiltinCommands(): string[] {
    return commandList.slice(0);
  }

  /**
   * Create a builtin command
   *
   * @param commandName - Command name
   * @returns functions
   */
  public createBuiltinCommand(commandName: string): any {
    return {
      string: generateFunction(commandName, "utf8"),
      buffer: generateFunction(commandName, null)
    };
  }

  /**
   * Define a custom command using lua script
   *
   * @param name - Command name.
   * @param definition - The script code and the number of keys.
   * @param definition.lua - The lua code
   * @param definition.numberOfKeys - The number of keys. If omit, you have to
   *        pass the number of keys as the first argument every time you invoke the command
   */
  public defineCommand(name: string, definition): void {
    const script = new Script(
      definition.lua,
      definition.numberOfKeys,
      this.commanderOptions.keyPrefix
    );

    this.scriptsSet[name] = script;
    this[name] = generateScriptingFunction(script, "utf8");
    this[name + "Buffer"] = generateScriptingFunction(script, null);
  }

  /**
   * Send a command
   */
  public sendCommand(command: ICommand): Promise<any> {
    throw new Error("Commander cannot be used directly.");
  }
}

interface Commander {
  call: GenericCommand<Commander>;
  callBuffer: GenericCommand<Commander>;
}

Commander.prototype.call = generateFunction("utf8");
Commander.prototype.callBuffer = generateFunction(null);

type ICommanderWithoutMulti = {
  [P in Exclude<keyof ICommander, "multi">]: ICommander[P]
};
interface Commander extends ICommanderWithoutMulti {}
commandList.forEach(commandName => {
  Commander.prototype[commandName] = generateFunction<Commander>(
    commandName,
    "utf8"
  );
  Commander.prototype[commandName + "Buffer"] = generateFunction(
    commandName,
    null
  );
});

export { Commander };
