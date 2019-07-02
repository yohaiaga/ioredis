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

export const DEFAULT_COMMANDER_OPTIONS: ICommanderOptions = {
  showFriendlyErrorStack: false
};
