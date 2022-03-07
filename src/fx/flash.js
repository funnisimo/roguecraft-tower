export function flash(game, x, y, color = "white", ms = 300) {
  const scene = game.scene;
  const map = game.map;

  scene.pause({ update: true });

  scene.buffer.draw(x, y, null, null, color);

  let _success = GWU.NOOP;
  let _fail = GWU.NOOP;

  scene.wait(ms, () => {
    game.drawAt(x, y);
    scene.resume({ update: true });
    _success();
  });

  return {
    then(success) {
      _success = success || GWU.NOOP;
    },
  };
}
