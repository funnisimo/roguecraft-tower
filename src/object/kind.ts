import { ObjEvents } from "./obj";

export interface ObjKind {
  performs: string[]; // TODO - { action: string, settings: Record<string,any> }[]
  resolves: string[]; // TODO - { action: string, settings: Record<string,any> }[]
  bump: string[]; // TODO - { action: string, settings: Record<string,any> }[]

  on: ObjEvents;
}

export interface ObjKindConfig {
  performs?: string | string[];
  resolves?: string | string[];
  bump?: string | string[];
  on?: ObjEvents;
}

export function makeKind(config: ObjKindConfig): ObjKind {
  const kind = Object.assign(
    {
      performs: [],
      resolves: [],
      bump: [],
      on: {},
    },
    config
  ) as ObjKind;

  if (config.performs) {
    if (typeof config.performs == "string") {
      kind.performs = config.performs.split(/[|,]/).map((v) => v.trim());
    }
  }

  if (config.resolves) {
    if (typeof config.resolves == "string") {
      kind.resolves = config.resolves.split(/[|,]/).map((v) => v.trim());
    }
  }

  if (config.bump) {
    if (typeof config.bump == "string") {
      kind.bump = config.bump.split(/[|,]/).map((v) => v.trim());
    }
  }

  if (config.on && typeof config.on !== "object") {
    kind.on = {};
  }

  return kind;
}
