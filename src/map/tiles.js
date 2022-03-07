export const tiles = [
  { id: "FLOOR", ch: "\u00b7", fg: 0x666, bg: 0x222 },
  { id: "WALL", ch: "#", fg: 0x333, bg: 0x666, blocksMove: true },
  {
    id: "CORPSE",
    ch: "&",
    fg: 0x666,
    bg: 0x222,
    on: {
      place(game, x, y) {
        // game.wait(1000, () => {
        //   if (game.map.hasTile(x, y, ids.CORPSE)) {
        //     game.setTile(x, y, ids.FLOOR);
        //   }
        // });
      },
      tick(game, x, y) {
        if (game.rng.chance(5)) {
          game.setTile(x, y, ids.FLOOR);
        }
      },
    },
  },
];

export const ids = tiles.reduce((out, t, i) => {
  out[t.id] = i;
  return out;
}, {});
