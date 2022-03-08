import * as FX from "../fx/index.js";
import * as MAP from "../map/index.js";

export function idle(game, actor, dir) {
  game.endTurn(actor, Math.round(actor.kind.moveSpeed / 2));
}

export function moveDir(game, actor, dir) {
  const map = game.map;
  const newX = actor.x + dir[0];
  const newY = actor.y + dir[1];

  if (map.blocksMove(newX, newY)) {
    game.addMessage("You bump into a wall.");
    FX.flash(game, newX, newY, "red", 150).then(() => {
      game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 2));
    });
    return;
  }

  const oldX = actor.x;
  const oldY = actor.y;
  actor.x = newX;
  actor.y = newY;
  game.drawAt(oldX, oldY);
  game.drawAt(newX, newY);

  const speed = Math.round(
    actor.kind.moveSpeed * (GWU.xy.isDiagonal(dir) ? 1.4 : 1.0)
  );

  game.endTurn(actor, speed);
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
      const oldX = actor.x;
      const oldY = actor.y;
      actor.x = newX;
      actor.y = newY;
      game.drawAt(oldX, oldY);
      game.drawAt(newX, newY);
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
        a !== actor &&
        actor.health > 0 &&
        GWU.xy.distanceBetween(a.x, a.y, actor.x, actor.y) <= 1
    );

    if (targets.length == 0) {
      game.addMessage("no targets.");
      FX.flash(game, actor.x, actor.y, "orange", 150).then(() => {
        game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
      });
      return;
    } else if (targets.length > 1) {
      game.scene.app.scenes
        .run("target", { game, actor, targets })
        .on("stop", (result) => {
          if (!result) {
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
  game.messages.addCombat(
    `${actor.kind.id} attacks ${target.kind.id}#{red [${actor.damage}]}`
  );
  target.health -= actor.damage;

  FX.flash(game, target.x, target.y, "red", 150).then(() => {
    game.endTurn(actor, actor.kind.moveSpeed);
  });

  if (target.health < 0) {
    game.messages.addCombat(`${target.kind.id} dies`);
    game.setTile(target.x, target.y, MAP.ids.CORPSE);
    game.remove(target);
  }
}
