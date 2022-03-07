import "../../lib/gw-utils.js";
import * as TILE from "./tiles.js";

export class Map {
  constructor(width, height) {
    this.cells = GWU.grid.make(width, height);
  }

  get width() {
    return this.cells.width;
  }
  get height() {
    return this.cells.height;
  }

  _setTile(x, y, tile) {
    this.cells.set(x, y, tile);
  }

  blocksMove(x, y) {
    const tile = this.getTile(x, y);
    return tile.blocksMove || false;
  }

  hasTile(x, y, id) {
    return this.cells.get(x, y) === id;
  }

  getTile(x, y) {
    const ix = this.cells.get(x, y) || 0;
    return TILE.tiles[ix];
  }
}
