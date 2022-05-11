import * as GWU from "gw-utils";
import { Level } from "../game/level";
import { ItemKind, getKind, kinds } from "./kind";
import { Obj, ObjConfig } from "../game/obj";
import * as FX from "../fx";

export interface ItemConfig extends ObjConfig {
  kind: ItemKind;
}

export class Item extends Obj {
  _turnTime = 0;
  _level: Level | null = null;
  kind: ItemKind;
  data: Record<string, any>;

  constructor(cfg: ItemConfig) {
    super(cfg);
    this.kind = cfg.kind;
    if (!this.kind) throw new Error("Must have kind.");

    this.data = {};

    this.on("add", (level: Level) => {
      this._level = level;
    });
    this.on("remove", (level) => {
      this._level = null;
    });

    Object.entries(this.kind.on).forEach(([key, value]) => {
      if (!value) return;
      this.on(key, value);
    });
  }

  draw(buf: GWU.buffer.Buffer) {
    buf.drawSprite(this.x, this.y, this.kind);
  }
}

export function make(id: string | ItemKind, opts?: Partial<ItemConfig>) {
  let kind: ItemKind | null;

  if (typeof id === "string") {
    kind = getKind(id);
    if (!kind) throw new Error("Failed to find actor kind - " + id);
  } else {
    kind = id;
  }

  const config = Object.assign(
    {
      x: 1,
      y: 1,
      z: 1, // items, actors, player, fx
      kind,
    },
    opts
  ) as ItemConfig;

  return new Item(config);
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
) {
  let newbie: Item | null;
  if (id === null) {
    newbie = random(level);
  } else if (typeof id === "string") {
    newbie = make(id);
  } else {
    newbie = id;
  }

  if (!newbie) return null;

  const bg = newbie.kind.fg;
  const game = level.game!;
  const scene = game.scene!;
  // const level = level.level;

  const locs = GWU.xy.closestMatchingLocs(x, y, (i, j) => {
    return !level.blocksMove(i, j) && !level.hasItem(i, j);
  });

  if (!locs || locs.length == 0) return false;
  const loc = game.rng.item(locs);

  newbie.x = loc[0];
  newbie.y = loc[1];
  level.addItem(newbie);
  return newbie;
}

export function random(level: Level): Item | null {
  // pick random kind
  const allKinds = Object.values(kinds);
  const chances = allKinds.map((k) => k.frequency(level.depth));
  const index = level.rng.weighted(chances);
  if (index < 0) return null;

  const kind = allKinds[index];
  const item = new Item({ kind });

  return item;
}
