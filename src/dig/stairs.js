import "../../lib/gw-utils.js";
import * as MAP from "../map/index.js";

export function stairs(cfg, map) {
  if (!map) return stairs.bind(this, cfg);

  const build = new Stairs(cfg);
  const locs = build.dig(map);
  if (!locs) return false;
  map.locations = locs;
  return true;
}

export class Stairs {
  constructor(options = {}) {
    this.options = {
      up: true,
      down: true,
      minDistance: 10,
      start: false,
      upTile: "UP_STAIRS",
      downTile: "DOWN_STAIRS",
      wall: "WALL",
    };
    GWU.object.assignObject(this.options, options);
  }

  dig(map) {
    let needUp = this.options.up !== false;
    let needDown = this.options.down !== false;
    const minDistance =
      this.options.minDistance ||
      Math.floor(Math.max(map.width, map.height) / 2);

    const locations = {};
    let upLoc = null;
    let downLoc = null;

    const isValidLoc = this.isStairXY.bind(this, map);
    if (this.options.start && typeof this.options.start !== "string") {
      let start = this.options.start;
      if (start === true) {
        start = map.rng.matchingLoc(map.width, map.height, isValidLoc);
      } else {
        start = map.rng.matchingLocNear(
          GWU.xy.x(start),
          GWU.xy.y(start),
          isValidLoc
        );
      }
      locations.start = start;
    }

    if (Array.isArray(this.options.up) && Array.isArray(this.options.down)) {
      const up = this.options.up;
      upLoc = map.rng.matchingLocNear(GWU.xy.x(up), GWU.xy.y(up), isValidLoc);
      const down = this.options.down;
      downLoc = map.rng.matchingLocNear(
        GWU.xy.x(down),
        GWU.xy.y(down),
        isValidLoc
      );
    } else if (
      Array.isArray(this.options.up) &&
      !Array.isArray(this.options.down)
    ) {
      const up = this.options.up;
      upLoc = map.rng.matchingLocNear(GWU.xy.x(up), GWU.xy.y(up), isValidLoc);
      if (needDown) {
        downLoc = map.rng.matchingLoc(map.width, map.height, (x, y) => {
          if (
            // @ts-ignore
            GWU.xy.distanceBetween(x, y, upLoc[0], upLoc[1]) < minDistance
          )
            return false;
          return isValidLoc(x, y);
        });
      }
    } else if (
      Array.isArray(this.options.down) &&
      !Array.isArray(this.options.up)
    ) {
      const down = this.options.down;
      downLoc = map.rng.matchingLocNear(
        GWU.xy.x(down),
        GWU.xy.y(down),
        isValidLoc
      );
      if (needUp) {
        upLoc = map.rng.matchingLoc(map.width, map.height, (x, y) => {
          if (
            GWU.xy.distanceBetween(x, y, downLoc[0], downLoc[1]) < minDistance
          )
            return false;
          return isValidLoc(x, y);
        });
      }
    } else if (needUp) {
      upLoc = map.rng.matchingLoc(map.width, map.height, isValidLoc);
      if (needDown) {
        downLoc = map.rng.matchingLoc(map.width, map.height, (x, y) => {
          if (
            // @ts-ignore
            GWU.xy.distanceBetween(x, y, upLoc[0], upLoc[1]) < minDistance
          )
            return false;
          return isValidLoc(x, y);
        });
      }
    } else if (needDown) {
      downLoc = map.rng.matchingLoc(map.width, map.height, isValidLoc);
    }
    if (upLoc) {
      locations.up = upLoc.slice();
      this.setupStairs(
        map,
        upLoc[0],
        upLoc[1],
        this.options.upTile,
        this.options.wall
      );
      if (this.options.start === "up") {
        locations.start = locations.up;
      } else {
        locations.end = locations.up;
      }
    }
    if (downLoc) {
      locations.down = downLoc.slice();
      this.setupStairs(
        map,
        downLoc[0],
        downLoc[1],
        this.options.downTile,
        this.options.wall
      );
      if (this.options.start === "down") {
        locations.start = locations.down;
      } else {
        locations.end = locations.down;
      }
    }
    return upLoc || downLoc ? locations : null;
  }

  hasXY(site, x, y) {
    if (x < 0 || y < 0) return false;
    if (x >= site.width || y >= site.height) return false;
    return true;
  }

  isStairXY(site, x, y) {
    let count = 0;
    if (!this.hasXY(site, x, y) || !site.isDiggable(x, y)) return false;
    for (let i = 0; i < 4; ++i) {
      const dir = GWU.xy.DIRS[i];
      if (!this.hasXY(site, x + dir[0], y + dir[1])) return false;
      if (!this.hasXY(site, x - dir[0], y - dir[1])) return false;
      if (site.isFloor(x + dir[0], y + dir[1])) {
        count += 1;
        if (!site.isDiggable(x - dir[0] + dir[1], y - dir[1] + dir[0]))
          return false;
        if (!site.isDiggable(x - dir[0] - dir[1], y - dir[1] - dir[0]))
          return false;
      } else if (!site.isDiggable(x + dir[0], y + dir[1])) {
        return false;
      }
    }
    return count == 1;
  }

  setupStairs(site, x, y, tile, wallTile) {
    const indexes = site.rng.sequence(4);
    let dir = null;
    for (let i = 0; i < indexes.length; ++i) {
      dir = GWU.xy.DIRS[i];
      const x0 = x + dir[0];
      const y0 = y + dir[1];
      if (site.isFloor(x0, y0)) {
        if (site.isDiggable(x - dir[0], y - dir[1])) break;
      }
      dir = null;
    }
    if (!dir) GWU.ERROR("No stair direction found!");
    site.setTile(x, y, tile);
    const dirIndex = GWU.xy.CLOCK_DIRS.findIndex(
      // @ts-ignore
      (d) => d[0] == dir[0] && d[1] == dir[1]
    );
    for (let i = 0; i < GWU.xy.CLOCK_DIRS.length; ++i) {
      const l = i ? i - 1 : 7;
      const r = (i + 1) % 8;
      if (i == dirIndex || l == dirIndex || r == dirIndex) continue;
      const d = GWU.xy.CLOCK_DIRS[i];
      site.setTile(x + d[0], y + d[1], wallTile);
      // map.setCellFlags(x + d[0], y + d[1], Flags.Cell.IMPREGNABLE);
    }
    // dungeon.debug('setup stairs', x, y, tile);
    return true;
  }
}
