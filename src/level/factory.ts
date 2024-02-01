import * as GWU from "gw-utils";
import { CallbackFn, ObjEvents, Game, EventFn } from "../game";
import { LevelEvents, LevelKind, LevelCreateOpts, getKind } from "./kind";
import { Level } from "./level";

export interface LevelPlugin extends LevelEvents {
  on?: ObjEvents;
  data?: { [id: string]: any };
  keymap?: { [id: string]: string | EventFn };
}

export class LevelFactory {
  plugins: LevelPlugin[] = [];

  use(plugin: LevelPlugin) {
    this.plugins.push(plugin);
  }

  create(
    game: Game,
    id: string | number,
    kind: LevelKind,
    opts: LevelCreateOpts
  ): Level {
    // Create the Item
    let out: GWU.Option<Level> = GWU.Option.None();
    if (!!opts.on && opts.on.ctor) {
      out = opts.on.ctor(game, id, kind, opts);
    }
    out = this.plugins.reduce((v, p) => {
      if (v.isNone() && p.ctor) {
        return p.ctor(game, id, kind, opts);
      }
      return v;
    }, out);
    let level = out.unwrapOrElse(() => new Level(game, id, kind));

    this.apply(level);
    level._create(kind, opts);
    level.emit("create", level, opts);

    return level;
  }

  apply(level: Level) {
    this.plugins.forEach((p) => {
      Object.entries(p).forEach(([key, val]) => {
        if (key == "data") {
          level.data = GWU.utils.mergeDeep(level.data, val);
        } else if (key == "on") {
          Object.entries(val).forEach(([k, v]: [string, CallbackFn]) => {
            if (typeof v === "function") {
              level.on(k, v);
            }
          });
        } else if (key == "keymap") {
          // TODO - Add to level keymap
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

export function use(plugin: LevelEvents) {
  factory.use(plugin);
}

export function create(
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

  return factory.create(game, id, kind, opts);
}
