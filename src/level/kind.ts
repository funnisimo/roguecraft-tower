import * as GWU from "gw-utils";
import * as GWD from "gw-dig";
import { ObjEvents } from "../game";
import * as HORDE from "../horde";
import { LevelEvents } from "./level";

// TODO - Move to Tower specific plugin
export interface WaveInfo {
  delay?: number;
  horde?: string | Partial<HORDE.MatchOptions>;
  power?: number;
}

export interface LevelKind {
  id: string;
  width: number;
  height: number;
  depth: number;
  seed: number;
  welcome: string;
  proceed: string;
  waves: WaveInfo[];
  tick_time: number;

  scene: string;
  scene_opts: GWU.app.SceneCreateOpts;

  dig?: GWD.DiggerOptions;
  layout?: { data: string[]; tiles: { [id: string]: string } };

  on: ObjEvents & LevelEvents;
  data: { [id: string]: any };
}

export type LevelConfig = Partial<LevelKind> & {
  id: string;
  width: number;
  height: number;
};

export const kinds: Record<string, LevelKind> = {};

// @ts-ignore
globalThis.LevelKinds = kinds;

export function makeKind(cfg: LevelConfig): LevelKind {
  const kind = Object.assign(
    {
      id: "",
      tick_time: 50, // TODO - Is this a good default?
      on: {},
      data: {},
      scene: "level",
      scene_opts: {},
    },
    cfg
  ) as LevelKind;

  if (!kind.id || kind.id.length === 0) {
    throw new Error("LevelKind must have 'id'.");
  }

  if (kind.layout) {
    const data = kind.layout.data;
    if (!data || !kind.layout.tiles)
      throw new Error("LevelKind 'layout' field must have 'data' and 'tiles'.");

    const h = data.length;
    const w = data[0].length;
    if (kind.width != w) {
      console.log("Changing LevelKind width to match 'layout' dimensions.");
      kind.width = w;
    }
    if (kind.height != h) {
      console.log("Changing LevelKind height to match 'layout' dimensions.");
      kind.height = h;
    }
  } else {
    kind.dig = kind.dig || {};

    // Is the default dig a good idea?
    kind.dig = GWU.utils.mergeDeep(
      // This is the default dig
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
          upTile: "UP_STAIRS_INACTIVE",
          down: true,
        },
        goesUp: true,
      },
      // Whatever you pass in overrides this
      kind.dig
    );
  }

  return kind;
}

export function install(cfg: LevelConfig): LevelKind;
export function install(id: string, cfg: Omit<LevelConfig, "id">): LevelKind;
export function install(...args: any[]): LevelKind {
  let id: string, config: LevelConfig;
  if (args.length == 1) {
    config = args[0];
    id = config.id;
  } else {
    id = args[0];
    config = args[1];
  }
  const kind = makeKind(config);
  kind.id = id;

  kinds[id.toLowerCase()] = kind;

  return kind;
}

export function getKind(id: string): LevelKind | null {
  return kinds[id.toLowerCase()] || null;
}
