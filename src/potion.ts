import * as GWU from "gw-utils";
import { Game } from "./game/game";
import { Level } from "./level/level";
import * as ACTIONS from "./action";
import { Actor } from "./actor/actor";
import { SidebarEntry } from "./widgets/sidebar";
import { GameOpts, Obj, install } from "./game";
import { Hero, HeroMakeOpts } from "./hero";

ACTIONS.install("potion", (level: Level, actor: Actor): boolean => {
  if (!actor.isHero) return false;

  if (actor.data.potion < actor.data.potion_max) {
    level.game.addMessage("Not ready.");
    // TODO - spend time? idle?
    return false;
  }

  // TODO - potion_heals_nearby

  if (actor.health >= actor.health_max) {
    // TODO - check for nearby
    level.game.addMessage("You do not need to drink a potion.");
    // TODO - spend time? idle?
    return false;
  }

  // TODO - potion_boosts_defense
  // adds {iron} status?

  const heal = Math.floor(actor.health_max * 0.75);
  actor.health = Math.min(actor.health + heal, actor.health_max);
  actor.data.potion = 0; // Needs to recharge
  level.game.addMessage("You drink a #{blue potion}.");
  level.game.endTurn(actor, actor.moveSpeed);
  return true;
});

install("potion", {
  game: {
    create(game: Game) {
      game.keymap["p"] = "potion";
    },
  },
  hero: {
    make(hero: Hero, opts: HeroMakeOpts) {
      hero.data.potion_max = 40 * 100; // 40 moves
      hero.data.potion = hero.data.potion_max;
    },
    tick: (level: Level, hero: Hero, time: number) => {
      let rate = Math.round(
        100 * Math.pow(0.85, hero.data.potion_cooldown || 0)
      );

      hero.data.potion = Math.min(
        hero.data.potion + Math.round((time * 100) / rate),
        hero.data.potion_max
      );
    },
    sidebar: (hero: Hero, entry: SidebarEntry) => {
      entry.add_progress(
        "Potion",
        "blue",
        hero.data.potion,
        hero.data.potion_max
      );
    },
  },
});
