import * as GWU from "gw-utils";
import { Game } from "../game";
import { Actor } from "./actor";
import * as Effect from "../effect";
import { SidebarEntry } from "../widgets";

export class Status {
  start(actor: Actor, game: Game): void {}
  tick(actor: Actor, game: Game, time: number): boolean {
    return false; // no longer active
  }
  stop(actor: Actor, game: Game): void {}

  merge(status: Status): boolean {
    return false;
  }

  // TODO - Wrap this with higher level interface
  //      - Allow modifying the health bar
  //      - Allow set text { set_status("Regen") }
  update_sidebar(actor: Actor, entry: SidebarEntry) {}

  // TODO - Wrap this with higher level interface
  //      - Allow modifying other parts
  //      - Allow set text { set_status("Regen") }
  draw_details(): void {}
}

class RegenData {
  amount: number;
  time: number;
  elapsed: number;

  constructor(amount: number, time: number) {
    this.amount = amount;
    this.time = time;
    this.elapsed = 0;
  }

  get isActive(): boolean {
    return this.amount > 0.0 && this.elapsed < this.time;
  }

  tick(time: number): number {
    let used = Math.floor((this.amount * this.elapsed) / this.time);
    this.elapsed = Math.min(this.time, this.elapsed + time);
    let new_used = Math.floor((this.amount * this.elapsed) / this.time);
    return new_used - used;
  }
}

export class RegenStatus extends Status {
  data: RegenData[];

  constructor(amount: number, time: number) {
    super();
    this.data = [new RegenData(amount, time)];
  }

  tick(actor: Actor, game: Game, time: number): boolean {
    let still_active = false;
    this.data.forEach((d) => {
      if (d.isActive) {
        still_active = true;
        const amount = d.tick(time);
        if (amount > 0) {
          Effect.heal(game, actor, { amount });
        }
      }
    });

    return still_active;
  }

  merge(status: Status): boolean {
    if (status instanceof RegenStatus) {
      // do merge
      this.data = this.data.concat(status.data);
      status.data = [];
      return true;
    }
    return false;
  }

  update_sidebar(actor: Actor, entry: SidebarEntry) {
    entry.add_status("{Regen}", "green");
  }
}
