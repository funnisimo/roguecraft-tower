import { valueType } from "gw-utils";

function combineValues(a: any, b: any): any {
  if (a == undefined) {
    return b;
  }
  if (b == undefined) {
    return a;
  }

  const ta = valueType(a);
  const tb = valueType(b);

  if (ta == "array" && tb == "array") {
    if (a.length >= b.length) {
      // @ts-ignore
      return a.map((v, i) => combineValues(v, b[i]));
    } else {
      // @ts-ignore
      return b.map((v, i) => combineValues(a[i], v));
    }
  }
  if (ta != "array" && tb != "array") {
    if (ta != tb) {
      return b; // second one
    }
    if (ta == "number") {
      return Math.max(a, b);
    } else {
      return b;
    }
  }
  if (ta == "array") {
    let out = a.slice();
    out[0] = combineValues(a[0], b);
    return out;
  } else {
    let out = b.slice();
    out[0] = combineValues(a, b[0]);
    return out;
  }
}

export class EffectConfig {
  artifact_cooldown?: number; // [] Artifact Cooldown - { artifact_cooldown: % }
  pushback_resistance?: number; // [] Pushback resistance - { pushback_resistance: % }
  extra_roll?: number; // [] Extra Roll - { extra_roll: # }
  environmental_damage_resistance?: number; // environmental_damage_resistance[] Environmental Damage resistance - { environmental_damage_resistance: % }
  freeze_resistance?: number; // [] Freezing Resistance - { freeze_resistance: % }
  spawn_emeralds?: number; // [] Spawn Emeralds when exploring - { spawn_emeralds: {chance per exposed cell} }
  melee_speed?: number; // [] +30% Melee attack speed - { melee_speed: % }
  emeralds_cheat_death?: number; // [] Spend emeralds to cheat death { emeralds_cheat_death: {# emeralds} }
  emerald_invulnerability?: number; // [] Invulnerability on emerald collection - { emerald_invulnerability: {time units} }
  potion_heals_allies?: number; // [] Health potions heal nearby allies - { potion_heals_allies: {distance} }
  positive_effect_duration?: number; // [] +30% positive effect duration - { positive_effect_duration: % }
  negative_effect_duration?: number; // [] -30% negative effect duration - { negative_effect_duration: % }
  move_speed_aura?: number; // [] +15% move speed aura - { move_speed_aura: % }
  burns_nearby?: number | [number, number]; // [] burns nearby enemies - { burns_nearby: {damage, range} }
  increased_souls?: number; // [] increase maximum souls - { increased_souls: {# or %} }
  soul_gathering?: number; // soul_gathering[] +1 soul gathering - { soul_gathering: # }
  // [] +50% souls gathered - { soul_gathering: % }
  life_steal?: number; // [] 6% life steal - { life_steal: % }
  damage_reduction?: number; // [] 35% damage reduction - { damage_reduction: % }
  arrows?: number; // [] +10 arrows per bundle - { arrows: # }
  ranged_damage?: number; // [] +30% ranged damage - { ranged_damage: % }
  melee_damage?: number; // [] +30% melee damage - { melee_damage: % }
  weapon_damage_aura?: number; // [] +20% weapon damage boost aura [How is this different?] - { weapon_damage_aura: % }
  roll_speed?: number; // roll_speed[] 50% faster roll - { roll_speed: % }
  invulnerable_while_rolling?: boolean; // [] invulnerable while rolling - { invulnerable_while_rolling: TF }
  reset_artifacts_on_potion?: boolean; // reset_artifacts_on_potion[] reset artifact cooldown on potion use { reset_artifacts_on_potion: TF }
  artifact_damage?: number; // [] +50% artifact damage { artifact_damage: % }
  potion_drop?: number | [number, string]; // [] can get {consumable} on potion use - { potion_drop: {%, tag} }
  // [] create food on potion use - { potion_drop: {100%, "food"} }
  negate_hits?: number; // [] 30% chance to negate hits - { negate_hits: % }
  roll_cooldown?: number; // [] +100% longer roll cooldown - { roll_cooldown: % }
  potion_boosts_defense?: number | [number, number]; // [] Potion use boosts defense (iron hide) - { potion_boosts_defense: {%, duration} }
  speed_after_dodge?: number | [number, number]; // [] Gain speed after dodge - { speed_after_dodge: {%, duration} }
  deflect?: number; // [] Deflect enemy projectiles - { deflect: % }
  swarm_protection?: number | [number, number]; // [] Take less damage when swarmed - { swarm_protection: {%, # enemies}}
  mobs_target_you?: number; // [] Mobs target you more - { mobs_target: % }
  shulker_projectiles?: [number, number, number]; // [] Fire {shulker} projectiles at nearby enemies (??? what is a shulker ???) - { shulker_projectiles: {damage, frequency, range} }
  chilling?: [number, number, number, number]; // [] Emit chilling aura - { chilling: {frequency, range, %, duration} }
  // [/] Pet bat - { pet_bat: ??? } // NOT DOING
  traps?: [number, number]; // [] Trap and poison nearby mobs when rolling { traps: {range, duration}, poision: {damage, duration}}
  poision_trapped?: [number, number]; // HOW TO KNOW IT HAPPENS TO TRAPPED ONLY?
  roll_teleport?: number; // [] Roll to teleport - { roll_teleport: {distance}}
  roll_explosion?: [number, number]; // [] Trigger explosion on roll start - { roll_explostion: {damage, range} }
  healing_boost?: number; // [] +25% healing boost - { healing_boost: % }
  boost_speed_when_hit?: number | [number, number]; // [] Boost speed after hit - { boost_speed_after_hit: {%, duration} }
  snowball?: [number, number, number]; // [] Snowball - { snowball: {frequency, chill %, duration} }
  // Game allows 2 active snowballs?  Just use frequency for this?
  potion_cooldown?: number; // [] 40% faster potion cooldown - { potion_cooldown: % }
  roll_fire?: [number, number]; // [] spawn fire on roll { roll_fire: {duration, damage, [[OR IS IT A TILE]] } }
  summon_bee?: [number, number]; // [] 30% summon bee when hit - { summon_bee: {%, max} }
}

