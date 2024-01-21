import { Actor } from "../actor";
import { Game } from "../game";
import * as ITEM from "../item";

export interface DamageConfig {
  amount: number;
  // TODO - type?  source?  is_environmental?
}

// @returns boolean - indicates whether or not the target dies
export function damage(
  game: Game,
  target: Actor,
  damage: DamageConfig
): boolean {
  // TODO - apply defenses... event? "damage" << allows changing b/c it is the DamageConfig obj
  const effects = target.armor_flags;

  damage.amount = damage.amount || 0;

  if (effects & ITEM.MELEE_FLAGS.NEGATE_HITS_30) {
    if (game.rng.chance(30)) {
      game.messages.addCombat("Blocked.");
      damage.amount = 0;
      return false;
    }
  }
  if (effects & ITEM.MELEE_FLAGS.REDUCE_DAMAGE_35) {
    damage.amount = Math.round(damage.amount * 0.65);
  }

  if (damage.amount <= 0) {
    return false;
  }

  target.health -= damage.amount || 0;

  target.trigger("damage", damage);

  if (target.health <= 0) {
    // do all of these move to event handlers?
    game.messages.addCombat(`${target.name} dies`);
    game.level!.setTile(target.x, target.y, "CORPSE"); // TODO - This should be above the floor (FIXTURE)
    target.trigger("death");
    game.level!.removeActor(target);
    return true;
  }

  return false;
}
