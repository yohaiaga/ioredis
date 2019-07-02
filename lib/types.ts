import { NetStream } from "./Commander/Redis/connectors/types";

export type CallbackFunction<T = any> = (
  err?: NodeJS.ErrnoException | null,
  result?: T
) => void;

export type CommandParameter = string | Buffer | number | any[];
export interface ICommand {
  name: string;
  args: CommandParameter[];
  resolve(result: any): void;
  reject(error: Error): void;
  promise: Promise<any>;
  toWritable(): string | Buffer;
}

export interface ICommandItem {
  command: ICommand;
  stream: NetStream;
  select: number;
}

export type ConnectionStatus =
  | "end"
  | "close"
  | "wait"
  | "connecting"
  | "connect"
  | "ready"
  | "reconnecting"
  | "disconnecting";
