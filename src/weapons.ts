import { Actor } from "./actor";
import { Game } from "./game";
import * as ITEM from "./item";

ITEM.install({
  id: "DAGGER",
  ch: "/",
  fg: "yellow",
  speed: 60,
  damage: 5, // dps = 5 * 100 / 60 = 8.3
});

ITEM.install({
  id: "SWORD",
  ch: "/",
  fg: "yellow",
  speed: 100,
  damage: 10, // dps = 10 * 100 / 100 = 10
});

ITEM.install({
  id: "CUTLASS",
  ch: "/",
  fg: "yellow",
  speed: [100, 100, 150],
  damage: [9, 9, 18], // dps = 9/9/12 [net=10]
});
