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
