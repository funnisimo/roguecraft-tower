import "../../lib/gw-utils.js";
import "../../lib/gw-dig.js";
import * as TILE from "./tiles.js";

export class Map extends GWD.site.Site {
  constructor(width, height, seed) {
    super(width, height, seed);
    // this.rng = GWU.rng.make(seed);
    // this.cells = GWU.grid.make(width, height);
  }

  // get width() {
  //   return this.cells.width;
  // }
  // get height() {
  //   return this.cells.height;
  // }

  fill(tile) {
    if (typeof tile === "string") {
      tile = TILE.ids[tile];
    }
    this._tiles.fill(tile);
  }

  // setTile(x, y, tile) {
  //   if (typeof tile === "string") {
  //     tile = TILE.ids[tile];
  //   }
  //   this.cells.set(x, y, tile);
  // }

  // blocksMove(x, y) {
  //   const tile = this.getTile(x, y);
  //   return tile.blocksMove || false;
  // }

  // hasTile(x, y, id) {
  //   if (typeof id === "string") {
  //     id = TILE.ids[id];
  //   }
  //   return this.cells.get(x, y) === id;
  // }

  // getTile(x, y) {
  //   const ix = this.cells.get(x, y) || 0;
  //   return TILE.tiles[ix];
  // }

  drawAt(buf, x, y) {
    buf.blackOut(x, y);
    buf.drawSprite(x, y, this.getTile(x, y));
  }
}

export function from(cfg) {
  const data = cfg.data || cfg.cells;
  const tiles = cfg.tiles;

  const h = data.length;
  const w = data[0].length;

  const map = new Map(w, h);
  GWD.site.loadSite(map, data, tiles);

  return map;
}
