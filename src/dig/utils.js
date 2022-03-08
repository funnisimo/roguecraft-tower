export function isFloor(map, x, y) {
  return map.hasTile(x, y, "FLOOR");
}

export function isDiggable(map, x, y) {
  return map.hasTile(x, y, "FLOOR") || map.hasTile(x, y, "WALL");
}
