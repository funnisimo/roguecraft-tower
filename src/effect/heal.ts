import { Actor } from "../actor";
import { Game } from "../game";

export interface HealConfig {
  amount: number;
  // TODO - type?  source?  is_environmental?
}

export function heal(game: Game, target: Actor, heal: HealConfig) {
  if (heal.amount <= 0) return;

  heal.amount = Math.min(heal.amount, target.health_max - target.health);
  target.health += heal.amount;
}
