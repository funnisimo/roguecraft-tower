import * as GWU from "gw-utils";

export type CallbackFn = GWU.app.CallbackFn;
export type ObjEvents = { [key: string]: CallbackFn };

export interface ObjCreateOpts {
  x?: number;
  y?: number;
  z?: number;

  on?: ObjEvents;
}

export class Obj {
  x: number;
  y: number;
  z: number;
  events: GWU.app.Events;
  // spawn: boolean;

  constructor() {
    this.x = -1;
    this.y = -1;
    this.z = 0;
    this.events = new GWU.app.Events(this);
    // this.spawn = false;

    // Object.assign(this, cfg);
  }

  // create(opts: ObjCreateOpts) {
  //   this._create(opts);
  //   this.emit("create", opts);
  // }

  _create(cfg: ObjCreateOpts) {
    this.x = cfg.x !== undefined ? cfg.x : this.x;
    this.y = cfg.y !== undefined ? cfg.y : this.y;
    this.z = cfg.z !== undefined ? cfg.z : this.z;

    const onFns = cfg.on || {};
    Object.entries(onFns).forEach(([key, value]) => {
      if (!value) return;
      this.on(key, value);
    });
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
