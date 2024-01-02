import { Actor } from "./actor";
import { Game } from "./game";
import * as ITEM from "./item";

ITEM.install({
  id: "SCALE_MAIL",
  name: "Scale Mail",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags: "REDUCE_DAMAGE_35 | MELEE_DAMAGE_30",
  tags: "armor",
});

ITEM.install({
  id: "MERCENARY_ARMOR",
  name: "Mercenary Armor",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags: "REDUCE_DAMAGE_35 | WEAPON_DAMAGE_AURA_20",
  tags: "armor",
});

ITEM.install({
  id: "GUARDS_ARMOR",
  name: "Guards Armor",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags: "ARTIFACT_COOLDOWN_40 | ARROWS_10",
  tags: "armor",
});

ITEM.install({
  id: "HUNTERS_ARMOR",
  name: "Hunters Armor",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags: "RANGED_DAMAGE_30 | ARROWS_10",
  tags: "armor",
});

ITEM.install({
  id: "ARCHERS_ARMOR",
  name: "Archers Armor",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags: "RANGED_DAMAGE_30 | ARROWS_10 | MOVESPEED_AURA_15",
  tags: "armor",
});

ITEM.install({
  id: "REINFORCED_MAIL",
  name: "Reinforced Mail",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags: "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100",
  tags: "armor",
});

ITEM.install({
  id: "STALWART_ARMOR",
  name: "Stalwart Armor",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags:
    "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100 | POTION_BOOSTS_DEFENSE",
  tags: "armor",
});

ITEM.install({
  id: "PLATE_ARMOR",
  name: "Plate Armor",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags: "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100",
  tags: "armor",
});

ITEM.install({
  id: "FULL_METAL_ARMOR",
  name: "Full Metal Armor",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags:
    "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100 | MELEE_DAMAGE_30",
  tags: "armor",
});

ITEM.install({
  id: "CHAMPIONS_ARMOR",
  name: "Champions Armor",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags: "REDUCE_DAMAGE_35 | POTION_COOLDOWN_40 | MOBS_TARGET_YOU_MORE",
  tags: "armor",
});

ITEM.install({
  id: "HEROS_ARMOR",
  name: "Heros Armor",
  ch: "]",
  fg: "yellow",
  defense: 3,
  flags:
    "REDUCE_DAMAGE_35 | POTION_COOLDOWN_40 | MOBS_TARGET_YOU_MORE | POTION_HEALS_NEARBY_ALLIES",
  tags: "armor",
});
