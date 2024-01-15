import { Actor } from "./actor";
import { Game } from "./game";
import * as ITEM from "./item";

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
