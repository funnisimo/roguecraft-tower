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

export function moveToward(game, actor, other) {
  const map = game.map;

  let dir = GWU.xy.dirFromTo(actor, other);
  const dirs = GWU.xy.dirSpread(dir);

  while (dirs.length) {
    dir = dirs.shift();

    const newX = actor.x + dir[0];
    const newY = actor.y + dir[1];

    if (!map.blocksMove(newX, newY) && !game.actorAt(newX, newY)) {
      game.scene.buffer.drawSprite(
        actor.x,
        actor.y,
        map.tileAt(actor.x, actor.y)
      );
      actor.x = newX;
      actor.y = newY;
      game.scene.buffer.drawSprite(actor.x, actor.y, actor.kind);
      game.endTurn(actor, actor.kind.moveSpeed);
      return true;
    }
  }

  game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 2));
  return false;
}

export function attack(game, actor, target = null) {
  if (!target) {
    const targets = game.actors.filter(
      (a) =>
        a !== actor && GWU.xy.distanceBetween(a.x, a.y, actor.x, actor.y) <= 1
    );

    if (targets.length == 0) {
      console.log("no targets.");
      FX.flash(game, actor.x, actor.y, "orange", 150).then(() => {
        game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
      });
      return;
    } else if (targets.length > 1) {
      game.scene.app.scenes
        .run("target", { game, actor, targets })
        .on("stop", (result) => {
          if (!result) {
            console.log("Escape targeting.");
            FX.flash(game, actor.x, actor.y, "orange", 150).then(() => {
              game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
            });
          } else {
            attack(game, actor, result);
          }
        });
      return;
    } else {
      target = targets[0];
    }
  }

  // we have an actor and a target
  console.log(actor.kind.id, "attacks", target.kind.id);
  FX.flash(game, target.x, target.y, "red", 150).then(() => {
    game.endTurn(actor, actor.kind.moveSpeed);
  });
}
