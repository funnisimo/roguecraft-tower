import { Actor } from "./actor";
import { Level } from "../level/level";

export type TargetCb = (target: Actor) => void;

export class Attack {
  canUseNow(actor: Actor): boolean {
    // how to store cooldowns?
    return false;
  }
  canTarget(actor: Actor, target: Actor): boolean {
    return false;
  }

  eachTarget(actor: Actor, level: Level, cb: TargetCb): boolean {
    return false;
  }

  getTargets(actor: Actor, level: Level): Actor[] {
    return [];
  }

  attack(actor: Actor, target: Actor): boolean {
    // how to store sequence counter?
    return false;
  }
}

export class RangedAttack extends Attack {
  attack(actor: Actor, target: Actor): boolean {
    // show projectile...
    return false;
  }
}
