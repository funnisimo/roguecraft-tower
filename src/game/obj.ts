import * as GWU from "gw-utils";

export type CallbackFn = GWU.app.CallbackFn;
export interface ObjConfig {
  x?: number;
  y?: number;
  z?: number;

  // [key: string]: any;
}

export class Obj {
  x: number;
  y: number;
  z: number;
  events: GWU.app.Events;
  spawn: boolean;

  constructor(cfg: ObjConfig = {}) {
    this.x = cfg.x || 0;
    this.y = cfg.y || 0;
    this.z = cfg.z || 0;
    this.events = new GWU.app.Events(this);
    this.spawn = false;

    // Object.assign(this, cfg);
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
