import { CallbackFn, ObjEvents, Game } from "../game";
import { LevelKind, getKind } from "./kind";
import { LevelEvents, LevelCreateOpts, Level } from "./level";

export interface LevelPlugin extends LevelEvents {
  on?: Omit<LevelEvents, "make"> & ObjEvents;
  data?: { [key: string]: any };
}

export class LevelFactory {
  plugins: LevelPlugin[] = [];

  use(plugin: LevelPlugin) {
    this.plugins.push(plugin);
  }

  make(
    game: Game,
    id: string | number,
    kind: LevelKind,
    opts: LevelCreateOpts
  ): Level {
    let level: Level;
    if (opts.on && opts.on.make) {
      level = opts.on.make(game, id, kind, opts);
    } else {
      const makePlugin = this.plugins.find((p) => typeof p.make === "function");
      if (makePlugin) {
        level = makePlugin.make(game, id, kind, opts);
      } else {
        level = new Level(game, id, kind);
      }
    }

    this.apply(level);
    level.create(kind, opts);

    return level;
  }

  apply(level: Level) {
    this.plugins.forEach((p) => {
      Object.entries(p).forEach(([key, val]) => {
        if (key === "on") {
          Object.entries(val).forEach(([k2, v2]: [string, CallbackFn]) => {
            if (typeof v2 === "function") {
              level.on(k2, v2);
            } else {
              console.warn("Invalid 'on' member in Item plugin: " + k2);
            }
          });
        } else if (key === "data") {
          Object.assign(level.data, val);
        } else if (typeof val === "function") {
          level.on(key, val);
        } else {
          console.warn("Invalid member of Item plugin: " + key);
        }
      });
    });
  }
}

export const factory = new LevelFactory();

export function use(plugin: LevelPlugin) {
  factory.use(plugin);
}

export function make(
  game: Game,
  id: string | number,
  kind: string | LevelKind,
  opts: LevelCreateOpts
): Level {
  if (typeof kind === "string") {
    const id = kind;
    kind = getKind(id);
    if (!kind) throw new Error("Failed to find LevelKind: " + id);
  }

  return factory.make(game, id, kind, opts);
}
