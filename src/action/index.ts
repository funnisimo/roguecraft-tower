import * as GWU from "gw-utils";
import * as GWD from "gw-dig";
import * as FX from "../fx/index";
import { Game } from "../game/game";
import { Actor } from "../actor/actor";
import * as EFFECT from "../effect";
import { Hero } from "../hero/hero";
import { Level } from "../level";

export type ActionFn = (level: Level, actor: Actor, ...args: any[]) => boolean;
const actionsByName: Record<string, ActionFn> = {};

export function install(name: string, fn: ActionFn) {
  actionsByName[name] = fn;
}

export function get(name: string): ActionFn | null {
  return actionsByName[name] || null;
}

export function idle(level: Level, actor: Actor): boolean {
  console.log("- idle", actor.name, actor.x, actor.y);
  level.game.endTurn(actor, Math.round(actor.kind.moveSpeed / 2));
  return true;
}

install("idle", idle);

export function moveRandom(level: Level, actor: Actor, quiet = false): boolean {
  const dir = level.rng.item(GWU.xy.DIRS);
  return moveDir(level, actor, dir, quiet);
}

install("move_random", moveRandom);

export function moveDir(
  level: Level,
  actor: Actor,
  dir: GWU.xy.Loc,
  quiet = false
): boolean {
  const game = level.game;
  const newX = actor.x + dir[0];
  const newY = actor.y + dir[1];

  if (
    level.diagonalBlocked(actor.x, actor.y, actor.x + dir[0], actor.y + dir[1])
  ) {
    if (!quiet) {
      const tile = level.getTile(actor.x + dir[0], actor.y + dir[1]);
      game.addMessage(`Blocked by a ${tile.id}.`);
      FX.flash(level, newX, newY, "orange", 150);
      idle(level, actor);
      return true;
    } else {
      console.log("- diagonal blocked!!!", actor.name, actor.x, actor.y);
      return false;
    }
  }

  const other = level.actorAt(newX, newY);
  if (other) {
    if (other.kind && other.bump(level, actor)) {
      return true;
    }
    if (actor.hasActed()) return true;

    if (!quiet) {
      game.addMessage(`You bump into a ${other.name}.`);
      FX.flash(level, newX, newY, "orange", 150);
      idle(level, actor);
      return true;
    } else {
      console.log("- nothing!!!", actor.name, actor.x, actor.y);
      return false;
    }
  }

  if (level.blocksMove(newX, newY)) {
    if (!quiet) {
      game.addMessage("You bump into a wall.");
      FX.flash(level, newX, newY, "orange", 150);
      idle(level, actor);
      return false;
    } else {
      console.log("- nothing blocked!!!", actor.name, actor.x, actor.y);
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

  actor.emit("move", level, actor, newX, newY);
  level.triggerAction("enter", actor);

  game.endTurn(actor, speed);
  return true;
}

export function moveTowardHero(
  level: Level,
  actor: Actor,
  quiet = false
): boolean {
  const game = level.game;
  const player = game.hero;

  const dir = player.mapToMe.nextDir(actor.x, actor.y, (x, y) => {
    return level.hasActor(x, y);
  });
  if (dir) {
    if (moveDir(level, actor, dir, true)) {
      return true; // success
    }
    if (!quiet) {
      FX.flash(level, actor.x, actor.y, "orange", 150);
    }
    return idle(level, actor);
  }
  return false;
}

install("move_toward_hero", moveTowardHero);

export function moveAwayFromHero(
  level: Level,
  actor: Actor,
  quiet = false
): boolean {
  const game = level.game;
  const player = game.hero;

  // compute safety map
  const safety = new GWU.path.DijkstraMap(level.width, level.height);
  safety.copy(player.mapToMe);
  safety.update((v, x, y) => {
    if (v >= GWU.path.BLOCKED) return v;
    v = -1.2 * v;
    if (level.isInLoop(x, y)) v -= 2;
    if (level.isGateSite(x, y)) v -= 2;
    return Math.round(v);
  });

  safety.setDistance(player.x, player.y, GWU.path.BLOCKED);
  safety.rescan((x, y) => actor.moveCost(x, y));
  safety.addObstacle(player.x, player.y, (x, y) => player.moveCost(x, y), 5);

  let dir = safety.nextDir(actor.x, actor.y, (x, y) => {
    return level.hasActor(x, y);
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
      if (moveDir(level, actor, d, true)) {
        console.log("- success");
        return true; // success
      }
    }

    if (!quiet) {
      FX.flash(level, actor.x, actor.y, "orange", 150);
    }
    return idle(level, actor);
  }
  return false;
}

install("move_away_from_hero", moveAwayFromHero);

export function attack(
  level: Level,
  actor: Actor,
  target: Actor | null = null
): boolean {
  const game = level.game;

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
      FX.flash(level, actor.x, actor.y, "orange", 150);
      game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
      return true; // did something
    } else if (targets.length > 1) {
      level.scene.app.scenes
        .run("target", { game, actor, targets })
        .once("stop", (result: Actor | null) => {
          if (!result) {
            FX.flash(level, actor.x, actor.y, "orange", 150);
            game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
          } else {
            attack(level, actor, result);
          }
        });
      return true; // didSomething
    } else {
      target = targets[0];
    }
  }

  // @ts-ignore
  const actorIsPlayer = actor === game.hero;
  // @ts-ignore
  const otherIsPlayer = target === game.hero;

  if (!actorIsPlayer && !otherIsPlayer) {
    return idle(level, actor); // no attacking
  }

  const attackInfo = actor.getMeleeAttack();
  if (!attackInfo) {
    game.addMessage("Cannot attack.");
    FX.flash(level, actor.x, actor.y, "orange", 150);
    game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
  }

  // we have an actor and a target
  EFFECT.damage(level, target, {
    amount: attackInfo.damage,
    msg: `${actor.name} attacks ${target.name}`,
  });
  game.endTurn(actor, attackInfo.time);

  return true;
}

