import * as GWU from "gw-utils";
import { Game, GameOpts } from "./game";
import { install } from "./plugins";
import * as ACTOR from "../actor";
import * as HORDE from "../horde";
import { Level } from "../level/level";
import * as FX from "../fx";
import * as TILE from "../tile";
import { Actor } from "../actor";

/*
install("simple_hero", {
  app: {
    start(app: GWU.app.App) {
      console.log("STARTING SIMPLE HERO PLUGIN.");
    },
  },
  game: {
    create(game: Game) {
      console.log("Starting simple_hero game...");

      // TODO - Change this so that the default class does not have the LAST_LEVEL concept
      const LAST_LEVEL = 10;
      for (let i = 0; i < LAST_LEVEL; ++i) {
        const levelSeed = game.rng.number(100000);
        game.seeds[i] = levelSeed;
        console.log(`Level: ${i}, seed=${levelSeed}`);
      }

      const scene = { sceneId: "level", startOpts: { levelId: 0 } };
    },
  },
  level: {
    show(level: Level, scene: GWU.app.Scene) {
      // put player in starting location
      let startLoc = level.locations.start || [
        Math.floor(level.width / 2),
        Math.floor(level.height / 2),
      ];

      // TODO - this should be an Option<Loc>
      startLoc = level.rng.matchingLocNear(startLoc[0], startLoc[1], (x, y) =>
        level.hasTile(x, y, "FLOOR")
      );

      // TODO - if (startLoc.isNone()) { return GWU.Result.Err("Failed to find starting location for Hero on level: " + level.id); }
      // TODO - let res = next(req);
      // TODO - if (res.isErr()) { return res; }

      const hero = level.game.hero;
      hero.clearGoal();

      ACTOR.spawn(level, hero as unknown as Actor, startLoc[0], startLoc[1]);

      level.data.wavesLeft = level.waves.length;
      level.waves.forEach((wave) => {
        console.log("WAVE - " + wave.delay);
        level.wait(wave.delay || 0, () => {
          let horde: HORDE.Horde | null = null;
          if (wave.horde) {
            if (typeof wave.horde === "string") {
              horde = HORDE.from(wave.horde);
            } else {
              wave.horde.depth = wave.horde.depth || level.depth;
              horde = HORDE.random(wave.horde);
            }
          } else {
            horde = HORDE.random({ depth: level.depth });
          }

          if (!horde) {
            throw new Error(
              "Failed to get horde: " + JSON.stringify(wave.horde)
            );
          }
          const leader = horde.spawn(level, wave);
          if (!leader) throw new Error("Failed to place horde!");
          leader.once("add", () => {
            --level.data.wavesLeft;
          });
        });
      });

      if (level.welcome) {
        level.game.addMessage(level.welcome);
      }
    },

    tick(level: Level, time: number) {
      // Do we have work left to do on the level?
      if (level.data.wavesLeft > 0) return;
      if (level.actors.length > 1) return;

      // win level
      level.done = true;
      if (level.proceed) {
        level.game.addMessage(level.proceed);
      }
      const inactiveStairs = TILE.tilesByName["UP_STAIRS_INACTIVE"].index;
      level.tiles.forEach((index, x, y) => {
        if (index === inactiveStairs) {
          FX.flash(level, x, y, "yellow").then(() => {
            level.setTile(x, y, "UP_STAIRS");
          });
        }
      });
    },
  },
});
*/
