import * as PLUGINS from "../game/plugins";
import { Level } from "../level";

// NOTE - There really isn't anything special about items yet.
export const hero: PLUGINS.Plugin = {
  name: "hero",
  hero: {},
  level: {
    tick(level: Level, dt: number) {
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
