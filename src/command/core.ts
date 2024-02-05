import * as GWU from "gw-utils";
import { CommandFn } from "./command";
import { Level } from "../level";
import * as TILE from "../tile";
import * as ACTOR from "../actor";
import * as ACTIONS from "../action";

export const core_commands: Record<string, CommandFn> = {
  find_up_stairs: (scene: GWU.app.Scene, e: GWU.app.Event) => {
    // find stairs
    let loc: GWU.xy.Loc = [-1, -1];
    const level = scene.data.level as Level;
    level.tiles.forEach((t, x, y) => {
      const tile = TILE.getTile(t)!;
      if (tile.id === "UP_STAIRS" || tile.id === "UP_STAIRS_INACTIVE") {
        loc[0] = x;
        loc[1] = y;
      }
    });
    // set player goal
    if (loc[0] >= 0) {
      level.game.hero.setGoal(loc[0], loc[1]);
    }
    scene.needsDraw = true;
    e.stopPropagation();
  },

  find_down_stairs: (scene: GWU.app.Scene, e: GWU.app.Event) => {
    // find stairs
    let loc: GWU.xy.Loc = [-1, -1];
    const level = scene.data.level as Level;
    level.tiles.forEach((t, x, y) => {
      const tile = TILE.getTile(t)!;
      if (tile.id === "DOWN_STAIRS") {
        loc[0] = x;
        loc[1] = y;
      }
    });
    // set player goal
    if (loc[0] >= 0) {
      level.game.hero.setGoal(loc[0], loc[1]);
    }
    scene.needsDraw = true;
    e.stopPropagation();
  },

  move_dir: (scene: GWU.app.Scene, e: GWU.app.Event) => {
    const level = scene.data.level as Level;
    // @ts-ignore
    ACTIONS.moveDir(level, level.game.hero, e.dir);
    scene.needsDraw = true;
    e.stopPropagation();
  },

  follow_path: (scene: GWU.app.Scene, e: GWU.app.Event) => {
    const level = scene.data.level as Level;
    const hero = level.game.hero;
    if (hero.goalPath && hero.goalPath.length) {
      hero.followPath = true;
      hero.act(level);
    } else {
      // pickup?
    }
    scene.needsDraw = true;
    e.stopPropagation();
  },
};
