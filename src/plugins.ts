import * as GWU from "gw-utils";
import { Game } from "./game/game";
import { Level } from "./game/level";
import * as Plugin from "./game/plugins";
import * as ACTIONS from "./action";
import { Actor } from "./actor/actor";
import { SidebarEntry } from "./widgets/sidebar";
import { NextFn, Result } from "./game/plugins";
import { Obj } from "./game";
import { isHero } from "./actor";

ACTIONS.install("potion", (game: Game, actor: Actor): boolean => {
  if (!actor.isHero) return false;

  if (actor.data.potion < actor.data.potion_max) {
    game.addMessage("Not ready.");
    // TODO - spend time? idle?
    return false;
  }

  // TODO - potion_heals_nearby

  if (actor.health >= actor.health_max) {
    // TODO - check for nearby
    game.addMessage("You do not need to drink a potion.");
    // TODO - spend time? idle?
    return false;
  }

  // TODO - potion_boosts_defense
  // adds {iron} status?

  const heal = Math.floor(actor.health_max * 0.75);
  actor.health = Math.min(actor.health + heal, actor.health_max);
  actor.data.potion = 0; // Needs to recharge
  game.addMessage("You drink a #{blue potion}.");
  game.endTurn(actor, actor.moveSpeed);
  return true;
});

Plugin.install("potion", {
  new_game(req: { game: Game }, next: NextFn<null>): Result<null> {
    req.game.keymap["p"] = "potion";
    return next();
  },

  spawn(
    req: { level: Level; obj: Obj; x: number; y: number },
    next: NextFn<null>
  ): Result<null> {
    if (isHero(req.obj)) {
      const hero = req.obj;
      hero.data.potion_max = 40 * 100; // 40 moves
      hero.data.potion = hero.data.potion_max;
    }
    return next();
  },

  tick(req: { obj: Obj; time: number }, next: NextFn<null>): Result<null> {
    if (isHero(req.obj)) {
      const hero = req.obj;
      let rate = Math.round(
        100 * Math.pow(0.85, hero.data.potion_cooldown || 0)
      );

      hero.data.potion = Math.min(
        hero.data.potion + Math.round((req.time * 100) / rate),
        hero.data.potion_max
      );
    }
    return next();
  },

  sidebar(
    req: { obj: Obj; entry: SidebarEntry },
    next: NextFn<null>
  ): Result<null> {
    if (isHero(req.obj)) {
      const hero = req.obj;
      req.entry.add_progress(
        "Potion",
        "blue",
        hero.data.potion,
        hero.data.potion_max
      );
    }
    return next();
  },
});
