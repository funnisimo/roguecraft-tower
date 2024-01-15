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
  speed: 60,
  damage: 5, // dps = 5 * 100 / 60 = 8.3
  tags: "melee",
});

// FANGS_OF_FROST
// MOON_DAGGERS
// SHEER_DAGGERS

// VOID_BLADES
// BEGINNING_AND_END

// KNIFE
// TEMPEST_KNIFE
// CHILL_KNIFE
// RESOLUTE_KNIFE

ITEM.install({
  id: "SWORD",
  ch: "/",
  fg: "yellow",
  speed: 100,
  damage: 10, // dps = 10 * 100 / 100 = 10
  tags: "melee",
});

// DIAMOND_SWORD
// HAWKBRAND
// SINISTER_SWORD

ITEM.install({
  id: "CUTLASS",
  ch: "/",
  fg: "yellow",
  speed: [100, 100, 150],
  damage: [9, 9, 18], // dps = 9/9/12 [net=10]
  tags: "melee",
});

// AXE
// HIGHLAND_AXE
// FIREBRAND_AXE

// DOUBLE_AXE
// CURSED_AXE
// WHIRLWIND

// BACKSTABBER
// SWIFT_STRIKER

// BATTLESTAFF
// BATTLESTAFF_OF_TERROR
// GROWING_STAFF

// BONE_CLUB
// BONE_CUDGEL

// CLAYMORE
// BROADSWORD
// GREAT_AXEBLADE
// HEARTSTEALER
// OBSIDIAN_CLAYMORE
// STARLESS_NIGHT
// FROST_SLAYER

// CORAL_BLADE
// SPONGE_STRIKER

// DANCERS_SWORD
// NAMELESS_BLADE

// GLAIVE
// GRAVE_BANE
// VENOM_GLAIVE

// GREAT_HAMMER
// HAMMER_OF_GRAVITY
// STORMLANDER

// MACE
// FLAIL
// SUNS_GRACE

// PICKAXE
// DIAMOND_PICKAXE

// SICKLES
// NIGHTMARES_BITE
// LAST_LAUGH

// SOUL_KNIFE
// ETERNAL_KNIFE
// TRUTHSEEKER

// WHIP
// VINE_WHIP

// GAUNTLETS
// FIGHTERS_BINDINGS
// MAULERS
// SOUL_FISTS

// SCYTHE
// SOUL_SCYTHE
// FROST_SCYTHE
// JAILORS_SCYTHE

// KATANA
// DARK_KATANA
// MASTERS_KATANA

// SPEAR
// FORTUNE_SPEAR
// WHISPERING_SPEAR

// RAPIER
// BEE_STINGER
// FREEZING_FOIL

//////////////////////////////////////////////////////
// RANGED
//////////////////////////////////////////////////////

ITEM.install({
  id: "SHORTBOW",
  ch: "}",
  fg: "yellow",
  speed: 60,
  damage: 5, // dps = 5 * 100 / 60 = 8.3
  range: 10, // TODO - shrink to ?6?
  tags: "ranged",
});

ITEM.install({
  id: "BOW",
  ch: "}",
  fg: "yellow",
  speed: 100,
  damage: 10, // dps = 10
  range: 10,
  tags: "ranged",
});

ITEM.install({
  id: "LONGBOW",
  ch: "}",
  fg: "yellow",
  speed: 150,
  damage: 24, // dps = 24 * 100 / 150 = 16
  range: 15,
  tags: "ranged",
});
