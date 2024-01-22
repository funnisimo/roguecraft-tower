import * as GWU from "gw-utils";

const fl = GWU.flag.fl;

export enum ARMOR_FLAGS {
  ARTIFACT_COOLDOWN_40 = fl(0),
  ARROWS_10 = fl(1),
  LONGER_ROLL_100 = fl(2),
  MELEE_DAMAGE_30 = fl(3),
  MOBS_TARGET_YOU_MORE = fl(4), // increases notice distance for all mobs?
  // add ?? MOBS_AVOID_YOU_MORE ??
  MOVESPEED_AURA_15 = fl(5),
  NEGATE_HITS_30 = fl(6),
  POTION_COOLDOWN_40 = fl(7),
  POTION_BOOSTS_DEFENSE = fl(8),
  POTION_HEALS_NEARBY_ALLIES = fl(9),
  RANGED_DAMAGE_30 = fl(10),
  REDUCE_DAMAGE_35 = fl(11),
  WEAPON_DAMAGE_AURA_20 = fl(12), // both melee and ranged
}

// @ts-ignore
globalThis.ARMOR_FLAGS = ARMOR_FLAGS;

export enum MELEE_FLAGS {
  SPIN_ATTACK = fl(0),
  THRUST = fl(1),
  SWIRLING = fl(2),
  LONGER_REACH = fl(3), // spear, glaive, etc...

  SHOCKWAVE = fl(4),
  BURNS = fl(5),
  STUNS = fl(6),
  AMBUSH = fl(7),
  ECHO = fl(8),
  EXPLODING = fl(9),
  COMMITTED = fl(10), // Increased damage to wounded mobs
  PUSHBACK = fl(11), // great pushback.  Are there levels of this?
  SHARPNESS = fl(12),
  LEECHING = fl(13),
  RAMPAGING = fl(14), // Increased attack speed when kill mob
  WEAKENING = fl(15),
  FREEZING = fl(16),
  POISON_CLOUD = fl(17),
  POISONS = fl(18),
  SPLASH = fl(19), // AOE
  GRAVITY = fl(20),
  LIGHTNING_BOLTS = fl(21), // Thundering
  CHAINS = fl(22), // Binds and chains enemies
  RADIANCE = fl(23), // Healing aura
  SHARED_PAIN = fl(24), // excess damage hits nearby mobs
  PROSPECTOR = fl(25), // Get more emeralds
  CRITICAL_HIT = fl(26), // increased chance
  SPEED_RUSH = fl(27), // Increased speed after mob killed
  LOOTING = fl(28), // increased drop rate
  SPAWN_BEE = fl(29), // chance to spawn bee
}

// @ts-ignore
globalThis.MELEE_FLAGS = MELEE_FLAGS;

export enum RANGED_FLAGS {
  // "GROWING", // Not going to use
  EXTRA_SHOT = fl(0), // Fires 2 shots
  INFINITE_SHOTS = fl(1), // chance to regain shots after use
  POWER = fl(2), // Sharpness
  SUPERCHARGED = fl(3),
  EXPLODING = fl(4), // exploding shot
  RADIANCE_SHOT = fl(5),
  ENRAGES = fl(6), // enrages hit mobs
  ACCELERATE = fl(7), // subsequent shots are faster (until other action - including wait)
  RAPID_FIRE = fl(8), // just faster attack speed
  FREEZES = fl(9),
  TRIPLE_SHOT = fl(10), // fires 3 arrows when charged - all in same direction = fl(0), but spaced - how to do this?
  CHAINS_HITS = fl(11), // hits multiple targets - like chain lightning
  POISON_CLOUD = fl(12),
  POISONS = fl(13),
  ROLL_CHARGES = fl(14),
  GRAVITY_SHOT = fl(15),
  RICOCHET = fl(16), // bounces off target in random direction
  TEMPO_THEFT = fl(17), // steals speed
  PIERCING = fl(18),
  CHAIN_REACTION = fl(19), // chance to fire many small shots on hit
  KNOCKBACK = fl(20),
}

// @ts-ignore
globalThis.RANGED_FLAGS = RANGED_FLAGS;
