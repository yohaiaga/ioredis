import camelcase = require("lodash.camelcase");
import pluralize = require("pluralize");
import { ICommandDef, ICommandArgument, ICommandReturn } from "./commandDef";

function ensurePeriod(sentence: string): string {
  if (sentence.match(/^O\(.+\)$/)) {
    return sentence;
  }
  return sentence[sentence.length - 1] === "." ? sentence : sentence + ".";
}

function mapType(enums: string[], type: string): string | undefined {
  switch (type) {
    case "string":
      return "string | Buffer";
    case "key":
      return "CommandKey";
    case "pattern":
      return "CommandPattern";
    case "integer":
    case "double":
      return "number";
    case "enum":
      if (!enums) {
        throw new Error(`enum is missing`);
      }
      return enums.map(o => `'${o}'`).join(" | ");
    default:
      if (type[0] === "-") {
        return `"${type.slice(1)}"`;
      }
      if (type[0] === ":") {
        return type.slice(1);
      }
      throw new Error(`Unknown type ${type}`);
  }
}

function mapName(name: string): string {
  if (typeof name !== "string") {
    throw new Error(`${name} is not a string`);
  }
  return camelcase(name);
}

function getParameterDef(def: ICommandArgument): [string, boolean] {
  const names: string[] = (Array.isArray(def.name) ? def.name : [def.name]).map(
    mapName
  );
  const types: string[] = (Array.isArray(def.type) ? def.type : [def.type]).map(
    mapType.bind(null, def.enum)
  );
  if (names.length != types.length) {
    throw new Error("name & type length not match");
  }

  if (def.multiple) {
    if (def.command) {
      throw new Error("Both multiple and command are true");
    }
    if (names.length > 1) {
      throw new Error("multiple is true while name contains multiple elements");
    }
    return [
      `...${pluralize(names[0])}: ${
        types[0].indexOf("|") === -1 ? types[0] : `(${types[0]})`
      }[]`,
      !!def.optional
    ];
  }

  const prefix = def.command
    ? `${def.command.toLowerCase()}Option: '${def.command.toLowerCase()}' | '${def.command.toUpperCase()}', `
    : "";
  const parameters = names
    .map((name, index) => `${name}: ${types[index]}`)
    .join(", ");
  return [`${prefix}${parameters}`, !!def.optional];
}

function getReturnType(ret: ICommandReturn, buffer: boolean): string {
  if (!ret) {
    return "any";
  }
  const types = Array.isArray(ret.type) ? ret.type : [ret.type];
  return types
    .map(mapType.bind(null, []))
    .join(" | ")
    .split(" | ")
    .filter(type => {
      return type !== (buffer ? "string" : "Buffer");
    })
    .join(" | ");
}

export function getComment(def: ICommandDef): string {
  const { summary, since, complexity } = def;

  const comments = [ensurePeriod(summary)];
  if (complexity) {
    comments.push(`Complexity: ${ensurePeriod(complexity)}`);
  }
  if (since) {
    comments.push(`Since Redis v${since}`);
  }
  if (def.return && def.return.description) {
    comments.push(`@returns ${def.return.description}`);
  }
  return summary
    ? "/**\n" + `${comments.map(a => " * " + a + "\n *").join("\n")}\n */\n`
    : "";
}

export function getCommandDef(
  def: ICommandDef,
  buffer: boolean
): string | undefined {
  const returnType = getReturnType(def.return, buffer);
  if (
    buffer &&
    returnType.indexOf("any") === -1 &&
    getReturnType(def.return, false) == returnType
  ) {
    return;
  }
  const { arguments: args } = def;
  if (
    args &&
    args.some((arg, index) => {
      return (arg.multiple && index !== args.length - 1) || arg.variadic;
    })
  ) {
    return;
  }

  let parameterDefs: Array<[string, boolean]> = [];
  if (args) {
    try {
      parameterDefs = args.map(getParameterDef);
    } catch (err) {
      return;
    }
  }
  const funcMatrix = getFunctionMatrix(parameterDefs);
  return (
    getComment(def) +
    funcMatrix
      .map(defs => {
        const { constantParameters } = def;
        const constantPart =
          constantParameters && constantParameters.length
            ? constantParameters.map(p => `${camelcase(p)}: "${p}"`).join(", ")
            : "";
        const vairablePart = defs.join(", ");
        const returnType = getReturnType(def.return, buffer);
        let parameters = [
          constantPart,
          vairablePart,
          `callback?: CallbackFunction<${returnType}>`
        ]
          .filter(a => a)
          .join(", ");
        if (parameters.indexOf("...") > -1) {
          parameters = "...args: any[]";
        }
        return `${camelcase(def.name)}${
          buffer ? "Buffer" : ""
        }(${parameters}): Promise<${returnType}>;`;
      })
      .join("\n\n")
  );
}

function getFunctionMatrix(
  parameterDefs: Array<[string, boolean]>
): string[][] {
  if (!parameterDefs.length) {
    return [[]];
  }
  let matrix: string[][] = [];
  for (const parameterDef of parameterDefs) {
    const [def, optional] = parameterDef;
    if (optional) {
      if (matrix.length) {
        matrix = matrix.concat(matrix.map(defs => defs.concat(def)));
      } else {
        matrix.push([def], []);
      }
    } else {
      if (matrix.length) {
        matrix = matrix.map(defs => defs.concat(def));
      } else {
        matrix.push([def]);
      }
    }
  }
  return matrix.length < 10 ? matrix : [["...args: any[]"]];
}
