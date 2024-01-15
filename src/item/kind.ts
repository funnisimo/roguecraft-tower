import * as GWU from "gw-utils";
import { Actor } from "../actor";
import { Game } from "../game";
import { Item } from "./item";
import { CallbackFn } from "../game/obj";
import { ARMOR_FLAGS } from "./flags";
import { EffectConfig } from "../effect";

export interface ItemEvents {
  // bump?: (game: Game, actor: Item, other: Item) => void;
  use?: (this: Item, game: Game, actor: Actor) => boolean;
  pickup?: (this: Item, game: Game, actor: Actor) => boolean;

  // TODO - equip?  unequip?

  [key: string]: CallbackFn | undefined;
}

export interface KindConfig {
  id: string;
  name?: string;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  frequency?: GWU.frequency.FrequencyConfig;

  //   bump?: string | string[];
  speed?: number | number[];
  damage?: number | number[];
  range?: number;

  defense?: number;

  slot?: string;

  on?: ItemEvents;
  tags?: string | string[];
  flags?: string | string[];
  effects?: EffectConfig;
}

export interface ItemKind {
  id: string;
  name: string;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  //   bump: string[];
  speed: number[];
  damage: number[];
  range: number;

  defense: number;

  slot: string | null;
  on: ItemEvents;

  frequency: GWU.frequency.FrequencyFn;
  tags: string[];
  flags: number;
  effects: EffectConfig;

  //   damage: number;
  //   attackSpeed: number;

  //   range: number;
  //   rangedDamage: number;
  //   tooClose: number;
  //   rangedAttackSpeed: number;
}

export const kinds: Record<string, ItemKind> = {};

export function install(cfg: KindConfig) {
  if (typeof cfg.speed === "number") {
    cfg.speed = [cfg.speed];
  }
  if (typeof cfg.damage === "number") {
    cfg.damage = [cfg.damage];
  }

  const kind = Object.assign(
    {
      name: "",
      ch: "!",
      fg: "white",
      //   bump: ["attack"],
      on: {},
      frequency: 10,
      speed: [100],
      damage: [0],
      range: 0,
      defense: 0,
      slot: null,
      tags: [],
      flags: 0,
      effects: {},
    },
    cfg
  ) as ItemKind;

  if (kind.name.length == 0) {
    kind.name = GWU.text.title_case(kind.id.toLowerCase().replace("_", " "));
  }

  // add damage as necessary
  while (kind.speed.length > kind.damage.length) {
    kind.damage.push(kind.damage[0]);
  }
  kind.damage.length = kind.speed.length; // truncate any extra damage

  if (typeof cfg.tags == "string") {
    kind.tags = cfg.tags.split(/[|,]/).map((v) => v.trim());
  }

  if (typeof cfg.flags !== "number") {
    kind.flags = GWU.flag.from_safe(ARMOR_FLAGS, cfg.flags);
  }

  //   if (typeof cfg.bump === "string") {
  //     kind.bump = cfg.bump.split(/[,]/g).map((t) => t.trim());
  //   }

  kind.frequency = GWU.frequency.make(kind.frequency);

  if (kind.slot === null) {
    if (kind.range > 0) {
      kind.slot = "ranged";
    } else if (kind.damage.length > 0 && kind.damage[0] > 0) {
      kind.slot = "melee";
    } else if (kind.defense > 0) {
      kind.slot = "armor";
    }
  }

  kinds[cfg.id.toLowerCase()] = kind;
}

export function getKind(id: string): ItemKind | null {
  return kinds[id.toLowerCase()] || null;
}