export class EffectsData {
  artifact_cooldown: number; // [] Artifact Cooldown - { artifact_cooldown: % }
  pushback_resistance: number; // [] Pushback resistance - { pushback_resistance: % }
  extra_roll: number; // [] Extra Roll - { extra_roll: # }
  environmental_damage_resistance: number; // environmental_damage_resistance[] Environmental Damage resistance - { environmental_damage_resistance: % }
  freeze_resistance: number; // [] Freezing Resistance - { freeze_resistance: % }
  spawn_emeralds: number; // [] Spawn Emeralds when exploring - { spawn_emeralds: {chance per exposed cell} }
  melee_speed: number; // [] +30% Melee attack speed - { melee_speed: % }
  emeralds_cheat_death: number; // [] Spend emeralds to cheat death { emeralds_cheat_death: {# emeralds} }
  emerald_invulnerability: number; // [] Invulnerability on emerald collection - { emerald_invulnerability: {time units} }
  potion_heals_allies: number; // [] Health potions heal nearby allies - { potion_heals_allies: {distance} }
  positive_effect_duration: number; // [] +30% positive effect duration - { positive_effect_duration: % }
  negative_effect_duration: number; // [] -30% negative effect duration - { negative_effect_duration: % }
  move_speed_aura: number; // [] +15% move speed aura - { move_speed_aura: % }
  burns_nearby: [number, number]; // [] burns nearby enemies - { burns_nearby: {damage, range} }
  increased_souls: number; // [] increase maximum souls - { increased_souls: {# or %} }
  soul_gathering: number; // soul_gathering[] +1 soul gathering - { soul_gathering: # }
  // [] +50% souls gathered - { soul_gathering: % }
  life_steal: number; // [] 6% life steal - { life_steal: % }
  damage_reduction: number; // [] 35% damage reduction - { damage_reduction: % }
  arrows: number; // [] +10 arrows per bundle - { arrows: # }
  ranged_damage: number; // [] +30% ranged damage - { ranged_damage: % }
  melee_damage: number; // [] +30% melee damage - { melee_damage: % }
  weapon_damage_aura: number; // [] +20% weapon damage boost aura [How is this different?] - { weapon_damage_aura: % }
  roll_speed: number; // roll_speed[] 50% faster roll - { roll_speed: % }
  invulnerable_while_rolling: boolean; // [] invulnerable while rolling - { invulnerable_while_rolling: TF }
  reset_artifacts_on_potion: boolean; // reset_artifacts_on_potion[] reset artifact cooldown on potion use { reset_artifacts_on_potion: TF }
  artifact_damage: number; // [] +50% artifact damage { artifact_damage: % }
  potion_drop: [number, string]; // [] can get {consumable} on potion use - { potion_drop: {%, tag} }
  // [] create food on potion use - { potion_drop: {100%, "food"} }
  negate_hits: number; // [] 30% chance to negate hits - { negate_hits: % }
  roll_cooldown: number; // [] +100% longer roll cooldown - { roll_cooldown: % }
  potion_boosts_defense: [number, number]; // [] Potion use boosts defense (iron hide) - { potion_boosts_defense: {%, duration} }
  speed_after_dodge: [number, number]; // [] Gain speed after dodge - { speed_after_dodge: {%, duration} }
  deflect: number; // [] Deflect enemy projectiles - { deflect: % }
  swarm_protection: [number, number]; // [] Take less damage when swarmed - { swarm_protection: {%, # enemies}}
  mobs_target_you: number; // [] Mobs target you more - { mobs_target: % }
  shulker_projectiles: [number, number, number]; // [] Fire {shulker} projectiles at nearby enemies (??? what is a shulker ???) - { shulker_projectiles: {damage, frequency, range} }
  chilling: [number, number, number, number]; // [] Emit chilling aura - { chilling: {frequency, range, %, duration} }
  // [/] Pet bat - { pet_bat: ??? } // NOT DOING
  traps: [number, number]; // [] Trap and poison nearby mobs when rolling { traps: {range, duration}, poision: {damage, duration}}
  poision_trapped: [number, number]; // HOW TO KNOW IT HAPPENS TO TRAPPED ONLY?
  roll_teleport: number; // [] Roll to teleport - { roll_teleport: {distance}}
  roll_explosion: [number, number]; // [] Trigger explosion on roll start - { roll_explostion: {damage, range} }
  healing_boost: number; // [] +25% healing boost - { healing_boost: % }
  boost_speed_when_hit: [number, number]; // [] Boost speed after hit - { boost_speed_after_hit: {%, duration} }
  snowball: [number, number, number]; // [] Snowball - { snowball: {frequency, chill %, duration} }
  // Game allows 2 active snowballs?  Just use frequency for this?
  potion_cooldown: number; // [] 40% faster potion cooldown - { potion_cooldown: % }
  roll_fire: [number, number]; // [] spawn fire on roll { roll_fire: {duration, damage, [[OR IS IT A TILE]] } }
  summon_bee: [number, number]; // [] 30% summon bee when hit - { summon_bee: {%, max} }

