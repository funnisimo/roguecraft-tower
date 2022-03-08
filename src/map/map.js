import "../../lib/gw-utils.js";
import * as TILE from "./tiles.js";

export class Map {
  constructor(width, height, seed) {
    this.rng = GWU.rng.make(seed);
    this.cells = GWU.grid.make(width, height);
  }

  get width() {
    return this.cells.width;
  }
  get height() {
    return this.cells.height;
  }

  fill(tile) {
    if (typeof tile === "string") {
      tile = TILE.ids[tile];
    }
    this.cells.fill(tile);
  }

  setTile(x, y, tile) {
    if (typeof tile === "string") {
      tile = TILE.ids[tile];
    }
    this.cells.set(x, y, tile);
  }

  blocksMove(x, y) {
    const tile = this.getTile(x, y);
    return tile.blocksMove || false;
  }

  hasTile(x, y, id) {
    if (typeof id === "string") {
      id = TILE.ids[id];
    }
    return this.cells.get(x, y) === id;
  }

  getTile(x, y) {
    const ix = this.cells.get(x, y) || 0;
    return TILE.tiles[ix];
  }
}

export function from(cfg) {
  const data = cfg.data || cfg.cells;
  const h = data.length;
  const w = data[0].length;

  const m = new Map(w, h);

  data.forEach((line, y) => {
    for (let x = 0; x < w; ++x) {
      const ch = line[x] || "#";
      const id = TILE.ids[cfg.tiles[ch] || "WALL"];
      m.setTile(x, y, id);
    }
  });

  return m;
}
