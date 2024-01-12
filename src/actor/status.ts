import * as GWU from "gw-utils";
import { Game } from "../game";
import { Actor } from "./actor";
import * as Effect from "../effect";

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
  draw_sidebar(
    buf: GWU.buffer.Buffer,
    x: number,
    y: number,
    width: number,
    actor: Actor
  ): number {
    return 0;
  }

  // TODO - Wrap this with higher level interface
  //      - Allow modifying other parts
  //      - Allow set text { set_status("Regen") }
  draw_details(): void {}
}

class RegenData {
  amount: number;
  time: number;

  constructor(amount: number, time: number) {
    this.amount = amount;
    this.time = time;
  }
}

export class RegenStatus extends Status {
  data: RegenData[];

  constructor(amount: number, time: number) {
    super();
    this.data = [new RegenData(amount / time, time)];
  }

  tick(actor: Actor, game: Game, time: number): boolean {
    let still_active = false;
    this.data.forEach((d) => {
      if (d.amount > 0.0 && d.time > 0) {
        still_active = true;
        const amount = Math.round(d.amount * Math.min(d.time, time));
        d.time -= time;
        Effect.heal(game, actor, { amount });
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

  draw_sidebar(
    buf: GWU.buffer.Buffer,
    x: number,
    y: number,
    width: number,
    actor: Actor
  ): number {
    buf.drawText(x, y, "{Regen}", "red");
    return 1;
  }
}
