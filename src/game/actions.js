import * as FX from "../fx/index.js";

export function idle(game, actor) {
  game.endTurn(actor, Math.round(actor.kind.moveSpeed / 2));
}

export function moveDir(game, actor, dir, quiet = false) {
  const level = game.level;
  const newX = actor.x + dir[0];
  const newY = actor.y + dir[1];

  const other = level.actorAt(newX, newY);
  if (other) {
    if (other.kind && other.kind.on && other.kind.on.bump) {
      if (other.kind.on.bump(game, actor, other)) {
        return true;
      }
    }
    if (actor.hasActed()) return true;

    if (!quiet) {
      game.addMessage(`You bump into a ${other.id}.`);
      FX.flash(game, newX, newY, "red", 150);
      idle(game, actor);

      return true;
    } else {
      return false;
    }
  }

  if (level.blocksMove(newX, newY)) {
    if (!quiet) {
      game.addMessage("You bump into a wall.");
      FX.flash(game, newX, newY, "red", 150);
      idle(game, actor);
      return;
    } else {
      return false;
    }
  }

  const oldX = actor.x;
  const oldY = actor.y;
  actor.x = newX;
  actor.y = newY;
  // game.drawAt(oldX, oldY);
  // game.drawAt(newX, newY);

  const speed = Math.round(
    actor.kind.moveSpeed * (GWU.xy.isDiagonal(dir) ? 1.4 : 1.0)
  );

  actor.trigger("move", game, newX, newY);
  level.triggerAction("enter", actor);

  game.endTurn(actor, speed);
  return true;
}

export function moveToward(game, actor, other, quiet = false) {
  const map = game.level;

  let dir = GWU.xy.dirFromTo(actor, other);
  const dirs = GWU.xy.dirSpread(dir);

  while (dirs.length) {
    dir = dirs.shift();

    if (moveDir(game, actor, dir, true)) {
      return; // success
    }
  }

  if (!quiet) {
    FX.flash(game, actor.x, actor.y, "orange", 150);
  }
  idle(game, actor);
}

export function attack(game, actor, target = null) {
  if (!target) {
    const targets = game.level.actors.filter(
      (a) =>
        a !== actor &&
        actor.health > 0 &&
        GWU.xy.distanceBetween(a.x, a.y, actor.x, actor.y) <= 1
    );

    if (targets.length == 0) {
      game.addMessage("no targets.");
      FX.flash(game, actor.x, actor.y, "orange", 150);
      game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
      return true; // did something
    } else if (targets.length > 1) {
      game.scene.app.scenes
        .run("target", { game, actor, targets })
        .on("stop", (result) => {
          if (!result) {
            FX.flash(game, actor.x, actor.y, "orange", 150);
            game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
          } else {
            attack(game, actor, result);
          }
        });
      return true; // didSomething
    } else {
      target = targets[0];
    }
  }

  const actorIsPlayer = actor === game.player;
  const otherIsPlayer = target === game.player;

  if (!actorIsPlayer && !otherIsPlayer) {
    return idle(game, actor); // no attacking
  }

  // we have an actor and a target
  game.messages.addCombat(
    `${actor.kind.id} attacks ${target.kind.id}#{red [${actor.damage}]}`
  );
  target.health -= actor.damage;

  FX.flash(game, target.x, target.y, "red", 150);
  game.endTurn(actor, actor.kind.moveSpeed);

  if (target.health < 0) {
    game.messages.addCombat(`${target.kind.id} dies`);
    game.level.setTile(target.x, target.y, "CORPSE");
    game.level.removeActor(target);
  }
  return true;
}

export function climb(game, actor) {
  const tile = game.level.getTile(actor.x, actor.y);
  if (tile.on && tile.on.climb) {
    if (tile.on.climb(game, actor)) {
      return;
    }
  }

  idle(game, actor);
}
