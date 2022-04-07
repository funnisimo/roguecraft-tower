import * as GWU from "gw-utils";
import * as GWD from "gw-dig";
import { CallbackFn, Game } from ".";
import { Actor } from "../actor";
import { Obj } from "./obj";

export interface TileEvents {
  // tile is this
  place?: (this: TileInfo, game: Game, x: number, y: number) => void;
  tick?: (this: TileInfo, game: Game, x: number, y: number) => void;

  // x, y from actor, tile is this
  enter?: (this: TileInfo, game: Game, actor: Actor) => void;
  exit?: (this: TileInfo, game: Game, actor: Actor) => void;

  // x, y from item, tile is this
  drop?: (this: TileInfo, game: Game, item: Obj) => void;
  pickup?: (this: TileInfo, game: Game, item: Obj) => void;

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

export interface TileInfo
  extends Omit<TileOptions, "priority" | "tags">,
    GWD.site.TileInfo {}

// export interface TileInfo extends TileConfig {
//   index: number;
// }

export const tilesByIndex: TileInfo[] = [];
export const tilesByName: Record<string, TileInfo> = {};

export function install(cfg: TileConfig) {
  const info = GWD.site.installTile(cfg);
  tilesByIndex[info.index] = info;
  tilesByName[info.id] = info;
}

install({ id: "FLOOR", ch: "\u00b7", fg: 0x666, bg: 0x222 });
install({
  id: "WALL",
  ch: "#",
  fg: 0x333,
  bg: 0x666,
  blocksMove: true,
  blocksVision: true,
  blocksDiagonal: true,
});
install({
  id: "CORPSE",
  ch: "&",
  fg: 0x666,
  bg: 0x222,
  priority: 15,
  on: {
    place(game, x, y) {
      // game.wait(1000, () => {
      //   if (game.map.hasTile(x, y, ids.CORPSE)) {
      //     game.setTile(x, y, ids.FLOOR);
      //   }
      // });
    },
    tick(game: Game, x: number, y: number) {
      if (game.rng.chance(5)) {
        game.level!.setTile(x, y, "FLOOR");
      }
    },
  },
});
install({
  id: "DOWN_STAIRS",
  ch: "<",
  fg: "gray",
  on: {
    enter(game, actor) {
      game.addMessage("There is no turning back.");
    },
  },
});
install({
  id: "UP_STAIRS",
  ch: ">",
  fg: "orange",
  on: {
    enter(game, actor) {
      game.addMessage("Going up!");
      game.scene!.trigger("win");
    },
  },
});
install({
  id: "UP_STAIRS_INACTIVE",
  ch: ">",
  fg: "gray",
  priority: 75,
  on: {
    enter(game, actor) {
      game.addMessage("There is more to do.");
    },
  },
});

install({
  id: "IMPREGNABLE",
  ch: "#",
  fg: 0x222,
  bg: 0x444,
  priority: 200,
  blocksMove: true,
  blocksVision: true,
  blocksDiagonal: true,
});

GWD.site.allTiles.forEach((t) => {
  if (tilesByName[t.id]) return;
  install(t);
});
