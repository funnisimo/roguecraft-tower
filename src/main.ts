import * as GWU from "gw-utils";
import * as SCENES from "./scenes/index";
import * as TILE from "./tile";
import "./plugins";
import "./actors";
import "./hordes";
import "./items";
import "./melee";
import "./armor";
import "./ranged";
import "./potion";
import "./enchants";
import * as GAME from "./game";
import * as FX from "./fx";
import { install as installLevel, Level, LevelMakeOpts } from "./level";
import * as ACTOR from "./actor";
import * as HORDE from "./horde";

export interface WaveInfo {
  delay?: number;
  horde?: string | Partial<HORDE.MatchOptions>;
  power?: number;
}

function start() {
  installLevel({
    id: "TOWER",
    width: 60,
    height: 35,
    scene: "level",
    dig: true,
    on: {
      make(level: Level, opts: LevelMakeOpts) {
        console.log("TOWER LEVEL CREATE");
        const depth = (level.data.depth = parseInt(level.id.toString()));

        if (level.kind.data.waves && level.kind.data.waves.length > 0) {
          level.data.waves = level.kind.data.waves;
        } else {
          level.data.waves = [];
          for (let i = 0; i < depth; ++i) {
            level.data.waves.push({
              delay: 500 + i * 2000,
              power: depth * 2 - 1 + level.rng.dice(1, 3),
              horde: { depth: depth },
            });
          }
        }
        level.data.wavesLeft = level.data.waves.length;
      },
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

        level.game.hero.clearGoal();

        // TODO - real time flash, then do all of this...

        // @ts-ignore
        ACTOR.spawn(level, level.game.hero, startLoc[0], startLoc[1]);

        level.data.wavesLeft = level.data.waves.length;
        level.data.waves.forEach((wave) => {
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
      tick(level: Level, dt: number) {
        // Do we have work left to do on the level?
        if (level.done || !level.started) return;
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
      up_stairs(level: Level, actor: ACTOR.Actor) {
        const game = level.game;
        const depth = level.data.depth;
        if (depth >= game.data.LAST_LEVEL) {
          game.app.scenes.start("win", { game });
        } else {
          game.app.scenes.start("reward", { depth: depth, game });
        }
      },
      lose(level: Level, reason: string) {
        const game = level.game;
        game.app.scenes.start("lose", {
          depth: level.data.depth,
          game,
          reason,
        });
      },
    },
  });

  //   win(this: GWU.app.Scene) {
  //   const game = this.data.game as Game;

  //   const LAST_LEVEL = this.app.data.get("LAST_LEVEL");
  //   if (this.data.level.depth === LAST_LEVEL) {
  //     this.app.scenes.start("win", this.data);
  //   } else {
  //     this.app.scenes.start("reward", this.data);
  //   }
  // },
  // lose(this: GWU.app.Scene) {
  //   this.app.scenes.start("lose", this.data);
  // },

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
  };

  GAME.startApp(opts);
}

globalThis.onload = start;

// TODO - This should be in the gw-utils bundle
// @ts-ignore
globalThis.GWU = GWU;
