import * as ENCHANT from "./enchant";
import { Item } from "./item";
import { Actor, Hero } from "./actor";
import * as PLUGIN from "./game/plugins";
import { Game } from "./game/game";
import { Level } from "./game/level";
import { DamageConfig } from "./effect/damage";
import * as GWU from "gw-utils";

// Plugin - Enchant related
// apply_actor_enchant, unapply_actor_enchant
// apply_item_enchant, unapply_item_enchant
// equip, unequip, drop, pickup
// make_item, destroy_item
// make_actor, destroy_actor (death?)

ENCHANT.install("artifact_cooldown", {
  apply(actor: Actor, level: number) {
    // TODO - this is read in the end_turn handler of the hero to adjust artifact cooldown recovery
    actor.data.artifact_cooldown = level;
  },
  unapply(actor: Actor) {
    actor.data.artifact_cooldown = 0;
  },
});

ENCHANT.install(
  "bonus_arrows" // {
  //   apply(actor: Actor, level: number) {
  //     // This is read by the pickup of the ARROWS item to determine how many arrows are gained.
  //     actor.data.bonus_arrows = level;
  //   },
  //   unapply(actor: Actor) {
  //     actor.data.bonus_arrows = 0;
  //   },
  // }
);

ENCHANT.install("roll_cooldown");

/*

    // PLUGIN - Roll
        - keypress - 'r'
            - initiate roll
        
        - start
            - add action - "roll"
            - add keypress - 'r'
            - add enchant - ROLL_COOLDOWN

        - spawn_actor
            - add roll cooldown data

    // ACTION - roll
        - figure this out...
*/

ENCHANT.install("melee_damage", {
  actor: {
    attack(this: Actor, target: Actor, damage: Partial<DamageConfig>) {
      if (damage.isRanged) {
        return;
      }
      const baseAmount = damage.amount || 0;
      const level = this.data.melee_damage || 0;
      damage.amount = Math.round((baseAmount * (100 + 10 * level)) / 100);
    },
  },
});

/*

  MOBS_TARGET_YOU_MORE = fl(4), // increases notice distance for all mobs?
    - apply
        - add "equip"
            - adjust notice bonus/penalty (global?)
        - add "unequip"
            - notice bonus/penalti auto-calculates
    - unapply
        - remove triggers

  // add ?? MOBS_AVOID_YOU_MORE ??
    - apply
        - add "equip"
            - adjust notice bonus/penalty (global?)
        - add "unequip"
            - notice bonus/penalti auto-calculates
    - unapply
        - remove triggers

*/

ENCHANT.install("negate_hits", {
  actor: {
    damage(this: Actor, source: Actor, damage: DamageConfig) {
      let chance =
        100 - Math.round(100 * Math.pow(0.9, this.data.negate_hits || 0));
      if (GWU.rng.random.chance(chance)) {
        damage.amount = 0;
        // TODO - Update msg or set flag for logging...
      }
    },
  },
});

// Handled by potion plugin
ENCHANT.install("potion_cooldown");

// Handled by potion plugin
ENCHANT.install("potion_boosts_defense");

// Handled by potion plugin
ENCHANT.install("potion_heals_nearby");

/*
  MOVESPEED_AURA_15 = fl(5),
    - apply
        - add "equip"
            - adjust movespeed
        - add "unequip"
            - movespeed auto-calculates
    - unapply
        - remove triggers

  RANGED_DAMAGE_30 = fl(10),
    - apply
        - add "attack"  << params tell us it is ranged
            - add 30% to ranged
    - unapply
        - remove "attack"

  REDUCE_DAMAGE_35 = fl(11),
    - apply
        - add "damage"
            - reduce 35%
    - unapply
        - remove "damage"

  WEAPON_DAMAGE_AURA_20 = fl(12), // both melee and ranged
    - apply
        - add "attack"
            - increase 20%
    - unapply
        - remove "attack"
*/
