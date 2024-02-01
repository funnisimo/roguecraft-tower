import * as PLUGINS from "../game/plugins";
import { Level } from "../level";
import * as ACTIONS from "../action";
import * as TILE from "../tile";

export const turn_based: PLUGINS.Plugin = {
  name: "turn_based",
  level: {
    update(level: Level, dt: number) {
      // TODO - Need to support different update loops
      //      - "turn_based", "real_time", "combo"

      const game = level.game;
      // TODO - Move inputQueue to Level
      while (game.inputQueue.length && game.needInput) {
        const e = game.inputQueue.dequeue();
        e &&
          e.dispatch({
            emit: (evt, e) => {
              let action = game.keymap[evt];
              if (!action) return;
              if (typeof action === "function") {
                return action(level, e);
              }
              let fn = ACTIONS.get(action);
              if (!fn) {
                console.warn(
                  `Failed to find action: ${action} for key: ${evt}`
                );
              } else {
                // @ts-ignore
                fn(level, game.hero);
                level.scene.needsDraw = true;
                e.stopPropagation(); // We handled it
              }
            },
          });
      }

      if (game.needInput) return;

      let filter = false;
      let actor = level.scheduler.pop();

      const startTime = level.scheduler.time;
      let elapsed = 0;

      while (actor) {
        if (typeof actor === "function") {
          actor(level);
          if (elapsed > 16) return;
        } else if (actor.health <= 0) {
          // skip
          filter = true;
        } else if (actor === game.hero) {
          actor.act(level);
          if (filter) {
            level.actors = level.actors.filter((a) => a && a.health > 0);
          }
          level.scene.needsDraw = true;
          return;
        } else {
          actor.act(level);
        }
        if (level.scene.timers.length || level.scene.tweens.length) {
          return;
        }
        if (level.scene.paused.update) {
          return;
        }
        actor = level.scheduler.pop();
        elapsed = level.scheduler.time - startTime;
      }

      // no other actors
      game.needInput = true;

      return;
    },
  },
};
PLUGINS.install(turn_based);

export const level: PLUGINS.Plugin = {
  name: "level",
  level: {
    tick(level: Level, dt: number) {
      if (!level.started) return;

      // tick actors
      level.actors.forEach((a) => {
        // TODO - check if alive?
        a.tick(this, dt);
      });

      // tick tiles
      level.tiles.forEach((index, x, y) => {
        const tile = TILE.tilesByIndex[index];
        if (tile.on && tile.on.tick) {
          tile.on.tick.call(tile, level, x, y, dt);
        }
      });
    },
  },
};
PLUGINS.install(level);
