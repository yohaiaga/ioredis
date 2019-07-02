import SubscriptionSet from "../../SubscriptionSet";

export interface ICondition {
  select: number;
  auth: string;
  subscriber: false | SubscriptionSet;
}
