import { IConnector, ErrorEmitter, NetStream } from "./types";

export default abstract class AbstractConnector implements IConnector {
  protected connecting: boolean = false;
  protected stream: NetStream;

  public check(info: any): boolean {
    return true;
  }

  public disconnect(): void {
    this.connecting = false;
    if (this.stream) {
      this.stream.end();
    }
  }

  public abstract connect(_: ErrorEmitter): Promise<NetStream>;
}
