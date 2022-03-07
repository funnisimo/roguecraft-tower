import * as FX from "../fx/index.js";

export const kinds = {
  player: {
    id: "Player",
    ch: "@",
    fg: "white",
    bg: -1,
    moveSpeed: 100,
  },

  zombie: {
    id: "Zombie",
    ch: "z",
    fg: "green",
    moveSpeed: 100,
  },
};

export function make(id) {
  const kind = kinds[id];
  if (!kind) throw new Error("Failed to find actor kind - " + id);

  return { x: 1, y: 1, kind };
}

export function spawn(game, id, x, y) {
  const newbie = make(id);

  FX.flash(game, x, y, newbie.kind.fg, 500).then(() => {
    game.actors.push(newbie);
    game.scheduler.push(newbie, newbie.kind.moveSpeed || 100);
    newbie.x = x;
    newbie.y = y;
  });
}
