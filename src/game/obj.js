import "../../lib/gw-utils.js";

export class Obj {
  constructor(cfg = {}) {
    this.x = 0;
    this.y = 0;
    this.depth = 0;
    this.events = new GWU.app.Events(this);

    Object.assign(this, cfg);
  }

  draw(buf) {}

  // EVENTS
  on(event, fn) {
    return this.events.on(event, fn);
  }
  once(event, fn) {
    return this.events.once(event, fn);
  }
  trigger(event, ...args) {
    return this.events.trigger(event, ...args);
  }
  load(cfg) {
    return this.events.load(cfg);
  }
}
