export function moveDir(actor, map, dir) {
  const newX = actor.x + dir[0];
  const newY = actor.y + dir[1];

  if (map.blocksMove(newX, newY)) {
    // TODO - Flash bump
    return;
  }

  actor.x = newX;
  actor.y = newY;
}
