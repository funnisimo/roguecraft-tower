import * as GWU from "gw-utils";

export const TargetScene = {
  start(data) {
    // const game = data.game;
    // const actor = data.actor;
    // const targets = data.targets;

    this.data = data;
    this.data.current = 0;
    this.bg = GWU.color.NONE;
    this.needsDraw = false;

    this.buffer.nullify();
    let current = this.data.targets[this.data.current];
    const mixer = this.app.buffer.get(current.x, current.y).clone().swap();
    this.buffer.drawSprite(current.x, current.y, mixer);

    console.log("target", current.x, current.y);
  },

  on: {
    dir(e) {
      let current = this.data.targets[this.data.current];
      this.buffer.nullify(current.x, current.y);

      if (e.dir[0] > 0) {
        this.data.current += 1;
      } else if (e.dir[0] < 0) {
        this.data.current -= 1;
      } else if (e.dir[1] > 0) {
        this.data.current += 1;
      } else if (e.dir[1] < 0) {
        this.data.current += 1;
      }
      if (this.data.current < 0) {
        this.data.current = this.data.targets.length - 1;
      } else if (this.data.current >= this.data.targets.length) {
        this.data.current = 0;
      }

      current = this.data.targets[this.data.current];

      console.log("target", current.x, current.y);
      const mixer = this.app.buffer.get(current.x, current.y).clone().swap();
      this.buffer.drawSprite(current.x, current.y, mixer);
    },
    Enter() {
      this.stop(this.data.targets[this.data.current]);
    },
    Escape() {
      this.stop(null);
    },
    keypress(e) {
      e.stopPropagation();
    },
    click(e) {
      e.stopPropagation();
    },
    mousemove(e) {
      e.stopPropagation();
    },
  },
};

GWU.app.installScene("target", TargetScene);