install("attack", attack);

export function fire(
  level: Level,
  actor: Actor,
  target: Actor | null = null
): boolean {
  const game = level.game;
  const hero = game.hero;

  if (!actor.range) {
    game.addMessage("Nothing to fire.");
    return false;
  }
  if (!actor.ammo) {
    game.addMessage("No ammo.");
    return false;
  }

  if (target) {
    if (GWU.xy.distanceFromTo(actor, target) > actor.range) return false;
  } else {
    // todo - long reach melee -- spear, etc...

    const targets = game
      .level!.actors.filter((a) => {
        if (a === actor) return false;
        if (actor.health <= 0) return false;
        const dist = GWU.xy.distanceBetween(a.x, a.y, actor.x, actor.y);
        if (dist > actor.range) {
          console.log("too far - %f/%d - %s", dist, actor.range, a.name);
          return false;
        }
        console.log("checking fov...");

        // HACK - for actor.canSee(a)
        if (!hero.isInFov(actor)) {
          console.log("actor not visible");
          return false;
        }
        if (!hero.isInFov(a)) {
          console.log("target not visible");
          return false;
        }
        // end hack

        console.log("ok - ", a.name);
        return true;
      })
      .sort(
        (a, b) =>
          GWU.xy.distanceFromTo(hero, a) - GWU.xy.distanceFromTo(hero, b)
      );

    if (targets.length == 0) {
      game.addMessage("no targets.");

      // flash tiles you can fire into
      const fov = new GWU.fov.FOV({
        isBlocked(x: number, y: number) {
          // TODO - This should be more about visible than move
          return actor.moveCost(x, y) >= GWU.path.BLOCKED;
        },
        hasXY(x: number, y: number) {
          return level.hasXY(x, y);
        },
      });

      // TODO - FOV highlights cells we can't fire into...
      fov.calculate(actor.x, actor.y, actor.range - 0.9, (x, y) => {
        FX.flash(level, x, y, "dark_teal", 125);
      });

      // FX.flash(game, actor.x, actor.y, "orange", 150);

      game.endTurn(actor, Math.floor(actor.moveSpeed / 4));
      return true; // did something
    } else if (targets.length > 1) {
      level.scene.app.scenes
        .run("target", { game, actor, targets })
        .once("stop", (result: Actor | null) => {
          if (!result) {
            FX.flash(level, actor.x, actor.y, "orange", 150);
            game.endTurn(actor, Math.floor(actor.moveSpeed / 4));
          } else {
            fire(level, actor, result);
          }
        });
      return true; // didSomething
    } else {
      target = targets[0];
    }
  }

  // @ts-ignore
  const actorIsHero = actor === game.hero;
  // @ts-ignore
  const otherIsHero = target === game.hero;

  if (!actorIsHero && !otherIsHero) {
    return idle(level, actor); // no attacking
  }

  // we have an actor and a target
  // Does this move to an event handler?  'damage', { amount: #, type: string }

  actor.ammo -= 1;

  // TODO - get next attack details (and increment counter in actor)
  FX.projectile(level, actor, target, { ch: "|-\\/", fg: "white" }, 300).then(
    (xy, ok) => {
      if (!ok) {
        FX.flash(level, xy.x, xy.y, "orange", 150);
      } else {
        EFFECT.damage(level, target!, {
          amount: actor.rangedDamage,
          msg: `${actor.name} shoots ${target!.name}`,
        });
      }
    }
  );

  game.endTurn(actor, actor.rangedAttackSpeed);
  return true;
}

