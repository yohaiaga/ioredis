"use strict";

import Command from "../../command";
import { MaxRetriesPerRequestError } from "../../errors";
import { Debug, noop, CONNECTION_CLOSED_ERROR_MSG } from "../../utils";
import DataHandler from "./DataHandler";
import Redis from ".";
import { ICommand } from "../../types";

const debug = Debug("connection");

export function connectHandler(self) {
  return function() {
    self.setStatus("connect");

    self.resetCommandQueue();

    // AUTH command should be processed before any other commands
    let flushed = false;
    if (self.condition.auth) {
      self.auth(self.condition.auth, function(err) {
        if (err) {
          if (err.message.indexOf("no password is set") === -1) {
            flushed = true;
            self.recoverFromFatalError(err, err);
          } else {
            console.warn(
              "[WARN] Redis server does not require a password, but a password was supplied."
            );
          }
        }
      });
    }

    if (self.condition.select) {
      self.select(self.condition.select);
    }

    if (!self.options.enableReadyCheck) {
      exports.readyHandler(self)();
    }

    /*
      No need to keep the reference of DataHandler here
      because we don't need to do the cleanup.
      `Stream#end()` will remove all listeners for us.
    */
    new DataHandler(self, {
      stringNumbers: self.options.stringNumbers,
      dropBufferSupport: self.options.dropBufferSupport
    });

    if (self.options.enableReadyCheck) {
      self._readyCheck(function(err, info) {
        if (err) {
          if (!flushed) {
            self.recoverFromFatalError(
              new Error("Ready check failed: " + err.message),
              err
            );
          }
        } else {
          self.serverInfo = info;
          if (self.connector.check(info)) {
            exports.readyHandler(self)();
          } else {
            self.disconnect(true);
          }
        }
      });
    }
  };
}

export function closeHandler(self: Redis) {
  return function(this: Redis) {
    const close = () => {
      this.setStatus("end");
      this.flushQueue(new Error(CONNECTION_CLOSED_ERROR_MSG));
    };

    this.setStatus("close");

    if (!this.prevCondition) {
      this.prevCondition = this.condition;
    }
    if (this.commandQueue.length) {
      this.prevCommandQueue = this.commandQueue;
    }

    if (this.manuallyClosing) {
      this.manuallyClosing = false;
      debug("skip reconnecting since the connection is manually closed.");
      return close();
    }

    if (typeof this.options.retryStrategy !== "function") {
      debug("skip reconnecting because `retryStrategy` is not a function");
      return close();
    }
    const retryDelay = this.options.retryStrategy(++this.retryAttempts);

    if (typeof retryDelay !== "number") {
      debug(
        "skip reconnecting because `retryStrategy` doesn't return a number"
      );
      return close();
    }

    debug("reconnect in %sms", retryDelay);

    this.setStatus("reconnecting", retryDelay);
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null;
      this.connect().catch(noop);
    }, retryDelay);

    const { maxRetriesPerRequest } = this.options;
    if (typeof maxRetriesPerRequest === "number") {
      if (maxRetriesPerRequest < 0) {
        debug("maxRetriesPerRequest is negative, ignoring...");
      } else {
        const remainder = this.retryAttempts % (maxRetriesPerRequest + 1);
        if (remainder === 0) {
          debug(
            "reach maxRetriesPerRequest limitation, flushing command queue..."
          );
          this.flushQueue(new MaxRetriesPerRequestError(maxRetriesPerRequest));
        }
      }
    }
  }.bind(self);
}

export function errorHandler(self: Redis) {
  return function(this: Redis, error: Error) {
    debug("error: %s", error);
    self.silentEmit("error", error);
  }.bind(self);
}

export function readyHandler(self: Redis) {
  return function(this: Redis) {
    this.setStatus("ready");
    this.retryAttempts = 0;

    if (this.options.monitor) {
      this.call("monitor");
      const { sendCommand } = this;
      this.sendCommand = function(command: ICommand): Promise<any> {
        if (Command.checkFlag("VALID_IN_MONITOR_MODE", command.name)) {
          return sendCommand.call(this, command);
        }
        command.reject(
          new Error("Connection is in monitoring mode, can't process commands.")
        );
        return command.promise;
      };
      this.once("close", () => {
        delete this.sendCommand;
      });
      this.setStatus("monitoring");
      return;
    }
    const finalSelect = this.prevCondition
      ? this.prevCondition.select
      : this.condition.select;

    if (this.options.connectionName) {
      debug("set the connection name [%s]", this.options.connectionName);
      this.client("setname", this.options.connectionName).catch(noop);
    }

    if (this.options.readOnly) {
      debug("set the connection to readonly mode");
      this.readonly().catch(noop);
    }

    if (this.prevCondition) {
      const condition = this.prevCondition;
      this.prevCondition = null;
      if (condition.subscriber && self.options.autoResubscribe) {
        // We re-select the previous db first since
        // `SELECT` command is not valid in sub mode.
        if (this.condition.select !== finalSelect) {
          debug("connect to db [%d]", finalSelect);
          this.select(finalSelect);
        }
        const subscribeChannels = condition.subscriber.channels("subscribe");
        if (subscribeChannels.length) {
          debug("subscribe %d channels", subscribeChannels.length);
          this.subscribe(subscribeChannels);
        }
        const psubscribeChannels = condition.subscriber.channels("psubscribe");
        if (psubscribeChannels.length) {
          debug("psubscribe %d channels", psubscribeChannels.length);
          this.psubscribe(psubscribeChannels);
        }
      }
    }

    if (this.prevCommandQueue) {
      if (this.options.autoResendUnfulfilledCommands) {
        debug("resend %d unfulfilled commands", this.prevCommandQueue.length);
        while (this.prevCommandQueue.length > 0) {
          const item = this.prevCommandQueue.shift();
          if (
            item.select !== this.condition.select &&
            item.command.name !== "select"
          ) {
            this.select(item.select);
          }
          this.internalSendCommand(item.command, item.stream);
        }
      } else {
        this.prevCommandQueue = null;
      }
    }

    if (this.offlineQueue.length) {
      debug("send %d commands in offline queue", this.offlineQueue.length);
      const { offlineQueue } = this;
      this.resetOfflineQueue();
      while (offlineQueue.length > 0) {
        const item = offlineQueue.shift();
        if (
          item.select !== this.condition.select &&
          item.command.name !== "select"
        ) {
          this.select(item.select);
        }
        this.internalSendCommand(item.command, item.stream);
      }
    }

    if (this.condition.select !== finalSelect) {
      debug("connect to db [%d]", finalSelect);
      this.select(finalSelect);
    }
  }.bind(self);
}
