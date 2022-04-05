import * as GWU from "gw-utils";

import * as FX from "../fx/index";
import { Obj, CallbackFn, ObjConfig } from "../game/obj";
import { Game } from "../game/game";
import { Level } from "../game/level";
import { TileInfo } from "../game/tiles";
import * as AI from "./ai";

export interface ActorEvents {
  bump?: (game: Game, actor: Actor, other: Actor) => void;
  [key: string]: CallbackFn | undefined;
}

export interface ActorKind {
  id: string;
  health: number;
  damage: number;
  moveSpeed: number;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  on?: ActorEvents;
}

export const kinds: Record<string, ActorKind> = {};

export function install(cfg: ActorKind) {
  kinds[cfg.id.toLowerCase()] = cfg;
}

export function get(id: string): ActorKind | null {
  return kinds[id] || null;
}

export interface ActorConfig extends ObjConfig {
  kind: ActorKind;
}

export class Actor extends Obj {
  _turnTime = 0;
  _level: Level | null = null;
  kind: any;
  data: Record<string, any>;
  health: number;
  damage: number;

  leader: Actor | null = null;

  constructor(cfg?: ActorConfig) {
    super(cfg);
    if (!this.kind) throw new Error("Must have kind.");

    this.kind.moveSpeed = this.kind.moveSpeed || 100;
    this.data = {};
    this.health = this.kind.health || 0;
    this.damage = this.kind.damage || 0;

    this.on("add", (level) => {
      level.game.scheduler.push(this, this.kind.moveSpeed);
      this._level = level;
    });
    this.on("remove", (level) => {
      // console.group("ACTOR REMOVE", this);
      // console.group("before");
      // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
      // console.groupEnd();
      level.game.scheduler.remove(this);
      this._level = null;
      // console.group("after");
      // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
      // console.groupEnd();
      // console.groupEnd();
    });
  }

  startTurn(game: Game) {
    this._turnTime = 0;
    this.trigger("start", game);
  }

  endTurn(game: Game, time: number) {
    this._turnTime = time;
    this.trigger("end", game, time);
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
    if (level.blocksMove(x, y)) return GWU.path.OBSTRUCTION;
    // if (game.actorAt(x, y)) return GWU.path.AVOIDED;
    return 1;
  }

  pathTo(loc: GWU.xy.Loc) {
    const path = GWU.path.fromTo(this, loc, (x, y) => this.moveCost(x, y));
    return path;
  }

  act(game: Game) {
    this.startTurn(game);
    AI.ai(game, this);
    if (!this.hasActed()) {
      console.log("No actor AI action.");
    }
  }
}

export function make(id: string | ActorKind, opts?: Record<string, any>) {
  let kind: ActorKind;
  if (typeof id === "string") {
    kind = kinds[id.toLowerCase()];
    if (!kind) throw new Error("Failed to find actor kind - " + id);
  } else {
    kind = id;
  }

  const config = Object.assign(
    {
      x: 1,
      y: 1,
      depth: 1, // items, actors, player, fx
      kind,
      health: kind.health || 10,
      damage: kind.damage || 2,
    },
    opts
  );

  return new Actor(config);
}

export type ActorCallback = (actor: Actor) => void;

export interface ThenActor {
  then(cb: ActorCallback): void;
}

export function spawn(
  level: Level,
  id: string | Actor,
  x?: number,
  y?: number,
  ms = 500
): ThenActor {
  const newbie = typeof id === "string" ? make(id) : id;

  const bg = newbie.kind.fg;
  const game = level.game!;
  const scene = game.scene!;
  // const level = level.level;

  if (x === undefined) {
    do {
      x = level.rng.number(level.width);
      y = level.rng.number(level.height);
    } while (!level.hasTile(x, y, "FLOOR") || level.actorAt(x, y));
  }

  let _success: ActorCallback = GWU.NOOP;

  FX.flashGameTime(game, x, y!, bg).then(() => {
    newbie.x = x!;
    newbie.y = y!;
    level.addActor(newbie);
    _success(newbie);
  });

  return {
    then(cb: ActorCallback) {
      _success = cb || GWU.NOOP;
    },
  };
}
