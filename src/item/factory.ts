import * as GWU from "gw-utils";
import { CallbackFn } from "../game";
import { Level } from "../level";
import { ItemCreateOpts, Item } from "./item";
import { ItemEvents, ItemKind, getKind, kinds } from "./kind";

export interface ItemPlugin extends ItemEvents {
  on?: { [id: string]: CallbackFn };
  data?: { [key: string]: any };
}

export class ItemFactory {
  plugins: ItemPlugin[] = [];

  use(plugin: ItemPlugin) {
    this.plugins.push(plugin);
  }

  make(kind: ItemKind, opts: ItemCreateOpts = {}): Item {
    let item: Item;
    if (opts.make) {
      item = opts.make(kind, opts);
    } else {
      const makePlugin = this.plugins.find((p) => typeof p.make === "function");
      if (makePlugin) {
        item = makePlugin.make(kind, opts);
      } else {
        item = new Item(kind);
      }
    }

    this.apply(item);

    item._create(opts);

    item.emit("create", item, opts);

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
          Object.assign(item.data, val);
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

export function use(plugin: ItemPlugin) {
  factory.use(plugin);
}

export function make(id: string | ItemKind, opts: ItemCreateOpts = {}): Item {
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
