import { Actor } from "./actor";
import { Game } from "./game";
import * as ITEM from "./item";

ITEM.install({
  id: "HEALTH_POTION",
  ch: "!",
  fg: "pink",
  on: {
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      // TODO - vary the messages
      // TODO - Different healing amounts?
      actor.health = actor.kind.health; // TODO - move this to an effect
      game.addMessage("You drink the potion.");
      game.level!.removeItem(this);
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
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   actor.health = actor.kind.health;
      game.addMessage("You pickup some arrows.");
      game.level!.removeItem(this);
      // TODO - adjust for arrows.power?
      actor.ammo += 10;
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
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   [] Apples - 20%/3s
      game.addMessage("You eat an apple.");
      game.level!.removeItem(this);
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
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   [] Bread - 100%/30s
      game.addMessage("You eat some bread.");
      game.level!.removeItem(this);
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
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   [] Pork - 50%/10s
      game.addMessage("You eat some pork.");
      game.level!.removeItem(this);
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
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   [] Salmon - 35%/8s
      game.addMessage("You eat some salmon.");
      game.level!.removeItem(this);
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
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   [] Berries - 20%/5s + speedup
      game.addMessage("You eat some berries.");
      game.level!.removeItem(this);
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
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   [] Melon - 75%/15s
      game.addMessage("You eat some melon.");
      game.level!.removeItem(this);
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
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   [] Fruit - 30%/1s
      game.addMessage("You eat some fruit.");
      game.level!.removeItem(this);
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
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   [] Fish - 20%/2s + 10% oxygen
      game.addMessage("You eat some fish.");
      game.level!.removeItem(this);
      return true;
    },
  },
  tags: "drop, food",
});
