import { Actor } from "./actor";
import { Game } from "./game";
import * as ITEM from "./item";

//////////////////////////////////////////////////////
// MELEE
//////////////////////////////////////////////////////

ITEM.install({
  id: "DAGGERS",
  ch: "/",
  fg: "yellow",
  speed: 50,
  damage: 5,
  combo: 6,
  combo_speed: 80,
  combo_damage: 8,
  tags: "melee",
});

// FANGS_OF_FROST
// MOON_DAGGERS
// SHEER_DAGGERS

// VOID_BLADES
// BEGINNING_AND_END

ITEM.install({
  id: "KNIFE",
  ch: "/",
  fg: "yellow",
  speed: 70,
  damage: 7,
  combo: 5,
  combo_speed: 70,
  combo_damage: 7,
  tags: "melee",
});

// TEMPEST_KNIFE
// CHILL_KNIFE
// RESOLUTE_KNIFE

ITEM.install({
  id: "SWORD",
  ch: "/",
  fg: "yellow",
  speed: 100,
  damage: 10, // dps = 10 * 100 / 100 = 10
  combo: 3,
  combo_speed: 100,
  combo_damage: 10,
  tags: "melee",
});

// DIAMOND_SWORD
// HAWKBRAND
// SINISTER_SWORD

ITEM.install({
  id: "CUTLASS",
  ch: "/",
  fg: "yellow",
  speed: 110,
  damage: 11,
  combo: 3,
  combo_speed: 130,
  combo_damage: 13,
  tags: "melee",
});

// CORAL_BLADE
// SPONGE_STRIKER

ITEM.install({
  id: "AXE",
  ch: "/",
  fg: "yellow",
  speed: 90,
  damage: 9,
  combo: 3,
  combo_speed: 120,
  combo_damage: 12,
  tags: "melee",
});

// HIGHLAND_AXE
// FIREBRAND_AXE

ITEM.install({
  id: "DOUBLE_AXE",
  ch: "/",
  fg: "yellow",
  speed: 120,
  damage: 12,
  combo: 3,
  combo_speed: 150,
  combo_damage: 15,
  tags: "melee",
});
// CURSED_AXE
// WHIRLWIND

ITEM.install({
  id: "BACKSTABBER",
  ch: "/",
  fg: "yellow",
  speed: 90,
  damage: 10,
  combo: 3,
  combo_speed: 120,
  combo_damage: 10,
  tags: "melee",
});

// SWIFT_STRIKER

ITEM.install({
  id: "BATTLESTAFF",
  ch: "/",
  fg: "yellow",
  speed: 70,
  damage: 7,
  combo: 4,
  combo_speed: 120,
  combo_damage: 12,
  tags: "melee",
});
// BATTLESTAFF_OF_TERROR
// GROWING_STAFF

ITEM.install({
  id: "BONE_CLUB",
  ch: "/",
  fg: "yellow",
  speed: 150,
  damage: 15,
  combo: 2,
  combo_speed: 200,
  combo_damage: 20,
  tags: "melee",
});
// BONE_CUDGEL

ITEM.install({
  id: "CLAYMORE",
  ch: "/",
  fg: "yellow",
  speed: 120,
  damage: 12,
  combo: 3,
  combo_speed: 180,
  combo_damage: 18,
  tags: "melee",
});
// BROADSWORD
// GREAT_AXEBLADE
// HEARTSTEALER
// OBSIDIAN_CLAYMORE
// STARLESS_NIGHT
// FROST_SLAYER

// DANCERS_SWORD
// NAMELESS_BLADE

ITEM.install({
  id: "GLAIVE",
  ch: "/",
  fg: "yellow",
  speed: 120,
  damage: 12,
  combo: 3,
  combo_speed: 150,
  combo_damage: 15,
  tags: "melee",
});

// GRAVE_BANE
// VENOM_GLAIVE

ITEM.install({
  id: "GREAT_HAMMER",
  ch: "/",
  fg: "yellow",
  speed: 180,
  damage: 18,
  combo: 2,
  combo_speed: 200,
  combo_damage: 20,
  tags: "melee",
});

// HAMMER_OF_GRAVITY
// STORMLANDER

ITEM.install({
  id: "MACE",
  ch: "/",
  fg: "yellow",
  speed: 110,
  damage: 11,
  combo: 3,
  combo_speed: 120,
  combo_damage: 12,
  tags: "melee",
});
// FLAIL
// SUNS_GRACE

ITEM.install({
  id: "PICKAXE",
  ch: "/",
  fg: "yellow",
  speed: 120,
  damage: 12,
  combo: 3,
  combo_speed: 120,
  combo_damage: 12,
  tags: "melee",
});
// DIAMOND_PICKAXE

ITEM.install({
  id: "SICKLES",
  ch: "/",
  fg: "yellow",
  speed: 80,
  damage: 8,
  combo: 4,
  combo_speed: 120,
  combo_damage: 12,
  tags: "melee",
});
// NIGHTMARES_BITE
// LAST_LAUGH

// SOUL_KNIFE
// ETERNAL_KNIFE
// TRUTHSEEKER

ITEM.install({
  id: "WHIP",
  ch: "/",
  fg: "yellow",
  speed: 120,
  damage: 12,
  combo: 3,
  combo_speed: 120,
  combo_damage: 12,
  tags: "melee",
});
// VINE_WHIP

ITEM.install({
  id: "GAUNTLETS",
  ch: "/",
  fg: "yellow",
  speed: 50,
  damage: 5,
  combo: 7,
  combo_speed: 60,
  combo_damage: 6,
  tags: "melee",
});
// FIGHTERS_BINDINGS
// MAULERS
// SOUL_FISTS

ITEM.install({
  id: "SCYTHE",
  ch: "/",
  fg: "yellow",
  speed: 180,
  damage: 18,
  combo: 2,
  combo_speed: 180,
  combo_damage: 18,
  tags: "melee",
});

// SOUL_SCYTHE
// FROST_SCYTHE
// JAILORS_SCYTHE

ITEM.install({
  id: "KATANA",
  ch: "/",
  fg: "yellow",
  speed: 90,
  damage: 9,
  combo: 4,
  combo_speed: 110,
  combo_damage: 11,
  tags: "melee",
});
// DARK_KATANA
// MASTERS_KATANA

ITEM.install({
  id: "SPEAR",
  ch: "/",
  fg: "yellow",
  speed: 120,
  damage: 12,
  combo: 3,
  combo_speed: 140,
  combo_damage: 14,
  tags: "melee",
});
// FORTUNE_SPEAR
// WHISPERING_SPEAR

ITEM.install({
  id: "RAPIER",
  ch: "/",
  fg: "yellow",
  speed: 30,
  damage: 3,
  combo: 10,
  combo_speed: 60,
  combo_damage: 6,
  tags: "melee",
});
// BEE_STINGER
// FREEZING_FOIL
