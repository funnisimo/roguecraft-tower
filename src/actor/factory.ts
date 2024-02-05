import * as GWU from "gw-utils";
import { CallbackFn, ObjEvents } from "../object";
import { Level } from "../level";
import { ActorMakeOpts, Actor } from "./actor";
import { ActorEvents, ActorKind, ActorKindConfig, makeKind } from "./kind";
import * as FX from "../fx";

export type ActorKindConfigSet = Record<string, ActorKindConfig>;

export interface ActorPlugin extends ActorEvents {
  createKind?: (kind: ActorKind, opts: ActorKindConfig) => void;
  on?: ObjEvents;
  data?: { [key: string]: any };
  kinds?: ActorKindConfigSet | ActorKindConfigSet[];
}

export class ActorFactory {
  plugins: ActorPlugin[] = [];
  kinds: Record<string, ActorKind> = {};

  use(plugin: ActorPlugin) {
    this.plugins.push(plugin);
  }

  installKind(opts: ActorKindConfig): ActorKind;
  installKind(id: string, opts: ActorKindConfig): ActorKind;
  installKind(...args: any[]): ActorKind {
    let id: string;
    let opts: ActorKindConfig;
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

  getKind(id: string): ActorKind | null {
    return this.kinds[id.toLowerCase()] || null;
  }

  create(kind: ActorKind, opts: ActorMakeOpts = {}): Actor {
    let out: GWU.Option<Actor> = GWU.Option.None();
    if (opts.ctor) {
      out = opts.ctor(kind, opts);
    }
    out = this.plugins.reduce((v, p) => {
      if (v.isNone() && p.ctor) {
        return p.ctor(kind, opts);
      }
      return v;
    }, out);
    let actor = out.unwrapOrElse(() => new Actor(kind));

    this.apply(actor);

    actor._create(opts);
    actor.emit("create", actor, opts);

    return actor;
  }

  apply(item: Actor) {
    this.plugins.forEach((p) => {
      Object.entries(p).forEach(([key, val]) => {
        if (key === "on") {
          Object.entries(val).forEach(([k2, v2]: [string, CallbackFn]) => {
            if (typeof v2 === "function") {
              item.on(k2, v2);
            } else {
              console.warn("Invalid 'on' member in Item plugin: " + k2);
            }
          });
        } else if (key === "data") {
          Object.assign(item.data, val);
        } else if (key === "kinds") {
          // skip
        } else if (typeof val === "function") {
          item.on(key, val);
        } else {
          console.warn("Invalid member of Item plugin: " + key);
        }
      });
    });
  }
}

export const factory = new ActorFactory();

export function use(plugin: ActorPlugin) {
  factory.use(plugin);
}

export function create(
  kind: ActorKind | string,
  config: ActorMakeOpts | number = {}
): Actor {
  if (typeof kind === "string") {
    kind = factory.getKind(kind);
    if (!kind) throw new Error("Failed to find kind.");
  }
  if (typeof config === "number") {
    config = { power: config };
  }

  if (kind.hero) {
    throw new Error("ActorKind is Hero: " + kind.id);
  }

  return factory.create(kind, config);
}

export type ActorCallback = (actor: Actor) => void;

export interface ThenActor {
  then(cb: ActorCallback): void;
}

export function randomSpawnLocFor(
  level: Level,
  actor: Actor
): GWU.Option<GWU.xy.XY> {
  let x;
  let y;
  let tries = level.width * level.height;
  do {
    --tries;
    x = level.rng.number(level.width);
    y = level.rng.number(level.height);
    // TODO - also not in a currently visible location
  } while ((tries && !level.hasTile(x, y, "FLOOR")) || level.actorAt(x, y));

  if (!tries) {
    return GWU.Option.None();
  }
  return GWU.Option.Some({ x, y });
}

export function flash_spawn(
  level: Level,
  id: string | Actor, // Should this be | ActorKind instead of | Actor?
  x?: number,
  y?: number,
  ms = 300
): ThenActor {
  const newbie = typeof id === "string" ? create(id) : id;

  // TODO - assert game && scene exist

  const bg = newbie.kind.fg;
  const game = level.game;
  const scene = level.scene;
  // const level = level.level;

  if (x === undefined || y === undefined) {
    const loc = randomSpawnLocFor(level, newbie);
    if (loc.isNone()) {
      console.error("Failed to find spawn location for : " + newbie.name);
      return;
    }
    const xy = loc.unwrap();
    newbie.x = xy.x;
    newbie.y = xy.y;
  } else {
    newbie.x = x;
    newbie.y = y;
  }

  let _success: ActorCallback = GWU.NOOP;

  FX.flashGameTime(level, newbie.x, newbie.y, bg, ms).then(() => {
    level.addActor(newbie);
    _success(newbie);
  });

  return {
    then(cb: ActorCallback) {
      _success = cb || GWU.NOOP;
    },
  };
}

export function spawn(
  level: Level,
  id: string | Actor, // Should this be | ActorKind instead of | Actor?
  x?: number,
  y?: number
): Actor {
  const newbie = typeof id === "string" ? create(id) : id;

  if (x === undefined || y === undefined) {
    const loc = randomSpawnLocFor(level, newbie);
    if (loc.isNone()) {
      console.error("Failed to find spawn location for : " + newbie.name);
      return;
    }
    const xy = loc.unwrap();
    newbie.x = xy.x;
    newbie.y = xy.y;
  } else {
    newbie.x = x;
    newbie.y = y;
  }

  level.addActor(newbie);
  return newbie;
}
