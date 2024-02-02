import * as GWU from "gw-utils";
import * as HORDE from "./horde";
import * as ACTOR from "./actor";
import * as FX from "./fx";
import * as TILE from "./tile";
import { Level, LevelCreateOpts } from "./level";

export interface WaveInfo {
  delay?: number;
  horde?: string | Partial<HORDE.MatchOptions>;
  power?: number;
}

export const level_kinds = {
  TOWER: {
    id: "TOWER",
    width: 60,
    height: 35,
    scene: "level",
    dig: true,
    keymap: { i: "show_inventory" },
    on: {
      create(level: Level, opts: LevelCreateOpts) {
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
      hide(level) {
        // @ts-ignore
        level.removeActor(level.game.hero);
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
        const inactiveStairs = TILE.getTileByName("UP_STAIRS_INACTIVE")!.index;
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
        // TODO - Move to gameopts?
        const game = level.game;
        game.app.scenes.start("lose", {
          depth: level.data.depth,
          game,
          reason,
        });
      },
    },
  },
};
