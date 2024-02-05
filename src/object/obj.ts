import * as GWU from "gw-utils";
import { ObjKind } from "./kind";

export type CallbackFn = GWU.app.CallbackFn;
export type ObjEvents = { [key: string]: CallbackFn };

export interface ObjCreateOpts {
  x?: number;
  y?: number;
  z?: number;

  on?: ObjEvents;

  performs?: string[];
  resolves?: string[];
  bump?: string[];
}

export class Obj {
  x: number = -1;
  y: number = -1;
  z: number = 0;
  events: GWU.app.Events = new GWU.app.Events(this);
  // spawned: boolean = false;

  performs: string[] = []; // TODO - { action: string, settings: Record<string,any> }[]
  resolves: string[] = []; // TODO - { action: string, settings: Record<string,any> }[]
  bump: string[] = []; // TODO - { action: string, settings: Record<string,any> }[]

  kind: ObjKind;

  // create(opts: ObjCreateOpts) {
  //   this._create(opts);
  //   this.emit("create", opts);
  // }

  constructor(kind: ObjKind) {
    this.kind = kind;

    Object.entries(this.kind.on).forEach(([key, value]) => {
      if (!value) return;
      this.on(key, value);
    });
  }

  _create(cfg: ObjCreateOpts) {
    this.x = cfg.x !== undefined ? cfg.x : this.x;
    this.y = cfg.y !== undefined ? cfg.y : this.y;
    this.z = cfg.z !== undefined ? cfg.z : this.z;

    const onFns = cfg.on || {};
    Object.entries(onFns).forEach(([key, value]) => {
      if (!value) return;
      this.on(key, value);
    });

    if (cfg.performs && Array.isArray(cfg.performs)) {
      this.performs = cfg.performs;
    }
    if (cfg.resolves && Array.isArray(cfg.resolves)) {
      this.resolves = cfg.resolves;
    }
    if (cfg.bump && Array.isArray(cfg.bump)) {
      this.bump = cfg.bump;
    }
  }

  draw(buf: GWU.buffer.Buffer) {}

  // EVENTS
  on(cfg: Record<string, CallbackFn>): GWU.app.CancelFn;
  on(event: string, fn: CallbackFn): GWU.app.CancelFn;
  on(...args: any[]): GWU.app.CancelFn {
    if (args.length == 1) {
      return this.events.on(args[0]);
    }
    return this.events.on(args[0], args[1]);
  }
  once(event: string, fn: CallbackFn) {
    return this.events.once(event, fn);
  }
  emit(event: string, ...args: any[]) {
    return this.events.emit(event, ...args);
  }
}
