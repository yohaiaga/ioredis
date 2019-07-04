import commands from "./commands.json";
import camelcase = require("lodash.camelcase");

export interface ICommandReturn {
  allowNull?: boolean;
  type: string[] | string;
  description?: string;
}

export interface ICommandArgument {
  name: string[] | string;
  type: string[] | string;
  enum?: string[];
  multiple?: boolean;
  command?: string;
  variadic?: boolean;
  optional?: boolean;
}

export interface ICommandDef {
  constantParameters: string[];
  name: string;
  summary: string;
  complexity?: string;
  arguments?: ICommandArgument[];
  return?: ICommandReturn;
  since?: string;
}

const defs = Object.keys(commands)
  .sort()
  .map(commandName => {
    const def = commands[commandName] as ICommandDef;
    def.name = commandName.toLowerCase();
    const parts = def.name.split(" ");
    if (parts.length > 1) {
      def.name = parts[0];
      def.constantParameters = parts.slice(1);
    }

    resolveVariableNameConflict(def.arguments);
    return def;
  });

export function getDef(commandName: string): ICommandDef[] {
  return defs.filter(def => def.name === commandName);
}

function resolveVariableNameConflict(args: ICommandArgument[]) {
  if (!args) {
    return;
  }
  const map = new Map<string, number>();
  function getNextName(name: string): string {
    name = name === "arguments" ? "args" : name;
    let count = map.get(name) || 0;
    map.set(name, count + 1);
    if (count) {
      name = name + count;
    }
    return name;
  }
  for (const arg of args) {
    if (Array.isArray(arg.name)) {
      arg.name = arg.name.map(getNextName);
    } else {
      if (arg.command && arg.name !== arg.command.toLowerCase()) {
        arg.name = camelcase(arg.command.toLowerCase() + "-key");
      }
      arg.name = getNextName(arg.name);
    }
  }
}
