import * as GWU from "gw-utils";
import * as GWD from "gw-dig";
import { Actor } from "../actor";
import { CallbackFn, Obj } from "../object";
import { Level } from "../level";

export interface TileEvents {
  // tile is this
  place?: (this: TileInfo, level: Level, x: number, y: number) => void;

  tick?: (
    this: TileInfo,
    level: Level,
    x: number,
    y: number,
    dt: number
  ) => void;

  // x, y from actor, tile is this
  enter?: (this: TileInfo, level: Level, actor: Actor) => void;
  exit?: (this: TileInfo, level: Level, actor: Actor) => void;

  // x, y from item, tile is this
  drop?: (this: TileInfo, level: Level, item: Obj) => void;
  pickup?: (this: TileInfo, level: Level, item: Obj) => void;

  [key: string]: CallbackFn | undefined;
}

export interface TileOptions extends GWD.site.TileOptions {
  ch?: string;
  fg?: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  blocksMove?: boolean;
  blocksVision?: boolean;
  blocksDiagonal?: boolean; // cannot attack or move diagonally around this tile

  on?: TileEvents;
}

export interface TileConfig extends TileOptions, GWD.site.TileConfig {}
export type TileConfigSet = Record<string, TileConfig>;

export interface TilePlugin extends GWD.site.TilePlugin {
  tiles: TileConfigSet | TileConfigSet[];
}

export interface TileInfo
  extends Omit<TileOptions, "priority" | "tags">,
    GWD.site.TileInfo {}

// export const tilesByIndex: TileInfo[] = [];
// export const tilesByName: Record<string, TileInfo> = {};

export function install(cfg: TileConfig) {
  console.log("INSTALL TILE - " + cfg.id);

  const info = GWD.site.installTile(cfg);
  // tilesByIndex[info.index] = info;
  // tilesByName[info.id] = info;
}

export function installSet(set: TileConfigSet | TileConfigSet[]) {
  let kinds: TileConfigSet[] = [];
  if (!Array.isArray(set)) {
    kinds = [set];
  } else {
    kinds = set;
  }
  kinds.forEach((kindSet) => {
    Object.entries(kindSet).forEach(([k, v]: [string, TileConfig]) => {
      install(v);
    });
  });
}

export function getTile(index: number): TileInfo | null {
  return GWD.site.getTile(index);
}

export function getTileByName(name: string): TileInfo | null {
  return GWD.site.getTile(name);
}

export const default_tiles: TileConfigSet = {
  FLOOR: { id: "FLOOR", ch: "\u00b7", fg: 0x666, bg: 0x222 },
  WALL: {
    id: "WALL",
    ch: "#",
    fg: 0x333,
    bg: 0x666,
    blocksMove: true,
    blocksVision: true,
    blocksDiagonal: true,
  },
  CORPSE: {
    id: "CORPSE",
    ch: "&",
    fg: 0x666,
    bg: 0x222,
    priority: 15,
    on: {
      place(level, x, y) {
        // game.wait(1000, () => {
        //   if (game.map.hasTile(x, y, ids.CORPSE)) {
        //     game.setTile(x, y, ids.FLOOR);
        //   }
        // });
      },
      tick(level: Level, x: number, y: number) {
        if (level.rng.chance(5)) {
          level.setTile(x, y, "FLOOR");
        }
      },
    },
  },
  DOWN_STAIRS: {
    id: "DOWN_STAIRS",
    ch: "<",
    fg: "gray",
    on: {
      enter(level: Level, actor) {
        // level.game.addMessage("There is no turning back.");
        level.emit("down_stairs", level, actor);
      },
    },
  },
  UP_STAIRS: {
    id: "UP_STAIRS",
    ch: ">",
    fg: "orange",
    on: {
      enter(level, actor) {
        // level.game.addMessage("Going up!");
        level.emit("up_stairs", level, actor);
      },
    },
  },

  IMPREGNABLE: {
    id: "IMPREGNABLE",
    ch: "#",
    fg: 0x222,
    bg: 0x444,
    priority: 200,
    blocksMove: true,
    blocksVision: true,
    blocksDiagonal: true,
  },
};
