import * as GWU from "gw-utils";
import { Level } from "../game/level";
import { ItemKind, getKind, kinds } from "./kind";
import { Obj, ObjConfig } from "../game/obj";
import * as FX from "../fx";

export interface ItemConfig extends ObjConfig {
  kind: ItemKind;
  power?: number;
}

export class Item extends Obj {
  _turnTime = 0;
  _level: Level | null = null;
  kind: ItemKind;
  data: Record<string, any>;
  _power: number;
  _damage: number[];
  _defense: number;

  constructor(cfg: ItemConfig) {
    super(cfg);
    this.kind = cfg.kind;
    if (!this.kind) throw new Error("Must have kind.");

    this.data = {};
    this._damage = this.kind.damage.slice();
    this._defense = this.kind.defense;
    this._power = cfg.power || 1;

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

    this.power = this._power; // cause calculations to fire
  }

  draw(buf: GWU.buffer.Buffer) {
    buf.drawSprite(this.x, this.y, this.kind);
  }

  get name(): string {
    return this.kind.name;
  }

  get power(): number {
    return this._power;
  }

  set power(val: number) {
    val = val || 1;
    this._power = val;

    // Value = POWER * BASE * Math.pow(1.025,POWER)
    this._damage = this.kind.damage.map((v) =>
      Math.round(val * v * Math.pow(1.025, val))
    );
    this._defense = Math.round(val * this.kind.defense * Math.pow(1.025, val));
  }

  get damage(): number[] {
    return this._damage;
  }

  get range(): number {
    return this.kind.range;
  }

  get speed(): number[] {
    return this.kind.speed;
  }

  get defense(): number {
    return this._defense;
  }

  get slot(): string | null {
    return this.kind.slot;
  }
}

export function make(id: string | ItemKind, opts?: Partial<ItemConfig>) {
  let kind: ItemKind | null;
  let power = 1;

  if (typeof id === "string") {
    const parts = id.split("^").map((v) => v.trim());
    const kind_id = parts[0];
    power = Number.parseInt(parts[1] || "1");
    kind = getKind(parts[0]);
    if (!kind) throw new Error("Failed to find item kind - " + id);
  } else {
    kind = id;
  }

  const config = Object.assign(
    {
      x: 1,
      y: 1,
      z: 1, // items, actors, player, fx
      kind,
      power,
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
  const game = level.game!;
  const scene = game.scene!;
  // const level = level.level;

  const locs = GWU.xy.closestMatchingLocs(x, y, (i, j) => {
    return !level.blocksMove(i, j) && !level.hasItem(i, j);
  });

  if (!locs || locs.length == 0) return null;
  const loc = game.rng.item(locs);

  newbie.x = loc[0];
  newbie.y = loc[1];
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
  const item = new Item({ kind });

  return item;
}
