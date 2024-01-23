import * as GWU from "gw-utils";
import { Game } from "./game/game";
import { Level } from "./game/level";
import * as Plugin from "./game/plugins";
import * as ACTIONS from "./action";
import { Actor } from "./actor/actor";
import { SidebarEntry } from "./widgets/sidebar";

ACTIONS.install("potion", (game: Game, actor: Actor): boolean => {
  if (!actor.isHero) return false;

  if (actor.data.potion < actor.data.potion_max) {
    game.addMessage("Not ready.");
    // TODO - spend time? idle?
    return false;
  }
  if (actor.health >= actor.health_max) {
    game.addMessage("You do not need to drink a potion.");
    // TODO - spend time? idle?
    return false;
  }

  const heal = Math.floor(actor.health_max * 0.75);
  actor.health = Math.min(actor.health + heal, actor.health_max);
  actor.data.potion = 0; // Needs to recharge
  game.addMessage("You feel much better.");
  game.endTurn(actor, actor.moveSpeed);
  return true;
});

Plugin.install("potion", {
  new_game(game: Game) {
    game.keymap["p"] = "potion";
  },
  new_level(game: Game, level: Level) {
    console.log("POTION PLUGIN: NEW LEVEL");
    level.on("spawn_actor", (actor: Actor) => {
      console.log("POTION PLUGIN SPAWN ACTOR: " + actor.kind.id);
      if (actor.isHero) {
        actor.data.potion_max = 40 * 100; // 40 moves
        actor.data.potion = actor.data.potion_max;

        actor.on("turn_end", (game: Game, time: number) => {
          actor.data.potion = Math.min(
            actor.data.potion + time,
            actor.data.potion_max
          );
        });

        actor.on("sidebar", (entry: SidebarEntry) => {
          entry.add_progress(
            "Potion",
            "blue",
            actor.data.potion,
            actor.data.potion_max
          );
        });
      }
    });
  },
});
