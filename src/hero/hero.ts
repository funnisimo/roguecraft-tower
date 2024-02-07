import * as GWU from "gw-utils";

import * as ACTOR from "../actor";
import * as ACTION from "../action";
import { Level } from "../level";
import { Game } from "../game";
import { ObjCreateOpts, ObjEvents } from "../object";
import * as ITEM from "../item";
import { HeroEvents, HeroKind, getKind } from "./kind";
import { factory } from "./factory";
// import * as PLUGINS from "../game/plugins";

export interface HeroMakeOpts extends ObjCreateOpts, HeroEvents {
  power?: number;
  slots?: { [id: string]: string }; // TODO - Allow more object create options here
}

export class Hero extends ACTOR.Actor {
  declare kind: HeroKind;

  // TODO - Make this part of a plugin
  mapToMe: GWU.path.DijkstraMap;

  // TODO - Make this part of a plugin
  fov: GWU.grid.NumGrid | null;

  goalPath: GWU.xy.Loc[] | null;
  followPath: boolean;

  // TODO - Make this part of a plugin
  slots: { [id: string]: ITEM.Item | null };

  constructor(kind: HeroKind) {
    super(kind as unknown as ACTOR.ActorKind);
    this.mapToMe = new GWU.path.DijkstraMap();
    this.fov = null;
    this.goalPath = null;
    this.followPath = false;
    this.slots = {};
    // this.potion_max = 40 * 200;
    // this.potion = this.potion_max; // Potion is ready
  }

  // @ts-ignore
  _create(opts: HeroMakeOpts) {
    // @ts-ignore
    super._create(opts);

    // this.on("add", (level: Level) => {
    //   this.updateMapToMe();
    //   this.updateFov();
    // });
    // this.on("move", () => {
    //   this.updateMapToMe();
    //   this.updateFov();
    // });
    // this.on("remove", () => {
    //   if (this.fov) {
    //     GWU.grid.free(this.fov);
    //     this.fov = null;
    //   }
    //   this.clearGoal();
    // });
    // this.on("turn_end", (game: Game, time: number) => {
    //   // this.potion = Math.min(this.potion + time, this.potion_max);
    // });
    // this.on("damage", () => this.clearGoal());

    // Need items in slots....
    Object.entries(this.kind.slots).forEach(([slot, id]) => {
      const item = ITEM.make(id);
      if (item === null) {
        console.log(`player UNKNOWN Item ERROR = ${id} @ ${slot}`);
      } else {
        this.equip(item);
        console.log(`player Item = ${item.kind.id} @ ${slot}`);
      }
    });
  }

  // TODO - move to attack & plugin?
  get damage(): number {
    const melee = this.slots.melee;
    if (melee) {
      // track combo...
      if (this.combo_index == melee.kind.combo - 1) {
        return melee.comboDamage;
      }
      return melee.damage;
    }
    return super.damage;
  }

  get attackSpeed(): number {
    const melee = this.slots.melee;
    if (melee) {
      // track combo...
      if (this.combo_index == melee.kind.combo - 1) {
        return melee.comboSpeed;
      }
      return melee.speed;
    }
    return super.attackSpeed;
  }

  get range(): number {
    const ranged = this.slots.ranged;
    if (ranged) {
      return ranged.range;
    }
    return super.range;
  }

  get rangedDamage(): number {
    const ranged = this.slots.ranged;
    if (ranged) {
      return ranged.damage;
    }
    return super.rangedDamage;
  }

  get rangedAttackSpeed(): number {
    const ranged = this.slots.ranged;
    if (ranged) {
      return ranged.speed;
    }
    return super.rangedAttackSpeed;
  }

  // get canUsePotion(): boolean {
  //   return this.potion >= this.potion_max;
  // }

  get comboLen(): number {
    const melee = this.slots.melee;
    if (melee) {
      return melee.combo;
    }
    return this.kind.combo;
  }

  isHero(): this is Hero {
    return true;
  }

