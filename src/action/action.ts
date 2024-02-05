import { Actor } from "../actor";
import { Obj } from "../object";
import { Item } from "../item";
import { Level } from "../level";
import { Hero } from "../hero";

type Settings = Record<string, any>;

enum ActResultType {
  OK,
  DONE,
  RETRY,
  WAITING,
}

class ActResult {
  _time = 0;
  _result = ActResultType.DONE;

  private constructor(result: ActResultType, time: number = 0) {
    this._result = result;
    this._time = time;
  }

  static Ok(time: number): ActResult {
    return new ActResult(ActResultType.OK, time);
  }
  static Stop(): ActResult {
    return new ActResult(ActResultType.DONE);
  }
  static Retry(): ActResult {
    return new ActResult(ActResultType.RETRY);
  }
  static Waiting(): ActResult {
    return new ActResult(ActResultType.WAITING);
  }

  isOk(): boolean {
    return this._result == ActResultType.OK;
  }
  isStop(): boolean {
    return this._result == ActResultType.DONE;
  }
  isRetry(): boolean {
    return this._result == ActResultType.RETRY;
  }
  isWaiting(): boolean {
    return this._result == ActResultType.WAITING;
  }

  time(): number {
    return this._time;
  }

  toString() {
    if (this.isStop()) return "ActResult.Stop";
    if (this.isRetry()) return "ActResult.Retry";
    if (this.isWaiting()) return "ActResult.Waiting";
    return `ActResult.Ok(${this._time})`;
  }

  valueOf() {
    if (this.isOk()) return this._time;
    return 0;
  }
}

type SimpleActionFn = (
  level: Level,
  hero: Hero,
  settings?: Settings
) => ActResult;

interface Action {
  // perform(level: Level, actor: Actor, settings?: Settings): ActResult;
  perform(dt: number): ActResult; // get vars in constructor
}

class SimpleAction implements Action {
  fn: SimpleActionFn;
  level: Level;
  hero: Hero;
  settings: Settings;

  constructor(
    fn: SimpleActionFn,
    level: Level,
    actor: Hero,
    settings: Settings = {}
  ) {
    this.fn = fn;
    this.level = level;
    this.hero = actor;
    this.settings = settings;
  }

  perform(dt: number): ActResult {
    return this.fn(this.level, this.hero, this.settings);
  }
}

// export class Action {
//   name: string;

//   canPerform(level: Level, actor: Actor, settings: any = {}): boolean { return false; }

//   targetInRange(level: Level, actor: Actor, target: Actor, settings: any = {}): boolean { return false; }
//   range(level: Level, actor: Actor): number { return 1; }

//   // TODO - may not need any of the parameters - this might be a "static" value
//   targetsObject(level: Level, actor: Actor, item: Item): boolean { return false; }
//   // TODO - may not need any of the parameters - this might be a "static" value
//   targetsCell(level: Level, actor: Actor, x: number, y: number): boolean { return false; }

//   perform(level: Level, actor: Actor): boolean { return false; }
//   resolveObject(level: Level, actor: Actor, item: Item): boolean { return false; }
//   resolveCell(level: Level, actor: Actor, x: number, y: number): boolean { return false; }

//   success(level: Level, actor: Actor) {}
//   failure(level: Level, actor: Actor) {}

//   canBumpTarget(level: Level, actor: Actor, target: Actor): boolean { return false; }

//   tryPerformAction(level: Level, actor: Actor , target: Actor | Item, settings: any = {}): boolean {
//     settings = settings || {};
//     if (!settings.skipCanPerform && !this.canPerform(level, actor, settings)) {
//       if (!settings.quiet) {
//         // level.game.addMessage("cannotPerform", actor, target, settings);
//       }
//       return false;
//     }
//     if (!settings.skipRange && !this.targetInRange(level, actor, target, settings)) {
//       if (!settings.quiet) {
//         // level.game.addMessage("outOfRange", actor, target, settings);
//       }
//       return false;
//     }
//     if (!this.isValidTarget(level, actor, target, settings)) return false;
//     return this.doPerformAction(actor, target, settings);
//   },

//   doPerformAction: function (actor, target, settings) {
//     settings = settings || {};
//     if (!this.perform(actor, target, settings)) return false;
//     if (!this.resolve(actor, target, settings)) {
//       this.failure(actor, target, settings);
//       return false;
//     }
//     this.success(actor, target, settings);
//     return true;
//   },

//   resolve: function (actor, target, settings) {
//     if (target instanceof RL.Object) {
//       if (this.resolveObject) {
//         this.resolveObject(actor, target, settings);
//       }
//     } else {
//       if (this.resolveCell) {
//         this.resolveCell(actor, target, settings);
//       }
//     }
//     const resolves = Action.getResolves.call(this, target);
//     if (!resolves) return true;
//     if (resolves === true) return true;
//     if (typeof resolves === "function") {
//       return resolves(actor, target, settings);
//     }
//     throw new Error("Unexpected resovles type!");
//   },

//   isValidTarget(level: Level, actor: Actor, target: Actor | Item, settings: any={}): boolean {
//     if (target instanceof Item) {
//       return this.targetsObject(level, actor, target, settings);
//     } else if (target instanceof RL.Cell) {
//       return this.targetsCell(actor, settings, target);
//     }
//     throw new Error("Invalid target type!");
//   },

//   getTargets: Action.getTargets,
// };
