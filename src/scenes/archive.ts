import * as GWU from "gw-utils";

export interface ArchiveConfig {
  messages: GWU.message.Cache;
  startHeight: number;
}

export interface ArchiveScene extends GWU.app.Scene {
  data: {
    messages: GWU.message.Cache;
    shown: number;
    startHeight: number;
    mode: "forward" | "reverse" | "ack";
    totalCount: number;
    [key: string]: any;
  };
}

export const archive = {
  bg: GWU.color.BLACK.alpha(50),
  start(this: ArchiveScene, source: ArchiveConfig) {
    this.data.messages = source.messages;

    this.data.shown = source.startHeight;
    this.data.startHeight = source.startHeight;

    this.data.mode = "forward";
    this.data.totalCount = source.messages.length;

    source.messages.confirmAll();
    this.wait(16, () => forward(this));
  },
  draw(this: ArchiveScene, buf: GWU.buffer.Buffer) {
    drawArchive(this);
  },
  keypress(this: ArchiveScene, e: GWU.app.Event) {
    next(this);
    e.stopPropagation();
  },
  click(this: ArchiveScene, e: GWU.app.Event) {
    next(this);
    e.stopPropagation();
  },
};

// @ts-ignore
GWU.app.installScene("archive", archive);

function next(scene: ArchiveScene) {
  if (scene.data.mode === "ack") {
    scene.data.mode = "reverse";
    scene.needsDraw = true;
    if (scene.data.timerCancel) {
      scene.data.timerCancel();
    }
    scene.data.timerCancel = scene.wait(16, () => reverse(scene));
  } else if (scene.data.mode === "reverse") {
    scene.stop();
  } else {
    scene.data.mode = "ack";
    scene.data.shown = scene.data.totalCount;
    if (scene.data.timerCancel) {
      scene.data.timerCancel();
      scene.data.timerCancel = null;
    }
    scene.needsDraw = true;
  }
}

function forward(scene: ArchiveScene) {
  // console.log('forward');

  ++scene.data.shown;
  scene.data.timerCancel = null;
  scene.needsDraw = true;
  if (scene.data.shown < scene.data.totalCount) {
    scene.data.timerCancel = scene.wait(16, () => forward(scene));
  } else {
    scene.data.mode = "ack";
    scene.data.shown = scene.data.totalCount;
  }
}

function reverse(scene: ArchiveScene) {
  // console.log('reverse');

  --scene.data.shown;
  scene.data.timerCancel = null;
  if (scene.data.shown <= scene.data.startHeight) {
    scene.stop();
  } else {
    scene.needsDraw = true;
    scene.data.timerCancel = scene.wait(16, () => reverse(scene));
  }
}

function drawArchive(scene: ArchiveScene) {
  let fadePercent = 0;
  // let reverse = this.mode === 'reverse';

  // Count the number of lines in the archive.
  // let totalMessageCount = scene.totalCount;
  const isOnTop = false;
  const dbuf = scene.buffer;
  const fg = GWU.color.from("white");
  const bg = GWU.color.from("black");

  // const dM = reverse ? -1 : 1;
  // const startM = reverse ? totalMessageCount : scene.bounds.height;
  // const endM = reverse
  //     ? scene.bounds.height + dM + 1
  //     : totalMessageCount + dM;

  const startY = isOnTop
    ? scene.data.shown - 1
    : scene.height - scene.data.shown;
  const endY = isOnTop ? 0 : scene.height - 1;
  const dy = isOnTop ? -1 : 1;

  dbuf.fillRect(
    0,
    Math.min(startY, endY),
    scene.width,
    scene.data.shown,
    " ",
    bg,
    bg
  );

  scene.data.messages.forEach(
    (line: string, _confirmed: boolean, j: number) => {
      const y = startY + j * dy;
      if (isOnTop) {
        if (y < endY) return;
      } else if (y > endY) return;
      fadePercent = Math.floor((50 * j) / scene.data.shown);
      const fgColor = fg.mix(scene.bg, fadePercent);
      dbuf.drawText(0, y, line, fgColor, bg);
    }
  );

  if (scene.data.mode === "ack") {
    const y = isOnTop ? 0 : dbuf.height - 1;
    const x = dbuf.width - 8; // But definitely on the screen - overwrite some text if necessary
    dbuf.wrapText(x, y, 8, "--DONE--", bg, fg);
  }
}
