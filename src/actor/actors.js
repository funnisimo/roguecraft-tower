import * as ACTOR from "./actor.js";

ACTOR.install({
  id: "Player",
  ch: "@",
  fg: "white",
  bg: -1,
  moveSpeed: 100,
  health: 100,
  damage: 10,
});

ACTOR.install({
  id: "Zombie",
  ch: "z",
  fg: "green",
  moveSpeed: 200,
  health: 5,
  damage: 2,
});

/*
PLAYER - health = 100
SWORD - 10-16 (10,10,16 thrust)
BOW - 10-25

ZOMBIE - 8 damage, 6 health
SKELETON - 3 damage, 6 health
RAVEGER - 9 damage, 11 health

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
