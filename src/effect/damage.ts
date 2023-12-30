import { Actor } from "../actor";
import { Game } from "../game";
import * as ITEM from "../item";

export interface DamageConfig {
  amount: number;
}

// @returns boolean - indicates whether or not the target dies
export function damage(
  game: Game,
  target: Actor,
  damage: DamageConfig
): boolean {
  target.health -= damage.amount || 0;

  if (target.health <= 0) {
    // do all of these move to event handlers?
    game.messages.addCombat(`${target.kind.id} dies`);
    game.level!.setTile(target.x, target.y, "CORPSE");
    target.trigger("death");
    game.level!.removeActor(target);
    return true;
  }

  return false;
}
