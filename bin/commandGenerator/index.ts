import { list } from "redis-commands";
import { getCommandDef } from "./utils";
import { getDef } from "./commandDef";
import { flatten } from "../../lib/utils";
import camelcase = require("lodash.camelcase");

const commands = new Set<string>(list);

commands.delete("monitor");
commands.add("sentinel");

const items = flatten(
  Array.from(commands)
    .sort()
    .map(commandName => {
      return flatten(
        getDef(commandName).map(def => {
          return [getCommandDef(def, false), getCommandDef(def, true)];
        })
      );
    })
)
  .filter(d => d)
  .map(prefixWithSpaces)
  .join("\n");

function prefixWithSpaces(text: string, _: number): string {
  return text
    .split("\n")
    .map(line => "    " + line)
    .join("\n");
}

const interfaceTemplate = `
import { CallbackFunction } from '../types';

export type CommandKey = string | Buffer | number
export type CommandPattern = string | Buffer

declare module './index' {
  interface Commander {
  ${items}
  }
}
`;
console.log(interfaceTemplate);
