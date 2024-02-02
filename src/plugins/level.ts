import * as GWD from "gw-dig";
import * as GWU from "gw-utils";
import * as PLUGINS from "../game/plugins";
import { Level, LevelKind, LevelCreateOpts } from "../level";
import * as ACTIONS from "../action";
import * as TILE from "../tile";
import { Game } from "../game";
import { Actor } from "../actor";
import { Hero } from "../hero";
import * as COMMANDS from "../command";

export const level: PLUGINS.Plugin = {
  name: "level",
  actor: {
    add(level: Level, actor: Actor) {
      level.scheduler.push(actor, actor.kind.moveSpeed);
      actor._level = level;
    },
    remove(level: Level, actor: Actor) {
      level.scheduler.remove(actor);
      actor._level = null;
    },
  },
  hero: {
    add(level: Level, actor: Hero) {
      level.scheduler.push(actor, actor.kind.moveSpeed);
      actor._level = level;
    },
    remove(level: Level, actor: Hero) {
      level.scheduler.remove(actor);
      actor._level = null;
    },
  },
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

export const turn_based: PLUGINS.Plugin = {
  name: "turn_based",
  level: {
    show(level, scene) {
      level.inputQueue.clear();
      // level.needInput = true;
      // Add hero?
    },
    update(level: Level, dt: number) {
      // TODO - Need to support different update loops
      //      - "turn_based", "real_time", "combo"

      const game = level.game;
      // TODO - Move inputQueue to Level
      while (level.inputQueue.length && level.needInput) {
        const e = level.inputQueue.dequeue();
        e &&
          e.dispatch({
            emit: (evt, e) => {
              let command = game.keymap[evt];
              if (!command) return;
              if (typeof command === "function") {
                return command(level.scene, e);
              }
              // TODO - handle '@action, '=command', or 'either'
              let fn = ACTIONS.get(command);
              if (fn) {
                // @ts-ignore
                fn(level, game.hero);
                level.scene.needsDraw = true;
                e.stopPropagation(); // We handled it
              } else {
                let fn = COMMANDS.get(command);
                if (fn) {
                  fn(level.scene, e);
                } else {
                  console.warn(
                    `Failed to find action or command: ${command} for key: ${evt}`
                  );
                }
              }
            },
          });
      }

      if (level.needInput) return;

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
      level.needInput = true;

      return;
    },
  },
};
PLUGINS.install(turn_based);

export interface LayoutData {
  data: string[];
  tiles: { [id: string]: string };
}

declare module "../level" {
  interface LevelKind {
    layout?: LayoutData;
    dig?: boolean | GWD.DiggerOptions;
  }

  interface LevelCreateOpts {
    layout?: Partial<LayoutData>;
    dig?: boolean | GWD.DiggerOptions;
  }
}

export const layout_level: PLUGINS.Plugin = {
  name: "layout_level",
  level: {
    // TODO - move size logic to plugin.makeKind()
    ctor(
      game: Game,
      id: string | number,
      kind: LevelKind,
      opts: LevelCreateOpts
    ) {
      if (kind.layout || opts.layout) {
        const opts_layout: Partial<LayoutData> = opts.layout || {};
        const kind_layout: Partial<LayoutData> = kind.layout || {};

        const data = opts_layout.data || kind_layout.data;
        if (!data) return GWU.Option.None();

        if (!Array.isArray(data) || !Array.isArray(data[0])) {
          console.warn("Invalid level layout");
          return GWU.Option.None();
        }

        const h = data.length;
        const w = data[0].length;
        if (kind.width != w) {
          console.log("Changing LevelKind width to match 'layout' dimensions.");
          kind.width = w;
        }
        if (kind.height != h) {
          console.log(
            "Changing LevelKind height to match 'layout' dimensions."
          );
          kind.height = h;
        }
      }
      return GWU.Option.None();
    },
    create(level: Level, opts: LevelCreateOpts) {
      const opts_layout: Partial<LayoutData> = opts.layout || {};
      const kind_layout: Partial<LayoutData> = level.kind.layout || {};

      const data = opts_layout.data || kind_layout.data;
      if (!data) return;
      if (!Array.isArray(data) || !Array.isArray(data[0])) {
        console.warn("Invalid level layout");
        return;
      }

      const tiles = GWU.utils.mergeDeep(
        kind_layout.tiles || {},
        opts_layout.tiles || {}
      );
      loadLevel(this, data, tiles);
    },
  },
};
PLUGINS.install(layout_level);

export function loadLevel(
  level: Level,
  data: string[],
  tiles: Record<string, string>
) {
  level.fill("NONE");
  for (let y = 0; y < data.length; ++y) {
    const line = data[y];
    for (let x = 0; x < line.length; ++x) {
      const ch = line[x];
      const tile = tiles[ch] || "NONE";
      level.setTile(x, y, tile);
    }
  }
}

export const dig_level: PLUGINS.Plugin = {
  name: "dig_level",
  level: {
    create(level: Level, opts: LevelCreateOpts) {
      if (opts.dig === false) return;

      if (opts.dig === undefined) {
        if (!level.kind.dig) {
          return;
        }
      }

      const opts_dig = typeof opts.dig !== "object" ? {} : opts.dig;
      const kind_dig = typeof level.kind.dig !== "object" ? {} : level.kind.dig;

      const kind_config = GWU.utils.mergeDeep(
        {
          rooms: { count: 20, first: "FIRST_ROOM", digger: "PROFILE" },
          doors: false, // { chance: 50 },
          halls: { chance: 50 },
          loops: { minDistance: 30, maxLength: 5 },
          lakes: false /* {
              count: 5,
              wreathSize: 1,
              wreathChance: 100,
              width: 10,
              height: 10,
            },
            bridges: {
              minDistance: 10,
              maxLength: 10,
            }, */,
          stairs: {
            start: "down",
            up: true,
            upTile: "UP_STAIRS_INACTIVE", // TODO - This is not right for a default!!!
            down: true,
          },
          goesUp: true,
        },
        kind_dig || {}
      );

      const dig_config = GWU.utils.mergeDeep(kind_config, opts_dig);

      digLevel(level, dig_config, level.seed);
    },
  },
};
PLUGINS.install(dig_level);

function digLevel(level: Level, dig: GWD.DiggerOptions, seed = 12345) {
  const firstRoom = level.depth < 2 ? "ENTRANCE" : "FIRST_ROOM";
  const digger = new GWD.Digger(dig);
  digger.seed = seed;
  digger.create(level.width, level.height, (x, y, v) => {
    level.setTile(x, y, v);
  });

  GWD.site.analyze(level);

  level.locations = digger.locations;
}
