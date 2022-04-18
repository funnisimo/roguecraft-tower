import * as GWU from "gw-utils";

export type CallbackFn = GWU.app.CallbackFn;
export interface ObjConfig {
  x?: number;
  y?: number;
  z?: number;

  ch?: string | null;
  fg?: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  // [key: string]: any;
}

export class Obj {
  x: number;
  y: number;
  z: number;
  events: GWU.app.Events;

  constructor(cfg: ObjConfig = {}) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.events = new GWU.app.Events(this);

    Object.assign(this, cfg);
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
  trigger(event: string, ...args: any[]) {
    return this.events.trigger(event, ...args);
  }
}
