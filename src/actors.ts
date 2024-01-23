import * as ACTOR from "./actor";
import * as ACTIONS from "./action";

ACTOR.install({
  id: "HERO",
  name: "Hero",
  ch: "@",
  fg: "white",
  bg: -1,
  moveSpeed: 100,
  health: 20,
  ammo: 20,

  // damage: 10,
  // attackSpeed: 100,

  // rangedDamage: 3,
  // range: 10,
  // rangedAttackSpeed: 100,

  slots: {
    ranged: "SHORTBOW",
    melee: "CUTLASS",
    armor: "PLATE_ARMOR",
  },
});

ACTOR.install({
  id: "ZOMBIE",
  name: "Zombie",
  ch: "z",
  fg: "green",
  moveSpeed: 200,
  health: 6,
  damage: 8, // dps=4
  dropChance: 100,
});

ACTOR.install({
  id: "ARMOR_ZOMBIE",
  ch: "Z",
  fg: "green",
  moveSpeed: 200,
  health: 25,
  damage: 10, // dps=5
  dropChance: 10,
});

ACTOR.install({
  id: "ARMOR_ZOMBIE_2",
  ch: "Z",
  fg: "green",
  moveSpeed: 200,
  health: 50,
  damage: 12, // dps=6
  dropChance: 10,
});

ACTOR.install({
  id: "Vindicator",
  ch: "v",
  fg: "blue",
  moveSpeed: 100,
  health: 11,
  damage: 9,
  // chargeSpeed: 75
  // chargeDistance: 6
  // attackSpeed: 150
  dropChance: 10,
});

ACTOR.install({
  id: "SKELETON",
  ch: "s",
  fg: "white",
  moveSpeed: 125,
  health: 6,
  damage: 0,
  rangedDamage: 3,
  range: 8,
  tooClose: 4,
  rangedAttackSpeed: 200,
  // notice: 10
  dropChance: 100,
});

ACTOR.install({
  id: "ARMOR_SKELETON",
  ch: "S",
  fg: "white",
  moveSpeed: 125,
  health: 25,
  damage: 0,
  rangedDamage: 4,
  range: 9,
  tooClose: 4,
  rangedAttackSpeed: 200,
  // notice: 10
  dropChance: 10,
});

ACTOR.install({
  id: "ARMOR_SKELETON_2",
  ch: "S",
  fg: "white",
  moveSpeed: 125,
  health: 50,
  damage: 0,
  rangedDamage: 5,
  range: 10,
  tooClose: 4,
  rangedAttackSpeed: 200,
  // notice: 10
  dropChance: 10,
});

/*
PLAYER - health = 100
SWORD - 10-16 (10,10,16 thrust)
BOW - 10-25

ZOMBIE - 8 damage, 6 health
SKELETON - 3 damage, 6 health
VINDICATOR - 9 damage, 11 health

SQUID COAST
- Follow the path
- Defeat 1 zombie
- Defeat a few zombies (3-5)
- Pickup arrows
- shoot skeleton
- follow path
- defeat skeleton and raveger
- ambush - defeat 3 ravegers
- pickup some gear (fireworks arrow, enchantment point)
- pull lever to open gate
- shoot skeleton to drop bridge
- kill a few more things (skeleton, rageger)
- roll across gap to get chest
- follow path to ending altar

CREEPER WOODS
- drops - food
- fishing rod
- fireworks arrow
- speed potion
- tnt
- sheep, cows, etc..
- free villagers
- strength potion
- shadow brew

SPIDER - 5 hp, 3 damage 
  << fires webs
  << ONLY attack if caught in web

ARMORED SKELETON BOW - 25 hp, 4 damage
ARMORED SKELETON POWER BOW - 50 hp, 4 damage

ARMORED ZOMBIE DAGGER - 25 hp, 10 damage
ARMORED ZOMBIE SWORD - 50 hp, 12 damage

CREEPER - <10 hp, 36 damage

VINDICATOR - 11 hp, ? damage
ARMORED VINDICATOR AXE - 
ARMORED VINDICATOR DOUBLE AXE - 

ENCHANTER - <10 hp

HAWKBRAND (5) = 13-21, CRITICAL HIT CHANCE


NOTES
- SUMMONER - 4 damage, 100 HP

*/
