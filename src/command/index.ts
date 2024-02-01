import * as GWU from "gw-utils";
import { Level } from "../level";
import * as TILE from "../tile";
import * as ACTOR from "../actor";
import * as ACTIONS from "../action";

export type CommandFn = (scene: GWU.app.Scene, e: GWU.app.Event) => void;
const commandsByName: Record<string, CommandFn> = {};

export function install(name: string, fn: CommandFn) {
  commandsByName[name] = fn;
}

export function get(name: string): CommandFn | null {
  return commandsByName[name] || null;
}

install("show_inventory", (scene: GWU.app.Scene, e: GWU.app.Event) => {
  console.log(">> INVENTORY <<");
  e.stopPropagation();
});

install("find_up_stairs", (scene: GWU.app.Scene, e: GWU.app.Event) => {
  // find stairs
  let loc: GWU.xy.Loc = [-1, -1];
  const level = scene.data.level as Level;
  level.tiles.forEach((t, x, y) => {
    const tile = TILE.tilesByIndex[t];
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
});

install("find_down_stairs", (scene: GWU.app.Scene, e: GWU.app.Event) => {
  // find stairs
  let loc: GWU.xy.Loc = [-1, -1];
  const level = scene.data.level as Level;
  level.tiles.forEach((t, x, y) => {
    const tile = TILE.tilesByIndex[t];
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
});

install("move_dir", (scene: GWU.app.Scene, e: GWU.app.Event) => {
  const level = scene.data.level as Level;
  // @ts-ignore
  ACTIONS.moveDir(level, level.game.hero, e.dir);
  scene.needsDraw = true;
  e.stopPropagation();
});

install("follow_path", (scene: GWU.app.Scene, e: GWU.app.Event) => {
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
});

install("spawn_zombie", (scene, e) => {
  const level = scene.data.level as Level;
  const game = level.game;
  ACTOR.spawn(level, "zombie", game.hero.x, game.hero.y);
  e.stopPropagation();
});