  // TODO - action and plugin?
  equip(item: ITEM.Item) {
    if (item.slot === null) {
      throw new Error(`Item cannot be equipped - ${item.kind.id} - no slot`);
    }
    this.slots[item.slot] = item;
    this.armor_flags = 0; // TODO - this.kind.item_flags (allows mobs to have flags too)
    const health_pct = this.health / this.health_max;
    let new_health_max = this.kind.health;
    Object.entries(this.slots).forEach(([s, i]) => {
      if (i) {
        this.armor_flags |= i.kind.armor_flags;
        new_health_max += i.defense;
      }
    });
    this.health_max = new_health_max;
    this.health = Math.round(new_health_max * health_pct);
    this.combo_index = 0;
  }

  // TODO - action and plugin?
  unequipSlot(slot: string) {
    this.slots[slot] = null;
    this.armor_flags = 0;
    const health_pct = this.health / this.health_max;
    let new_health_max = this.kind.health;
    Object.entries(this.slots).forEach(([s, i]) => {
      if (i) {
        this.armor_flags |= i.kind.armor_flags;
        new_health_max += i.defense;
      }
    });
    this.health_max = new_health_max;
    this.health = Math.round(new_health_max * health_pct);
    this.combo_index = 0;
  }

  act(level: Level) {
    // TODO - move this to plugin
    this.startTurn(level);

    if (this.goalPath && this.followPath && this.goalPath.length) {
      const step = this.goalPath[0];
      if (step) {
        if (level.hasActor(step[0], step[1])) {
          level.game.addMessage("You are blocked.");
        } else {
          const dir = GWU.xy.dirFromTo(this, step);
          // @ts-ignore
          if (ACTION.moveDir(level, this, dir, true)) {
            if (GWU.xy.equals(this, step)) {
              this.goalPath.shift(); // we moved there, so remove that step
            } else {
              this.clearGoal();
            }
            return;
          }
          level.game.addMessage("You lost track of path.");
        }
      }
    }
    this.clearGoal();

    level.needInput = true;
    console.log("Hero - await input", level.scheduler.time);
  }

  setGoal(x: number, y: number) {
    if (!this._level || this.followPath) return;

    const level = this._level;
    this.goalPath = GWU.path.fromTo(this, [x, y], (i, j) => {
      if (level.hasActor(i, j)) return GWU.path.AVOIDED;
      return this.moveCost(i, j);
    });
    if (
      this.goalPath &&
      this.goalPath.length &&
      GWU.xy.equals(this.goalPath[0], this)
    ) {
      this.goalPath.shift(); // remove the spot we are standing on
    }
  }

  clearGoal() {
    this.followPath = false;
    this.goalPath = null;
  }

  updateMapToMe() {
    const level = this._level;
    if (!level) return;

    this.mapToMe.reset(level.width, level.height);
    this.mapToMe.setGoal(this.x, this.y);
    this.mapToMe.calculate((x, y) => this.moveCost(x, y));
  }

  updateFov() {
    const level = this._level;
    if (!level) return;

    if (
      !this.fov ||
      this.fov.width !== level.width ||
      this.fov.height !== level.height
    ) {
      this.fov && GWU.grid.free(this.fov);
      this.fov = GWU.grid.alloc(level.width, level.height);
    }

    GWU.fov.calculate(
      this.fov,
      (x, y) => {
        return this.moveCost(x, y) >= GWU.path.BLOCKED;
      },
      this.x,
      this.y,
      100
    );
  }

  isInFov(pos: GWU.xy.Pos): boolean;
  isInFov(x: number, y: number): boolean;
  isInFov(...args: any[]): boolean {
    if (!this.fov) return false;

    if (args.length == 2) {
      const [x, y] = args;
      return this.fov.get(x, y)! > 0;
    } else {
      const pos = args[0];
      return this.fov.get(GWU.xy.x(pos), GWU.xy.y(pos))! > 0;
    }
  }
}

export function isHero(obj: any): obj is Hero {
  return obj instanceof Hero;
}