  constructor(cfg?: EffectConfig) {
    // TODO - second+ values in defaults need real values
    this.artifact_cooldown = 0;
    this.pushback_resistance = 0;
    this.extra_roll = 0;
    this.environmental_damage_resistance = 0;
    this.freeze_resistance = 0;
    this.spawn_emeralds = 0;
    this.melee_speed = 0;
    this.emeralds_cheat_death = 0;
    this.emerald_invulnerability = 0;
    this.potion_heals_allies = 0;
    this.positive_effect_duration = 0;
    this.negative_effect_duration = 0;
    this.move_speed_aura = 0;
    this.burns_nearby = [0, 0];
    this.increased_souls = 0;
    this.soul_gathering = 0;
    this.life_steal = 0;
    this.damage_reduction = 0;
    this.arrows = 0;
    this.ranged_damage = 0;
    this.melee_damage = 0;
    this.weapon_damage_aura = 0;
    this.roll_speed = 0;
    this.invulnerable_while_rolling = true;
    this.reset_artifacts_on_potion = false;
    this.artifact_damage = 0;
    this.potion_drop = [0, "drop"];
    this.negate_hits = 0;
    this.roll_cooldown = 0;
    this.potion_boosts_defense = [0, 0];
    this.speed_after_dodge = [0, 0];
    this.deflect = 0;
    this.swarm_protection = [0, 0];
    this.mobs_target_you = 0;
    this.shulker_projectiles = [0, 0, 0];
    this.chilling = [0, 0, 0, 0];
    this.traps = [0, 0];
    this.poision_trapped = [0, 0];
    this.roll_teleport = 0;
    this.roll_explosion = [0, 0];
    this.healing_boost = 0;
    this.boost_speed_when_hit = [0, 0];
    this.snowball = [0, 0, 0];
    // Game allows 2 active snowballs?  Just use frequency for this?
    this.potion_cooldown = 0;
    this.roll_fire = [0, 0];
    this.summon_bee = [0, 0];

    if (cfg) {
      this.combine(cfg);
    }
  }

