import * as GWU from "gw-utils";
import { Actor } from "../actor";
import { Game } from "../game";
import { Item } from "./item";
import { CallbackFn } from "../game/obj";

export interface ItemEvents {
  // bump?: (game: Game, actor: Item, other: Item) => void;
  use?: (this: Item, game: Game, actor: Actor) => boolean;
  pickup?: (this: Item, game: Game, actor: Actor) => boolean;
  [key: string]: CallbackFn | undefined;
}

export interface KindConfig {
  id: string;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  //   bump?: string | string[];

  on?: ItemEvents;
}

export interface ItemKind {
  id: string;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  //   bump: string[];

  on: ItemEvents;

  //   damage: number;
  //   attackSpeed: number;

  //   range: number;
  //   rangedDamage: number;
  //   tooClose: number;
  //   rangedAttackSpeed: number;
}

export const kinds: Record<string, ItemKind> = {};

export function install(cfg: KindConfig) {
  const kind = Object.assign(
    {
      ch: "!",
      fg: "white",
      //   bump: ["attack"],
      on: {},
    },
    cfg
  ) as ItemKind;

  //   if (typeof cfg.bump === "string") {
  //     kind.bump = cfg.bump.split(/[,]/g).map((t) => t.trim());
  //   }

  kinds[cfg.id.toLowerCase()] = kind;
}

export function getKind(id: string): ItemKind | null {
  return kinds[id.toLowerCase()] || null;
}
