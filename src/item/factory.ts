import * as GWU from "gw-utils";
import { CallbackFn, ObjEvents } from "../game";
import { Level } from "../level";
import { Item } from "./item";
import {
  ItemEvents,
  ItemKind,
  ItemCreateOpts,
  getKind,
  ItemKindConfig,
  makeKind,
} from "./kind";

export type ItemKindConfigSet = { [id: string]: ItemKindConfig };

export interface ItemPlugin extends ItemEvents {
  createKind?: (kind: ItemKind, opts: ItemKindConfig) => void;
  on?: ObjEvents; // give core events better type help?
  data?: Record<string, string>;
  kinds?: ItemKindConfigSet | ItemKindConfigSet[];
}

export class ItemFactory {
  plugins: ItemPlugin[] = [];
  kinds: Record<string, ItemKind> = {};

  use(plugin: ItemPlugin) {
    this.plugins.push(plugin);
  }

  installKind(opts: ItemKindConfig): ItemKind;
  installKind(id: string, opts: ItemKindConfig): ItemKind;
  installKind(...args: any[]): ItemKind {
    let id: string;
    let opts: ItemKindConfig;
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

  getKind(id: string): ItemKind | null {
    return this.kinds[id.toLowerCase()] || null;
  }

  create(kind: ItemKind, opts: ItemCreateOpts = {}): Item {
    // Create the Item
    let out: GWU.Option<Item> = GWU.Option.None();
    if (opts.ctor) {
      out = opts.ctor(kind, opts);
    }
    out = this.plugins.reduce((v, p) => {
      if (v.isNone() && p.ctor) {
        return p.ctor(kind, opts);
      }
      return v;
    }, out);
    let item = out.unwrapOrElse(() => new Item(kind));

    // Update the item events/data
    this.apply(item);

    // finish making the item
    item._create(opts);
    item.emit("create", item, opts);

    return item;
  }

  apply(item: Item) {
    this.plugins.forEach((p) => {
      Object.entries(p).forEach(([key, val]) => {
        if (key == "data") {
          item.data = GWU.utils.mergeDeep(item.data, val);
        } else if (key == "on") {
          Object.entries(val).forEach(([k, v]: [string, CallbackFn]) => {
            if (typeof v === "function") {
              item.on(k, v);
            }
          });
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

export const factory = new ItemFactory();

export function use(plugin: ItemEvents) {
  factory.use(plugin);
}

export function make(id: string | ItemKind, opts: ItemCreateOpts = {}): Item {
  let kind: ItemKind = typeof id === "string" ? factory.getKind(id) : id;

  if (!kind || typeof kind !== "object" || typeof kind.id !== "string") {
    throw new Error("Invalid ItemKind: " + JSON.stringify(id));
  }

  return factory.create(kind, opts);
}

export type ItemCallback = (item: Item) => void;

export interface ThenItem {
  then(cb: ItemCallback): void;
}

export function place(
  level: Level,
  x: number,
  y: number,
  id: string | Item | null = null
): Item | null {
  let newbie: Item | null;
  if (id === null) {
    newbie = random(level); // TODO - default match?
  } else if (typeof id === "string") {
    newbie = make(id);
  } else {
    newbie = id;
  }

  if (!newbie) return null;

  const bg = newbie.kind.fg;
  const game = level.game;
  // const scene = level.scene;
  // const level = level.level;

  const locs = GWU.xy.closestMatchingLocs(x, y, (i, j) => {
    return !level.blocksMove(i, j) && !level.hasItem(i, j);
  });

  if (!locs || locs.length == 0) return null;
  const loc = game.rng.item(locs);

  newbie.x = loc[0];
  newbie.y = loc[1];

  // level.events.emit("spawn_item", level, newbie);

  level.addItem(newbie);
  return newbie;
}

export function placeRandom(
  level: Level,
  x: number,
  y: number,
  match: string | string[] | null = null
): Item | null {
  let item = random(level, match);
  if (!item) {
    return null;
  }
  return place(level, x, y, item);
}

export function random(
  level: Level,
  match: string[] | string | null = null
): Item | null {
  // pick random kind
  let allKinds = Object.values(factory.kinds);
  let matches: string[];
  if (match === null) {
    matches = [];
  } else if (typeof match == "string") {
    matches = match.split(/[|,]/).map((v) => v.trim());
  } else {
    matches = match.map((v) => v.trim());
  }
  if (matches.length > 0) {
    allKinds = allKinds.filter((kind) => {
      return matches.every((m) => {
        if (m[0] == "!") {
          return !kind.tags.includes(m.substring(1));
        } else {
          return kind.tags.includes(m);
        }
      });
    });
  }

  const chances = allKinds.map((k) => k.frequency(level.depth));
  const index = level.rng.weighted(chances);
  if (index < 0) return null;

  const kind = allKinds[index];
  const item = make(kind);

  return item;
}
