import { getCommandDef } from "./utils";
import { getDef, ICommandDef } from "./commandDef";
import { flatten } from "../../lib/utils";
import { list } from "redis-commands";

const commandList = (list as string[])
  .filter(name => name !== "monitor")
  .concat("sentinel");

function getDefaultCommandDef(name: string): ICommandDef {
  const defs = getDef(name);
  const def = defs.length === 1 ? defs[0] : null;
  return {
    name,
    constantParameters: [],
    summary: def ? def.summary : "",
    complexity: def ? def.complexity : "",
    since: def ? def.since : "",
    arguments: [
      {
        name: "arg",
        type: ":any",
        multiple: true
      }
    ]
  };
}

function batchGetCommandDef(name: string, defs: ICommandDef[]): string[] {
  if (!defs.length) {
    defs = [getDefaultCommandDef(name)];
  }
  let ret: string[];
  try {
    ret = flatten(
      defs.map(def => [getCommandDef(def, false), getCommandDef(def, true)])
    );
  } catch (err) {
    console.error(err);
  }
  ret = ret.filter(d => d);
  if (!ret.length) {
    ret = batchGetCommandDef(name, [getDefaultCommandDef(name)]);
  }
  return ret;
}

const items = flatten(
  commandList.sort().map(commandName => {
    return flatten(batchGetCommandDef(commandName, getDef(commandName)));
  })
)
  .filter(d => d)
  .map(prefixWithSpaces)
  .join("\n");

function prefixWithSpaces(text: string, _: number): string {
  return text
    .split("\n")
    .map(line => "  " + line)
    .join("\n");
}

const interfaceTemplate = `
import { CallbackFunction } from './types';

export const commandList = <const> [${commandList
  .map(name => `"${name}"`)
  .join(", ")}];

export type TypeMapper<T, K> = T extends Promise<any> ? K : T
export type CommandKey = string | Buffer | number
export type CommandPattern = string | Buffer

export interface ICommander {
${items}
}

`;
console.log(interfaceTemplate);
