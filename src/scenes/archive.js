import "../../lib/gw-utils.js";

export const ArchiveScene = {
  bg: GWU.color.BLACK.alpha(50),
  start(source) {
    this.data.messages = source.messages;

    this.data.shown = source.startHeight;
    this.data.startHeight = source.startHeight;

    this.data.mode = "forward";
    this.data.totalCount = source.messages.length;

    source.messages.confirmAll();
    this.wait(16, () => forward(this));
  },
  draw(buf) {
    drawArchive(this);
  },
  keypress(e) {
    next(this);
    e.stopPropagation();
  },
  click(e) {
    next(this);
    e.stopPropagation();
  },
};

GWU.app.installScene("archive", ArchiveScene);

function next(scene) {
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

function forward(scene) {
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

function reverse(scene) {
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

function drawArchive(scene) {
  let fadePercent = 0;
  // let reverse = this.mode === 'reverse';

  // Count the number of lines in the archive.
  // let totalMessageCount = scene.totalCount;
  const isOnTop = false;
  const dbuf = scene.buffer;
  const fg = GWU.color.from("purple");
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

  scene.data.messages.forEach((line, _confirmed, j) => {
    const y = startY + j * dy;
    if (isOnTop) {
      if (y < endY) return;
    } else if (y > endY) return;
    fadePercent = Math.floor((50 * j) / scene.data.shown);
    const fgColor = fg.mix(scene.bg, fadePercent);
    dbuf.drawText(0, y, line, fgColor, bg);
  });

  if (scene.data.mode === "ack") {
    const y = isOnTop ? 0 : dbuf.height - 1;
    const x = dbuf.width - 8; // But definitely on the screen - overwrite some text if necessary
    dbuf.wrapText(x, y, 8, "--DONE--", bg, fg);
  }
}
