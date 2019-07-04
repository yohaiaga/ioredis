import { ICommand } from "./types";

export interface ICommanderOptions {
  /**
   * Whether to show friendly error stack. Enabling this option
   * has a impact on performance.
   */
  showFriendlyErrorStack: boolean;

  /**
   * The prefix to prepend to all keys in a command.
   */
  keyPrefix?: string;
}

export interface ICommandSender {
  commanderOptions: ICommanderOptions;
  sendCommand(command: ICommand): any;
}
