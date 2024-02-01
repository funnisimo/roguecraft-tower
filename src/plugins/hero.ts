import * as GWU from "gw-utils";
import * as PLUGINS from "../game/plugins";
import { Hero } from "../hero";
import { Level } from "../level";

// NOTE - There really isn't anything special about items yet.
export const hero: PLUGINS.Plugin = {
  name: "hero",
  hero: {
    add(level: Level, hero: Hero) {
      hero.updateMapToMe();
      hero.updateFov();
    },
    move(level: Level, hero: Hero, x: number, y: number) {
      hero.updateMapToMe();
      hero.updateFov();
    },
    remove(level: Level, hero: Hero) {
      if (hero.fov) {
        GWU.grid.free(this.fov);
        hero.fov = null;
      }
      hero.clearGoal();
    },
    // damage(hero: Hero) {
    //   hero.clearGoal();
    // },
  },
  level: {
    tick(level: Level, dt: number) {
      if (level.done || !level.started) return;

      // @ts-ignore
      if (!level.actors.includes(level.game.hero)) {
        level.done = true;
        // lose
        level.game.emit("lose", level.game, "You died.");
      }
    },
  },
};
PLUGINS.install(hero);
