import * as FX from "../fx/index.js";

export function moveDir(game, actor, dir) {
  const map = game.map;
  const newX = actor.x + dir[0];
  const newY = actor.y + dir[1];

  if (map.blocksMove(newX, newY)) {
    FX.flash(game, newX, newY, "red", 150).then(() => {
      game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 2));
    });
    return;
  }

  game.scene.buffer.drawSprite(actor.x, actor.y, map.tileAt(actor.x, actor.y));
  actor.x = newX;
  actor.y = newY;
  game.scene.buffer.drawSprite(actor.x, actor.y, actor.kind);
  game.endTurn(actor, actor.kind.moveSpeed);
}
