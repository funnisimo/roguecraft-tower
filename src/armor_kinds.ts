import * as ITEM from "./item";

export const armor_kinds: ITEM.ItemKindConfigSet = {
  SCALE_MAIL: {
    id: "SCALE_MAIL",
    name: "Scale Mail",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags: "REDUCE_DAMAGE_35 | MELEE_DAMAGE_30",
    tags: "armor",
    effects: {
      damage_reduction: 35,
      melee_damage: 30,
    },
  },

  MERCENARY_ARMOR: {
    id: "MERCENARY_ARMOR",
    name: "Mercenary Armor",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags: "REDUCE_DAMAGE_35 | WEAPON_DAMAGE_AURA_20",
    tags: "armor",
    effects: {
      damage_reduction: 35,
      weapon_damage_aura: 20,
    },
  },

  GUARDS_ARMOR: {
    id: "GUARDS_ARMOR",
    name: "Guards Armor",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags: "ARTIFACT_COOLDOWN_40 | ARROWS_10",
    tags: "armor",
    effects: {
      artifact_cooldown: 40,
      arrows: 10,
    },
  },

  HUNTERS_ARMOR: {
    id: "HUNTERS_ARMOR",
    name: "Hunters Armor",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags: "RANGED_DAMAGE_30 | ARROWS_10",
    tags: "armor",
    effects: {
      ranged_damage: 30,
      arrows: 10,
    },
  },

  ARCHERS_ARMOR: {
    id: "ARCHERS_ARMOR",
    name: "Archers Armor",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags: "RANGED_DAMAGE_30 | ARROWS_10 | MOVESPEED_AURA_15",
    tags: "armor",
    effects: {
      ranged_damage: 30,
      arrows: 10,
      move_speed_aura: 15,
    },
  },

  REINFORCED_MAIL: {
    id: "REINFORCED_MAIL",
    name: "Reinforced Mail",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags: "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100",
    tags: "armor",
    effects: {
      damage_reduction: 35,
      negate_hits: 30,
      roll_cooldown: 100,
    },
  },

  STALWART_ARMOR: {
    id: "STALWART_ARMOR",
    name: "Stalwart Armor",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags:
      "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100 | POTION_BOOSTS_DEFENSE",
    tags: "armor",
    effects: {
      damage_reduction: 35,
      negate_hits: 30,
      roll_cooldown: 100,
      potion_boosts_defense: [90, 5 * 200],
    },
  },

  PLATE_ARMOR: {
    id: "PLATE_ARMOR",
    name: "Plate Armor",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags: "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100",
    tags: "armor",
    effects: {
      damage_reduction: 35,
      negate_hits: 30,
      roll_cooldown: 100,
    },
  },

  FULL_METAL_ARMOR: {
    id: "FULL_METAL_ARMOR",
    name: "Full Metal Armor",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags:
      "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100 | MELEE_DAMAGE_30",
    tags: "armor",
    effects: {
      damage_reduction: 35,
      negate_hits: 30,
      roll_cooldown: 100,
      melee_damage: 30,
    },
  },

  CHAMPIONS_ARMOR: {
    id: "CHAMPIONS_ARMOR",
    name: "Champions Armor",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags: "REDUCE_DAMAGE_35 | POTION_COOLDOWN_40 | MOBS_TARGET_YOU_MORE",
    tags: "armor",
    effects: {
      damage_reduction: 35,
      potion_cooldown: 40,
      mobs_target_you: 50, // 50%?
    },
  },

  HEROS_ARMOR: {
    id: "HEROS_ARMOR",
    name: "Heros Armor",
    ch: "]",
    fg: "yellow",
    defense: 50,
    armor_flags:
      "REDUCE_DAMAGE_35 | POTION_COOLDOWN_40 | MOBS_TARGET_YOU_MORE | POTION_HEALS_NEARBY_ALLIES",
    tags: "armor",
    effects: {
      damage_reduction: 35,
      potion_cooldown: 40,
      mobs_target_you: 50, // 50%?
      potion_heals_allies: 3,
    },
  },
};
