import * as GWU from "gw-utils";

import * as FX from "../fx/index";
import { CallbackFn, Obj, ObjCreateOpts, ObjEvents } from "../object/obj";
import { Game } from "../game/game";
import { Level } from "../level/level";
import { TileInfo } from "../tile";
import * as AI from "./ai";
import * as ACTIONS from "../action";

import { ActorEvents, ActorKind, getKind } from "./kind";
import { Item, placeRandom, ARMOR_FLAGS } from "../item";
import { Status } from "./status";
import { SidebarEntry } from "../widgets";
import { Hero } from "../hero/hero";
import { factory } from "./factory";

export interface ActorMakeOpts extends ObjCreateOpts, ActorEvents {
  power?: number;
  machineHome?: number;
}

export class AttackInfo {
  damage: number;
  time: number;

  constructor(damage: number, time: number) {
    this.damage = damage;
    this.time = time;
  }
}

export class Actor extends Obj {
  declare kind: ActorKind;
  _turnTime = 0;
  _level: Level | null = null;
  data: Record<string, any> = {};
  health: number = 0;
  health_max: number = 0;
  ammo: number = 0;
  _power: number = 1;
  armor_flags: number = 0;
  statuses: (Status | null)[] = [];
  combo_index: number = 0;

  leader: Actor | null = null;

  constructor(kind: ActorKind) {
    super(kind);

    this.z = 1;
    this.health_max = this.kind.health || 10;
    this.health = this.health_max;
    this.ammo = this.kind.ammo || 0; // TODO - scale with power?
  }

  _create(opts: ActorMakeOpts) {
    super._create(opts);

    Object.entries(opts).forEach(([key, val]) => {
      // 'on' section handled by super._make
      if (typeof val === "function") {
        this.on(key, val);
      }
    });

    this.power = opts.power || 1;
    // machineHome
  }

  // attributes
  get name(): string {
    return this.kind.name;
  }

  get damage(): number {
    // TODO - combo damage
    return Math.round(this.kind.damage * (1 + (this._power - 1) / 2));
  }

  get attackSpeed(): number {
    // TODO - combo speed
    return this.kind.attackSpeed;
  }

  get range(): number {
    return this.kind.range;
  }

  get rangedDamage(): number {
    return Math.round(this.kind.rangedDamage * (1 + (this._power - 1) / 2));
  }

  get rangedAttackSpeed(): number {
    return this.kind.rangedAttackSpeed;
  }

  get moveSpeed(): number {
    return this.kind.moveSpeed;
  }

  get comboLen(): number {
    return this.kind.combo;
  }

  get power(): number {
    return this._power;
  }

  set power(val: number) {
    this._power = val;
    this.health = Math.round(this.kind.health * (1 + (this._power - 1) / 2));
    this.health_max = this.health;
  }

  isHero(): this is Hero {
    return false;
  }
  //

  getMeleeAttack(): AttackInfo {
    const attack = new AttackInfo(this.damage, this.attackSpeed);
    this.combo_index += 1;
    this.combo_index = this.combo_index % this.comboLen;
    return attack;
  }

  hasArmorFlag(flag: number): boolean {
    return (this.armor_flags & flag) > 0;
  }

  // TODO - Should this be a method instead of a property?
  get canMeleeAttack(): boolean {
    return this.damage > 0 && this.attackSpeed > 0;
  }

  addStatus(status: Status) {
    const current = this.statuses.findIndex(
      (current) => current && current.merge(status)
    );
    if (current >= 0) {
      return;
    }
    const empty = this.statuses.findIndex((s) => !s);
    if (empty >= 0) {
      this.statuses[empty] = status;
    } else {
      this.statuses.push(status);
    }
  }

  remove_status(status: Status) {
    const index = this.statuses.indexOf(status);
    if (index >= 0) {
      this.statuses[index] = null;
    }
  }

  startTurn(level: Level) {
    this._turnTime = 0;
    this.emit("turn_start", level, this);
  }

  endTurn(level: Level, time: number) {
    this._turnTime = time;
    this.emit("turn_end", level, this, time);
  }

  hasActed() {
    return this._turnTime > 0;
  }

  draw(buf: GWU.buffer.Buffer) {
    if (this.health <= 0) return;
    buf.drawSprite(this.x, this.y, this.kind);
  }

  avoidsTile(tile: TileInfo): boolean {
    return tile.blocksMove || false;
  }

  moveCost(x: number, y: number) {
    const level = this._level;
    if (!level) return GWU.path.OBSTRUCTION;
    if (!level.hasXY(x, y)) return GWU.path.OBSTRUCTION;
    if (level.blocksDiagonal(x, y)) return GWU.path.OBSTRUCTION;
    if (level.blocksMove(x, y)) return GWU.path.BLOCKED;
    // if (level.hasActor(x, y)) return GWU.path.AVOIDED;
    return GWU.path.OK;
  }

  // move out of class
  pathTo(loc: GWU.xy.Pos) {
    const path = GWU.path.fromTo(this, loc, (x, y) => this.moveCost(x, y));
    return path;
  }

  // TODO - more generic & plugin
  act(level: Level) {
    // TODO - move this to plugin
    this.startTurn(level);
    AI.ai(level, this);
    if (!this.hasActed()) {
      console.log("No actor AI action.");
    }
  }

  // TODO - move to Obj
  doBump(level: Level, actor: Actor): boolean {
    // TODO - Check this.bump first!!!
    const actions = this.kind.bump;

    for (let action of actions) {
      const fn = ACTIONS.get(action);
      if (fn && fn(level, actor, this)) {
        return true;
      }
    }

    return false; // did nothing
  }

  tick(level: Level, time: number) {
    this.emit("tick", level, this, time);
    Object.values(this.statuses).forEach((status, i) => {
      if (status) {
        if (!status.tick(this, level, time)) {
          this.statuses[i] = null;
        }
      }
    });
  }

  getSidebarEntry(): SidebarEntry {
    const entry = new SidebarEntry(this.name, this.kind.fg);
    entry.add_progress("Health", "green", this.health, this.health_max);
    this.statuses.forEach((s) => {
      s && s.update_sidebar(this, entry);
    });
    this.emit("sidebar", this, entry); // Allow plugins to update sidebar
    return entry;
  }
}

export function isActor(obj: any): obj is Actor {
  return obj instanceof Actor;
}
