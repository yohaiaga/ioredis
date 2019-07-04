import Redis from "../Redis";
import { ICommand } from "../../types";
import { NetStream } from "../Redis/connectors/types";

export interface IClusterErrorHandler {
  moved(slot: string, key: string): void;
  ask(slot: string, key: string): void;
  tryagain(): void;
  clusterDown(): void;
  connectionClosed(): void;
  maxRedirections(error: Error): void;
  defaults(): void;
}

export interface IClusterOfflineQueueItemNode {
  redis: Redis;
  slot: number | null;
}

export interface IClusterOfflineQueueItem {
  command: ICommand;
  stream: NetStream;
  node: IClusterOfflineQueueItemNode;
}
