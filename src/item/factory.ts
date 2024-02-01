import * as GWU from "gw-utils";
import { CallbackFn } from "../game";
import { Level } from "../level";
import { Item } from "./item";
import { ItemKind, ItemMakeOpts, getKind, kinds } from "./kind";

export class ItemFactory {
  plugins: ItemMakeOpts[] = [];

  use(plugin: ItemMakeOpts) {
    this.plugins.push(plugin);
  }

  make(kind: ItemKind, opts: ItemMakeOpts = {}): Item {
    // Create the Item
    let out: GWU.Option<Item> = GWU.Option.None();
    if (!!opts.create) {
      out = opts.create(kind, opts);
    } else if (!!opts.on && opts.on.create) {
      out = opts.on.create(kind, opts);
    }
    out = this.plugins.reduce((v, p) => {
      if (!!v && v.isSome()) return v;
      if (p.create) {
        return p.create(kind, opts);
      } else if (!!p.on && p.on.create) {
        return p.on.create(kind, opts);
      }
      return v;
    }, out);
    let item = out.isSome() ? out.unwrap() : new Item(kind);

    // Update the item events/data
    this.apply(item);

    // finish making the item
    item._make(opts);
    item.emit("make", item, opts);

    return item;
  }

  apply(item: Item) {
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
          item.data = GWU.utils.mergeDeep(item.data, val);
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

export function use(plugin: ItemMakeOpts) {
  factory.use(plugin);
}

export function make(id: string | ItemKind, opts: ItemMakeOpts = {}): Item {
  let kind: ItemKind = typeof id === "string" ? getKind(id) : id;

  if (!kind || typeof kind !== "object" || typeof kind.id !== "string") {
    throw new Error("Invalid ItemKind: " + JSON.stringify(id));
  }

  return factory.make(kind, opts);
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
  let allKinds = Object.values(kinds);
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
