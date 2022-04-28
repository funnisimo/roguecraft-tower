import * as GWU from "gw-utils";
import * as GWD from "gw-dig";
import * as FX from "../fx/index";
import { Game } from "./game";
import { Actor } from "../actor/actor";
import * as EFFECT from "../effect";

export type ActionFn = (game: Game, actor: Actor, ...args: any[]) => boolean;
const actionsByName: Record<string, ActionFn> = {};

export function installBump(name: string, fn: ActionFn) {
  actionsByName[name] = fn;
}

export function getBump(name: string): ActionFn | null {
  return actionsByName[name] || null;
}

export function idle(game: Game, actor: Actor): boolean {
  console.log("- idle", actor.kind.id, actor.x, actor.y);
  game.endTurn(actor, Math.round(actor.kind.moveSpeed / 2));
  return true;
}

installBump("idle", idle);

export function moveRandom(game: Game, actor: Actor, quiet = false): boolean {
  const dir = game.rng.item(GWU.xy.DIRS);
  return moveDir(game, actor, dir, quiet);
}

export function moveDir(
  game: Game,
  actor: Actor,
  dir: GWU.xy.Loc,
  quiet = false
): boolean {
  const level = game.level!;
  const newX = actor.x + dir[0];
  const newY = actor.y + dir[1];

  if (
    level.diagonalBlocked(actor.x, actor.y, actor.x + dir[0], actor.y + dir[1])
  ) {
    if (!quiet) {
      const tile = level.getTile(actor.x + dir[0], actor.y + dir[1]);
      game.addMessage(`Blocked by a ${tile.id}.`);
      FX.flash(game, newX, newY, "red", 150);
      idle(game, actor);
      return true;
    } else {
      console.log("- diagonal blocked!!!", actor.kind.id, actor.x, actor.y);
      return false;
    }
  }

  const other = level.actorAt(newX, newY);
  if (other) {
    if (other.kind && other.bump(game, actor)) {
      return true;
    }
    if (actor.hasActed()) return true;

    if (!quiet) {
      game.addMessage(`You bump into a ${other.kind.id}.`);
      FX.flash(game, newX, newY, "red", 150);
      idle(game, actor);
      return true;
    } else {
      console.log("- nothing!!!", actor.kind.id, actor.x, actor.y);
      return false;
    }
  }

  if (level.blocksMove(newX, newY)) {
    if (!quiet) {
      game.addMessage("You bump into a wall.");
      FX.flash(game, newX, newY, "red", 150);
      idle(game, actor);
      return false;
    } else {
      console.log("- nothing blocked!!!", actor.kind.id, actor.x, actor.y);
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

export function moveTowardPlayer(
  game: Game,
  actor: Actor,
  quiet = false
): boolean {
  const map = game.level!;
  const player = game.player;

  const dir = player.mapToMe.nextDir(actor.x, actor.y, (x, y) => {
    return map.hasActor(x, y);
  });
  if (dir) {
    if (moveDir(game, actor, dir, true)) {
      return true; // success
    }
    if (!quiet) {
      FX.flash(game, actor.x, actor.y, "orange", 150);
    }
    return idle(game, actor);
  }
  return false;
}

export function moveAwayFromPlayer(
  game: Game,
  actor: Actor,
  quiet = false
): boolean {
  const map = game.level!;
  const player = game.player;

  // compute safety map
  const safety = new GWU.path.DijkstraMap(map.width, map.height);
  safety.copy(player.mapToMe);
  safety.update((v, x, y) => {
    if (v >= GWU.path.BLOCKED) return v;
    v = -1.2 * v;
    if (map.isInLoop(x, y)) v -= 2;
    if (map.isGateSite(x, y)) v -= 2;
    return Math.round(v);
  });

  safety.setDistance(player.x, player.y, GWU.path.BLOCKED);
  safety.rescan((x, y) => actor.moveCost(x, y));
  safety.addObstacle(player.x, player.y, (x, y) => player.moveCost(x, y), 5);

  let dir = safety.nextDir(actor.x, actor.y, (x, y) => {
    return map.hasActor(x, y);
  });

  console.log(
    `- move away (${actor.x},${actor.y}) from player (${player.x},${player.y}) - ${dir}`
  );

  // if (dir === null) {
  //   dir = safety.nextDir(actor.x, actor.y, (x, y) => {
  //     return map.hasActor(x, y);
  //   });
  // }

  if (dir) {
    const spread = GWU.xy.dirSpread(dir);
    for (let d of spread) {
      console.log(
        "- try",
        d,
        safety.getDistance(actor.x, actor.y),
        safety.getDistance(actor.x + d[0], actor.y + d[1])
      );
      if (moveDir(game, actor, d, true)) {
        console.log("- success");
        return true; // success
      }
    }

    if (!quiet) {
      FX.flash(game, actor.x, actor.y, "orange", 150);
    }
    return idle(game, actor);
  }
  return false;
}

export function attack(
  game: Game,
  actor: Actor,
  target: Actor | null = null
): boolean {
  const level = game.level!;

  if (target) {
    if (level.diagonalBlocked(actor.x, actor.y, target.x, target.y)) {
      return false;
    }
  } else {
    // todo - long reach melee -- spear, etc...

    const targets = game.level!.actors.filter(
      (a) =>
        a !== actor &&
        actor.health > 0 &&
        GWU.xy.distanceBetween(a.x, a.y, actor.x, actor.y) < 2 && // can attack diagonal
        !level.diagonalBlocked(actor.x, actor.y, a.x, a.y)
    );

    if (targets.length == 0) {
      game.addMessage("no targets.");
      FX.flash(game, actor.x, actor.y, "orange", 150);
      game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
      return true; // did something
    } else if (targets.length > 1) {
      game
        .scene!.app.scenes.run("target", { game, actor, targets })
        .once("stop", (result: Actor | null) => {
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
  // Does this move to an event handler?  'damage', { amount: #, type: string }
  game.messages.addCombat(
    `${actor.kind.id} attacks ${target.kind.id}#{red [${actor.damage}]}`
  );

  FX.flash(game, target.x, target.y, "red", 150);
  EFFECT.damage(game, target, { amount: actor.damage });
  game.endTurn(actor, actor.kind.attackSpeed);

  return true;
}

installBump("attack", attack);

export function fire(
  game: Game,
  actor: Actor,
  target: Actor | null = null
): boolean {
  const level = game.level!;
  const player = game.player;

  if (!actor.kind.range) {
    game.addMessage("Nothing to fire.");
    return false;
  }

  if (target) {
    if (GWU.xy.distanceFromTo(actor, target) > actor.kind.range) return false;
  } else {
    // todo - long reach melee -- spear, etc...

    const targets = game
      .level!.actors.filter(
        (a) =>
          a !== actor &&
          actor.health > 0 &&
          GWU.xy.distanceBetween(a.x, a.y, actor.x, actor.y) <=
            actor.kind.range &&
          player.isInFov(actor) && // hack for actor.canSee(a)
          player.isInFov(a)
      )
      .sort(
        (a, b) =>
          GWU.xy.distanceFromTo(player, a) - GWU.xy.distanceFromTo(player, b)
      );

    if (targets.length == 0) {
      game.addMessage("no targets.");
      FX.flash(game, actor.x, actor.y, "orange", 150);
      game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
      return true; // did something
    } else if (targets.length > 1) {
      game
        .scene!.app.scenes.run("target", { game, actor, targets })
        .once("stop", (result: Actor | null) => {
          if (!result) {
            FX.flash(game, actor.x, actor.y, "orange", 150);
            game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
          } else {
            fire(game, actor, result);
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
  // Does this move to an event handler?  'damage', { amount: #, type: string }

  FX.projectile(game, actor, target, { ch: "|-\\/", fg: "white" }, 300).then(
    (xy, ok) => {
      if (!ok) {
        FX.flash(game, xy.x, xy.y, "orange", 150);
      } else {
        FX.flash(game, xy.x, xy.y, "red", 150);
        EFFECT.damage(game, target!, { amount: actor.kind.rangedDamage });

        game.messages.addCombat(
          `${actor.kind.id} shoots ${target!.kind.id}#{red [${
            actor.kind.rangedDamage
          }]}`
        );
      }
    }
  );

  game.endTurn(actor, actor.kind.rangedAttackSpeed);
  return true;
}

installBump("fire", fire);

export function fireAtPlayer(game: Game, actor: Actor): boolean {
  const player = game.player;

  // if player can't see actor then actor can't see player!
  if (!player.isInFov(actor.x, actor.y)) return false;

  FX.projectile(
    game,
    actor,
    game.player,
    { ch: "|-\\/", fg: "white" },
    300
  ).then((xy, ok) => {
    if (!ok) {
      FX.flash(game, xy.x, xy.y, "orange", 150);
    } else {
      FX.flash(game, xy.x, xy.y, "red", 150);
      EFFECT.damage(game, player, { amount: actor.kind.rangedDamage });

      game.messages.addCombat(
        `${actor.kind.id} shoots ${player.kind.id}#{red [${actor.kind.rangedDamage}]}`
      );
    }
  });

  game.endTurn(actor, actor.kind.rangedAttackSpeed);
  return true;
}

export function climb(game: Game, actor: Actor): boolean {
  const tile = game.level!.getTile(actor.x, actor.y);
  if (tile.on && tile.on.climb) {
    tile.on.climb.call(tile, game, actor);
    return actor.hasActed();
  } else {
    return idle(game, actor);
  }
}

export function pickup(game: Game, actor: Actor): boolean {
  const level = game.level;
  if (level) {
    const item = level.itemAt(actor.x, actor.y);
    if (item) {
      item.trigger("pickup", game, actor);
      return true;
    }
    game.addMessage("Nothing to pickup.");
  }
  return idle(game, actor);
}
