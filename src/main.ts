import * as GWU from "gw-utils";
import * as SCENES from "./scenes/index";
import * as TILE from "./tile";
import "./plugins";
import * as ACTOR_KINDS from "./actor_kinds";
import "./hordes";
import * as DROP_KINDS from "./drop_kinds";
import * as LEVEL_KINDS from "./level_kinds";
import * as MELEE_KINDS from "./melee_kinds";
import * as ARMOR_KINDS from "./armor_kinds";
import * as RANGED_KINDS from "./ranged_kinds";
import "./potion";
import "./enchants";
import * as GAME from "./game";

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
    },
    actor: { kinds: ACTOR_KINDS.actors },
    hero: { kinds: ACTOR_KINDS.heroes },
    item: {
      kinds: [
        DROP_KINDS.drop_kinds,
        ARMOR_KINDS.armor_kinds,
        MELEE_KINDS.melee_kinds,
        RANGED_KINDS.ranged_kinds,
      ],
    },
    level: {
      kinds: LEVEL_KINDS.level_kinds,
      tiles: [TILE.default_tiles, LEVEL_KINDS.tiles],
    },
    // TODO - horde: { kinds: ... }
    // TODO - tile: { kinds: ... }
  };

  GAME.startApp(opts);
}

globalThis.onload = start;

// TODO - This should be in the gw-utils bundle
// @ts-ignore
globalThis.GWU = GWU;
