import { Actor, ActorEvents } from "../actor";
import { CallbackFn, ObjEvents } from "../game";
import { ItemEvents } from "../item";

export interface Enchant {
  apply(actor: Actor, level: number);
  unapply(actor: Actor);
  actor: ActorEvents & ObjEvents;
  item: ItemEvents & ObjEvents;
}

const enchants: Record<string, Enchant> = {};

export function install(name: string, enchant: Partial<Enchant> = {}) {
  const obj = Object.assign(
    {
      apply(actor: Actor, level: number) {
        actor.data[name] = level;
      },
      unapply(actor: Actor) {
        actor.data[name] = 0;
      },
      actor: {},
      item: {},
    },
    enchant
  );
  enchants[name] = obj;
}

export function get(name: string): Enchant | null {
  return enchants[name] || null;
}
