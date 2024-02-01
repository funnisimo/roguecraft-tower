import { Actor } from "../actor";
import * as PLUGINS from "../game/plugins";
import { placeRandom } from "../item";
import { Level } from "../level";

// NOTE - There really isn't anything special about items yet.
export const actor: PLUGINS.Plugin = {
  name: "actor",
  actor: {
    death(level: Level, actor: Actor) {
      if (
        this.kind.dropChance &&
        this._level!.rng.chance(this.kind.dropChance)
      ) {
        placeRandom(this._level!, this.x, this.y, this.kind.dropMatch);
      }
    },
  },
};
PLUGINS.install(actor);
