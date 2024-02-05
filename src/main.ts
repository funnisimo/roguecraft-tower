import * as GWU from "gw-utils";
import "./plugins";
import "./hordes";
import * as ACTOR_KINDS from "./actor_kinds";
import * as DROP_KINDS from "./drop_kinds";
import * as LEVEL_KINDS from "./level_kinds";
import * as MELEE_KINDS from "./melee_kinds";
import * as ARMOR_KINDS from "./armor_kinds";
import * as RANGED_KINDS from "./ranged_kinds";
import "./potion";
import "./enchants";
import * as GAME from "./game";
import { core_commands } from "./command";
import { Level } from "./level";
import * as ACTOR from "./actor";

const extra_commands = {
  show_inventory: (scene: GWU.app.Scene, e: GWU.app.Event) => {
    console.log(">> INVENTORY <<");
    e.stopPropagation();
  },
  spawn_zombie: (scene, e) => {
    const level = scene.data.level as Level;
    const game = level.game;
    ACTOR.spawn(level, "zombie", game.hero.x, game.hero.y);
    e.stopPropagation();
  },
};

function start() {
  // create the user interface
  const opts: GAME.StartAppOpts = {
    name: "Roguecraft: Tower",
    plugins: ["core", "potion"],
    start_level: 1,
    data: { LAST_LEVEL: 10 },
    levels: { default: "TOWER" }, // TODO - Allow setting default without an object - e.g: levels: "TOWER",
    game: {
      create(game: GAME.Game, opts: GAME.GameOpts) {
        for (let i = 1; i <= game.data.LAST_LEVEL; ++i) {
          const levelSeed = game.rng.number(100000);
          game.seeds[i] = levelSeed;
          console.log(`Level: ${i}, seed=${levelSeed}`);
        }
      },
      lose(game: GAME.Game, reason: string) {
        game.app.scenes.start("lose", { reason, game });
      },
    },
    commands: [core_commands, extra_commands],
    kinds: {
      actor: ACTOR_KINDS.actors,
      hero: ACTOR_KINDS.heroes,
      item: [
        DROP_KINDS.drop_kinds,
        ARMOR_KINDS.armor_kinds,
        MELEE_KINDS.melee_kinds,
        RANGED_KINDS.ranged_kinds,
      ],
      level: LEVEL_KINDS.level_kinds,
      tile: LEVEL_KINDS.tiles,
      // TODO - horde: ...,
    },

    // TODO - horde: { kinds: ... }
  };

  GAME.startApp(opts);
}

globalThis.onload = start;

// TODO - This should be in the gw-utils bundle
// @ts-ignore
globalThis.GWU = GWU;
