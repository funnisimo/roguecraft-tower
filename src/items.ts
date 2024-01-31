import { Actor, RegenStatus } from "./actor";
import { Game } from "./game";
import * as ITEM from "./item";
import { Item } from "./item";
import { Level } from "./level";

ITEM.install({
  id: "HEALTH_POTION",
  ch: "!",
  fg: "pink",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      // TODO - vary the messages
      // TODO - Different healing amounts?
      actor.health = actor.kind.health; // TODO - move this to an effect
      level.game.addMessage("You drink the potion.");
      level.removeItem(item);
      // destroy
      return true;
    },
  },
  tags: "", // Not a drop because it is innate
});

ITEM.install({
  id: "ARROWS",
  ch: "|",
  fg: "yellow",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      //   actor.health = actor.kind.health;
      level.game.addMessage("You pickup some ammo.");
      level.removeItem(this);
      // destroy

      actor.ammo += 10;
      if (actor.data.bonus_arrows > 0) {
        actor.ammo += 10 * actor.data.bonus_arrows;
      }
      return true;
    },
  },
  tags: "drop",
});

ITEM.install({
  id: "APPLE",
  ch: "&",
  fg: "yellow",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      //   [] Apples - 20%/3s
      actor.addStatus(
        new RegenStatus(Math.floor(actor.health_max * 0.2), 3 * 200)
      );
      level.game.addMessage("You eat an apple.");
      level.removeItem(this);
      // destroy
      return true;
    },
  },
  tags: "drop, food",
});

ITEM.install({
  id: "BREAD",
  ch: "&",
  fg: "yellow",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      //   [] Bread - 100%/30s
      actor.addStatus(new RegenStatus(Math.floor(actor.health_max), 30 * 200));
      level.game.addMessage("You eat some bread.");
      level.removeItem(this);
      // destroy
      return true;
    },
  },
  tags: "drop, food",
});

ITEM.install({
  id: "PORK",
  ch: "&",
  fg: "yellow",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      //   [] Pork - 50%/10s
      actor.addStatus(
        new RegenStatus(Math.floor(actor.health_max * 0.5), 10 * 200)
      );
      level.game.addMessage("You eat some pork.");
      level.removeItem(this);
      // destroy
      return true;
    },
  },
  tags: "drop, food",
});

ITEM.install({
  id: "SALMON",
  ch: "&",
  fg: "yellow",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      //   [] Salmon - 35%/8s
      actor.addStatus(
        new RegenStatus(Math.floor(actor.health_max * 0.35), 8 * 200)
      );
      level.game.addMessage("You eat some salmon.");
      level.removeItem(this);
      // destroy
      return true;
    },
  },
  tags: "drop, food",
});

ITEM.install({
  id: "BERRIES",
  ch: "&",
  fg: "yellow",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      //   [] Berries - 20%/5s + speedup
      actor.addStatus(
        new RegenStatus(Math.floor(actor.health_max * 0.2), 5 * 200)
      );

      level.game.addMessage("You eat some berries.");
      level.removeItem(this);
      // destroy
      return true;
    },
  },
  tags: "drop, food",
});

ITEM.install({
  id: "MELON",
  ch: "&",
  fg: "yellow",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      //   [] Melon - 75%/15s
      actor.addStatus(
        new RegenStatus(Math.floor(actor.health_max * 0.75), 15 * 200)
      );
      level.game.addMessage("You eat some melon.");
      level.removeItem(this);
      // destroy
      return true;
    },
  },
  tags: "drop, food",
});

ITEM.install({
  id: "FRUIT",
  ch: "&",
  fg: "yellow",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      //   [] Fruit - 30%/1s
      actor.addStatus(
        new RegenStatus(Math.floor(actor.health_max * 0.3), 1 * 200)
      );
      level.game.addMessage("You eat some fruit.");
      level.removeItem(this);
      // destroy
      return true;
    },
  },
  tags: "drop, food",
});

ITEM.install({
  id: "FISH",
  ch: "&",
  fg: "yellow",
  on: {
    pickup(level: Level, item: Item, actor: Actor): boolean {
      //   [] Fish - 20%/2s + 10% oxygen
      actor.addStatus(
        new RegenStatus(Math.floor(actor.health_max * 0.2), 2 * 200)
      );
      level.game.addMessage("You eat some fish.");
      level.removeItem(this);
      // destroy
      return true;
    },
  },
  tags: "drop, food",
});