install("fire", fire);

export function fireAtHero(level: Level, actor: Actor): boolean {
  const game = level.game;
  const hero = game.hero;

  // if player can't see actor then actor can't see player!
  if (!hero.isInFov(actor.x, actor.y)) return false;
  if (!actor.ammo) return false;
  actor.ammo -= 1;

  // TODO - get next attack details (and increment counter in actor)
  FX.projectile(level, actor, hero, { ch: "|-\\/", fg: "white" }, 300).then(
    (xy, ok) => {
      if (!ok) {
        FX.flash(level, xy.x, xy.y, "orange", 150);
      } else {
        // @ts-ignore
        EFFECT.damage(level, hero, {
          amount: actor.rangedDamage,
          msg: `${actor.name} shoots ${hero.name}`,
        });
      }
    }
  );

  game.endTurn(actor, actor.rangedAttackSpeed);
  return true;
}

install("fire_at_hero", fireAtHero);

export function climb(level: Level, actor: Actor): boolean {
  const game = level.game;
  const tile = game.level!.getTile(actor.x, actor.y);
  if (tile.on && tile.on.climb) {
    tile.on.climb.call(tile, game, actor);
    return actor.hasActed();
  } else {
    return idle(level, actor);
  }
}

install("climb", climb);

export function pickup(level: Level, actor: Actor): boolean {
  const game = level.game;
  const item = level.itemAt(actor.x, actor.y);
  if (item) {
    item.emit("pickup", level, item, actor);
    return true;
  }
  game.addMessage("Nothing to pickup.");
  return idle(level, actor);
}

install("pickup", pickup);

// export function potion(game: Game, hero: Hero): boolean {
//   if (!hero.canUsePotion) {
//     game.addMessage("Not ready.");
//     // TODO - spend time? idle?
//     return false;
//   }
//   if (hero.health >= hero.health_max) {
//     game.addMessage("You do not need to drink a potion.");
//     // TODO - spend time? idle?
//     return false;
//   }

//   const heal = Math.floor(hero.health_max * 0.75);
//   hero.health = Math.min(hero.health + heal, hero.health_max);
//   hero.potion = 0; // Needs to recharge
//   game.addMessage("You feel much better.");
//   game.endTurn(hero, hero.moveSpeed);
//   return true;
// }
