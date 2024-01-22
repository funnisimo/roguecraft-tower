import { Actor } from "../actor";
import * as FX from "../fx";
import { Game } from "../game";
import * as ITEM from "../item";

export interface DamageConfig {
  amount: number;
  msg: string;
  color: string;
  // TODO - type?  source?  is_environmental?
}

// @returns boolean - indicates whether or not the target dies
export function damage(
  game: Game,
  target: Actor,
  damage: Partial<DamageConfig>
): boolean {
  // TODO - apply defenses... event? "damage" << allows changing b/c it is the DamageConfig obj
  const armor_flags = target.armor_flags;

  let amount = (damage.amount = damage.amount || 0);
  damage.msg = damage.msg || `${target.name} is damaged`;
  damage.color = damage.color || "red";

  if (armor_flags & ITEM.ARMOR_FLAGS.NEGATE_HITS_30) {
    if (game.rng.chance(30)) {
      game.messages.addCombat(damage.msg + "#{orange [X]}");
      FX.flash(game, target.x, target.y, "orange", 150);
      damage.amount = 0;
      return false;
    }
  }
  if (armor_flags & ITEM.ARMOR_FLAGS.REDUCE_DAMAGE_35) {
    damage.amount = Math.round(damage.amount * 0.65);
  }

  target.trigger("damage", damage);

  if (damage.amount <= 0) {
    return false;
  }

  target.health -= damage.amount || 0;
  if (damage.amount <= amount) {
    damage.color = "orange";
  }
  game.messages.addCombat(damage.msg + `#{${damage.color} [${damage.amount}]}`);
  FX.flash(game, target.x, target.y, damage.color, 150);

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
