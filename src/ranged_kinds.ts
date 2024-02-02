import { Actor } from "./actor";
import { Game } from "./game";
import * as ITEM from "./item";

//////////////////////////////////////////////////////
// RANGED
//////////////////////////////////////////////////////

export const ranged_kinds: ITEM.ItemKindConfigSet = {
  BOW: {
    id: "BOW",
    ch: "}",
    fg: "yellow",
    speed: 100,
    damage: 10,
    range: 10,
    charge: 3,
    tags: "ranged, bow",
  },
  // BONE_BOW
  // TWIN_BOW

  HUNTING_BOW: {
    id: "HUNTING_BOW",
    ch: "}",
    fg: "yellow",
    speed: 90,
    damage: 9,
    range: 13,
    charge: 3,
    tags: "ranged, bow",
  },
  // ANCIENT_BOW
  // HUNTERS_PROMISE
  // MASTERS_BOW

  LONGBOW: {
    id: "LONGBOW",
    ch: "}",
    fg: "yellow",
    speed: 130,
    damage: 13,
    range: 15,
    charge: 4,
    tags: "ranged, bow",
  },
  // GUARDIAN_BOW
  // RED_SNAKE

  POWER_BOW: {
    id: "POWER_BOW",
    ch: "}",
    fg: "yellow",
    speed: 150,
    damage: 15,
    range: 20,
    charge: 5,
    tags: "ranged, bow",
  },
  // ELITE_POWER_BOW
  // SABREWING

  SHORTBOW: {
    id: "SHORTBOW",
    ch: "}",
    fg: "yellow",
    speed: 70,
    damage: 7,
    range: 8,
    charge: 2,
    tags: "ranged, bow",
  },
  // LOVE_SHORTBOW
  // MECHANICAL_SHORTBOW
  // PURPLE_STORM
  // SNOW_BOW
  // WINTERS_TOUCH

  TRICKBOW: {
    id: "TRICKBOW",
    ch: "}",
    fg: "yellow",
    speed: 80,
    damage: 8,
    range: 10,
    charge: 2,
    tags: "ranged, bow",
  },
  // GREEN_MENACE
  // PINK_SCOUNDREL

  CROSSBOW: {
    id: "CROSSBOW",
    ch: "}",
    fg: "yellow",
    speed: 120,
    damage: 12,
    range: 10,
    charge: 0,
    tags: "ranged, xbow",
  },
  // AZURE_SEEKER
  // SLICER
  // EXPLODING_CROSSBOW
  // FIREBOLT_THROWER
  // IMPLODING_CROSSBOW

  DUAL_CROSSBOWS: {
    id: "DUAL_CROSSBOWS",
    ch: "}",
    fg: "yellow",
    speed: 60,
    damage: 6,
    range: 8,
    charge: 0,
    tags: "ranged, xbow",
  },
  // BABY_CROSSBOWS
  // SPELLBOUND_CROSSBOWS

  HEAVY_CROSSBOW: {
    id: "HEAVY_CROSSBOW",
    ch: "}",
    fg: "yellow",
    speed: 200,
    damage: 20,
    range: 15,
    charge: 0,
    tags: "ranged, xbow",
  },
  // DOOM_CROSSBOW
  // SLAYER_CROSSBOW

  RAPID_CROSSBOW: {
    id: "RAPID_CROSSBOW",
    ch: "}",
    fg: "yellow",
    speed: 80,
    damage: 8,
    range: 10,
    charge: 0,
    tags: "ranged, xbow",
  },
  // AUTO_CROSSBOW
  // BUTTERFLY_CROSSBOW

  SCATTER_CROSSBOW: {
    id: "SCATTER_CROSSBOW",
    ch: "}",
    fg: "yellow",
    speed: 100,
    damage: 10,
    range: 10,
    charge: 0,
    tags: "ranged, xbow",
  },
  // HARP_CROSSBOW
  // LIGHTNING_HARP_CROSSBOW
};
