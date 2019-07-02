import { Socket } from "net";
import { TLSSocket } from "tls";

export type ErrorEmitter = (type: string, err: Error) => void;
export type NetStream = Socket | TLSSocket;

export interface IConnector {
  check(info: any): boolean;
  disconnect(): void;
  connect(_: ErrorEmitter): Promise<NetStream>;
}
