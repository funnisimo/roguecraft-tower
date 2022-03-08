export const tiles = [];
export const ids = {};

export function install(cfg) {
  cfg.index = tiles.length;
  tiles.push(cfg);
  ids[cfg.id] = cfg.index;
}

install({ id: "FLOOR", ch: "\u00b7", fg: 0x666, bg: 0x222 });
install({ id: "WALL", ch: "#", fg: 0x333, bg: 0x666, blocksMove: true });
install({
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
});
install({
  id: "DOWN_STAIRS",
  ch: "<",
  fg: "gray",
});
install({
  id: "UP_STAIRS",
  ch: ">",
  fg: "orange",
  on: {
    enter(game, actor) {
      game.addMessage("Going up!");
    },
  },
});
install({
  id: "INACTIVE_STAIRS",
  ch: ">",
  fg: "gray",
});
