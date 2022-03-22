import "../../lib/gw-dig.js";

export const tilesByIndex = [];
export const tilesByName = {};

export function install(cfg) {
  const info = GWD.site.installTile(cfg);
  tilesByIndex[info.index] = info;
  tilesByName[info.id] = info;
}

install({ id: "FLOOR", ch: "\u00b7", fg: 0x666, bg: 0x222 });
install({
  id: "WALL",
  ch: "#",
  fg: 0x333,
  bg: 0x666,
  blocksMove: true,
});
install({
  id: "CORPSE",
  ch: "&",
  fg: 0x666,
  bg: 0x222,
  priority: 15,
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
        game.level.setTile(x, y, "FLOOR");
      }
    },
  },
});
install({
  id: "DOWN_STAIRS",
  ch: "<",
  fg: "gray",
  on: {
    enter(game, actor) {
      game.addMessage("There is no turning back.");
    },
  },
});
install({
  id: "UP_STAIRS",
  ch: ">",
  fg: "orange",
  on: {
    enter(game, actor) {
      game.addMessage("Going up!");
      game.scene.trigger("win");
    },
  },
});
install({
  id: "INACTIVE_STAIRS",
  ch: ">",
  fg: "gray",
  priority: 75,
  on: {
    enter(game, actor) {
      game.addMessage("There is more to do.");
    },
  },
});

install({
  id: "IMPREGNABLE",
  ch: "#",
  fg: 0x222,
  bg: 0x444,
  priority: 200,
});

GWD.site.allTiles.forEach((t) => {
  if (tilesByName[t.id]) return;
  install(t);
});