  combine(other: EffectsData | EffectConfig) {
    // TODO - second+ values in defaults need real values
    this.artifact_cooldown = combineValues(
      this.artifact_cooldown,
      other.artifact_cooldown
    );
    this.pushback_resistance = combineValues(
      this.pushback_resistance,
      other.pushback_resistance
    );
    this.extra_roll = combineValues(this.extra_roll, other.extra_roll);
    this.environmental_damage_resistance = combineValues(
      this.environmental_damage_resistance,
      other.environmental_damage_resistance
    );
    this.freeze_resistance = combineValues(
      this.freeze_resistance,
      other.freeze_resistance
    );
    this.spawn_emeralds = combineValues(
      this.spawn_emeralds,
      other.spawn_emeralds
    );
    this.melee_speed = combineValues(this.melee_speed, other.melee_speed);
    this.emeralds_cheat_death = combineValues(
      this.emeralds_cheat_death,
      other.emeralds_cheat_death
    );
    this.emerald_invulnerability = combineValues(
      this.emerald_invulnerability,
      other.emerald_invulnerability
    );
    this.potion_heals_allies = combineValues(
      this.potion_heals_allies,
      other.potion_heals_allies
    );
    this.positive_effect_duration = combineValues(
      this.positive_effect_duration,
      other.positive_effect_duration
    );
    this.negative_effect_duration = combineValues(
      this.negative_effect_duration,
      other.negative_effect_duration
    );
    this.move_speed_aura = combineValues(
      this.move_speed_aura,
      other.move_speed_aura
    );
    this.burns_nearby = combineValues(this.burns_nearby, other.burns_nearby);
    this.increased_souls = combineValues(
      this.increased_souls,
      other.increased_souls
    );
    this.soul_gathering = combineValues(
      this.soul_gathering,
      other.soul_gathering
    );
    this.life_steal = combineValues(this.life_steal, other.life_steal);
    this.damage_reduction = combineValues(
      this.damage_reduction,
      other.damage_reduction
    );
    this.arrows = combineValues(this.arrows, other.arrows);
    this.ranged_damage = combineValues(this.ranged_damage, other.ranged_damage);
    this.melee_damage = combineValues(this.melee_damage, other.melee_damage);
    this.weapon_damage_aura = combineValues(
      this.weapon_damage_aura,
      other.weapon_damage_aura
    );
    this.roll_speed = combineValues(this.roll_speed, other.roll_speed);
    this.invulnerable_while_rolling = combineValues(
      this.invulnerable_while_rolling,
      other.invulnerable_while_rolling
    );
    this.reset_artifacts_on_potion = combineValues(
      this.reset_artifacts_on_potion,
      other.reset_artifacts_on_potion
    );
    this.artifact_damage = combineValues(
      this.artifact_damage,
      other.artifact_damage
    );
    this.potion_drop = combineValues(this.potion_drop, other.potion_drop);
    this.negate_hits = combineValues(this.negate_hits, other.negate_hits);
    this.roll_cooldown = combineValues(this.roll_cooldown, other.roll_cooldown);
    this.potion_boosts_defense = combineValues(
      this.potion_boosts_defense,
      other.potion_boosts_defense
    );
    this.speed_after_dodge = combineValues(
      this.speed_after_dodge,
      other.speed_after_dodge
    );
    this.deflect = combineValues(this.deflect, other.deflect);
    this.swarm_protection = combineValues(
      this.swarm_protection,
      other.swarm_protection
    );
    this.mobs_target_you = combineValues(
      this.mobs_target_you,
      other.mobs_target_you
    );
    this.shulker_projectiles = combineValues(
      this.shulker_projectiles,
      other.shulker_projectiles
    );
    this.chilling = combineValues(this.chilling, other.chilling);
    this.traps = combineValues(this.traps, other.traps);
    this.poision_trapped = combineValues(
      this.poision_trapped,
      other.poision_trapped
    );
    this.roll_teleport = combineValues(this.roll_teleport, other.roll_teleport);
    this.roll_explosion = combineValues(
      this.roll_explosion,
      other.roll_explosion
    );
    this.healing_boost = combineValues(this.healing_boost, other.healing_boost);
    this.boost_speed_when_hit = combineValues(
      this.boost_speed_when_hit,
      other.boost_speed_when_hit
    );
    this.snowball = combineValues(this.snowball, other.snowball);
    // Game allows 2 active snowballs?  Just use frequency for this?
    this.potion_cooldown = combineValues(
      this.potion_cooldown,
      other.potion_cooldown
    );
    this.roll_fire = combineValues(this.roll_fire, other.roll_fire);
    this.summon_bee = combineValues(this.summon_bee, other.summon_bee);
  }
}
