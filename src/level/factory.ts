import * as GWU from "gw-utils";
import { Game, EventFn } from "../game";
import { CallbackFn, ObjEvents } from "../object";
import {
  LevelEvents,
  LevelKind,
  LevelCreateOpts,
  getKind,
  LevelConfig,
  makeKind,
} from "./kind";
import { Level } from "./level";
import { CommandFn } from "../command";

export interface LevelPlugin extends LevelEvents {
  createKind?: (kind: LevelKind, opts: LevelConfig) => void;
  on?: ObjEvents;
  data?: { [id: string]: any };
  keymap?: { [id: string]: string | CommandFn };
  kinds?: Record<string, LevelConfig>;
}

export class LevelFactory {
  plugins: LevelPlugin[] = [];
  kinds: Record<string, LevelKind> = {};

  use(plugin: LevelPlugin) {
    this.plugins.push(plugin);
  }

  installKind(opts: LevelConfig): LevelKind;
  installKind(id: string, opts: LevelConfig): LevelKind;
  installKind(...args: any[]): LevelKind {
    let id: string;
    let opts: LevelConfig;
    if (args.length == 1) {
      opts = args[0];
      id = args[0].id;
    } else {
      id = args[0];
      opts = args[1];
    }

    const kind = makeKind(opts);

    this.plugins.forEach((p) => {
      if (p.createKind) {
        p.createKind(kind, opts);
      }
    });

    this.kinds[id.toLowerCase()] = kind;
    return kind;
  }

  getKind(id: string): LevelKind | null {
    return this.kinds[id.toLowerCase()] || null;
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
        } else if (key === "kinds") {
          // Skip
        } else if (key == "keymap") {
          level.keymap = GWU.utils.mergeDeep(level.keymap, val);
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
