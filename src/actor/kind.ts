import * as GWU from "gw-utils";
import { CallbackFn } from "../game/obj";

export interface ActorEvents {
  // bump?: (game: Game, actor: Actor, other: Actor) => void;
  [key: string]: CallbackFn | undefined;
}

export interface KindConfig {
  id: string;
  health?: number;

  notice?: number;
  moveSpeed?: number;

  damage?: number;
  attackSpeed?: number;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  bump?: string | string[];

  on?: ActorEvents;
}

export interface ActorKind {
  id: string;
  health: number;

  notice: number;
  moveSpeed: number;

  damage: number;
  attackSpeed: number;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  bump: string[];

  on: ActorEvents;
}

export const kinds: Record<string, ActorKind> = {};

export function install(cfg: KindConfig) {
  const kind = Object.assign(
    {
      health: 10,
      notice: 10,
      damage: 1,
      moveSpeed: 100,
      attackSpeed: 0,
      ch: "!",
      fg: "white",
      bump: ["attack"],
      on: {},
    },
    cfg
  ) as ActorKind;

  if (typeof cfg.bump === "string") {
    kind.bump = cfg.bump.split(/[,]/g).map((t) => t.trim());
  }
  kind.attackSpeed = kind.attackSpeed || kind.moveSpeed;

  kinds[cfg.id.toLowerCase()] = kind;
}

export function getKind(id: string): ActorKind | null {
  return kinds[id.toLowerCase()] || null;
}
