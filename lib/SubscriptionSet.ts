import { ICommandNameFlags } from "./command";

type AddSet = ICommandNameFlags["ENTER_SUBSCRIBER_MODE"][number];
type DelSet = ICommandNameFlags["EXIT_SUBSCRIBER_MODE"][number];

function mapSet(set: AddSet | DelSet): AddSet {
  if (set === "unsubscribe") {
    return "subscribe";
  }
  if (set === "punsubscribe") {
    return "psubscribe";
  }
  return set;
}

/**
 * Tiny class to simplify dealing with subscription set
 */
export default class SubscriptionSet {
  private set: { [key: string]: { [channel: string]: boolean } } = {
    subscribe: {},
    psubscribe: {}
  };

  public add(set: AddSet, channel: string) {
    this.set[mapSet(set)][channel] = true;
  }

  public del(set: DelSet, channel: string) {
    delete this.set[mapSet(set)][channel];
  }

  public channels(set: AddSet | DelSet): string[] {
    return Object.keys(this.set[mapSet(set)]);
  }

  public isEmpty(): boolean {
    return (
      this.channels("subscribe").length === 0 &&
      this.channels("psubscribe").length === 0
    );
  }
}
