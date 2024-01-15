import * as GWU from "gw-utils";

const ARMOR_FLAGS = GWU.flag.make([
  "ARTIFACT_COOLDOWN_40",
  "ARROWS_10",
  "LONGER_ROLL_100",
  "MELEE_DAMAGE_30",
  "MOBS_TARGET_YOU_MORE", // add ?? MOBS_AVOID_YOU_MORE ??
  "MOVESPEED_AURA_15",
  "NEGATE_HITS_30",
  "POTION_COOLDOWN_40",
  "POTION_BOOSTS_DEFENSE",
  "POTION_HEALS_NEARBY_ALLIES",
  "RANGED_DAMAGE_30",
  "REDUCE_DAMAGE_35",
  "WEAPON_DAMAGE_AURA_20",
]);

// @ts-ignore
globalThis.ARMOR_FLAGS = ARMOR_FLAGS;

const MELEE_FLAGS = GWU.flag.make([
  "SPIN_ATTACK",
  "THRUST",
  "SWIRLING",
  "LONGER_REACH", // spear, glaive, etc...

  "SHOCKWAVE",
  "BURNS",
  "STUNS",
  "AMBUSH",
  "ECHO",
  "EXPLODING",
  "COMMITTED", // Increased damage to wounded mobs
  "PUSHBACK", // great pushback.  Are there levels of this?
  "SHARPNESS",
  "LEECHING",
  "RAMPAGING", // Increased attack speed when kill mob
  "WEAKENING",
  "FREEZING",
  "POISON_CLOUD",
  "POISONS",
  "SPLASH", // AOE
  "GRAVITY",
  "LIGHTNING_BOLTS", // Thundering
  "CHAINS", // Binds and chains enemies
  "RADIANCE", // Healing aura
  "SHARED_PAIN", // excess damage hits nearby mobs
  "PROSPECTOR", // Get more emeralds
  "CRITICAL_HIT", // increased chance
  "SPEED_RUSH", // Increased speed after mob killed
  "LOOTING", // increased drop rate
  "SPAWN_BEE", // chance to spawn bee
]);

// @ts-ignore
globalThis.MELEE_FLAGS = MELEE_FLAGS;

const RANGED_FLAGS = GWU.flag.make([
  // "GROWING", // Not going to use
  "EXTRA_SHOT", // Fires 2 shots
  "INFINITE_SHOTS", // chance to regain shots after use
  "POWER", // Sharpness
  "SUPERCHARGED",
  "EXPLODING", // exploding shot
  "RADIANCE_SHOT",
  "ENRAGES", // enrages hit mobs
  "ACCELERATE", // subsequent shots are faster (until other action - including wait)
  "RAPID_FIRE", // just faster attack speed
  "FREEZES",
  "TRIPLE_SHOT", // fires 3 arrows when charged - all in same direction, but spaced - how to do this?
  "CHAINS_HITS", // hits multiple targets - like chain lightning
  "POISON_CLOUD",
  "POISONS",
  "ENRAGES",
  "ROLL_CHARGES",
  "GRAVITY_SHOT",
  "RICOCHET", // bounces off target in random direction
  "TEMPO_THEFT", // steals speed
  "PIERCING",
  "CHAIN_REACTION", // chance to fire many small shots on hit
  "KNOCKBACK",
]);

// @ts-ignore
globalThis.RANGED_FLAGS = RANGED_FLAGS;

export { ARMOR_FLAGS, MELEE_FLAGS, RANGED_FLAGS };
