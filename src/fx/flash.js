export function flash(game, x, y, color = "white", ms = 300) {
  const scene = game.scene;
  const map = game.map;

  scene.pause({ update: true });

  scene.buffer.draw(x, y, null, null, color);

  let _success = GWU.NOOP;
  let _fail = GWU.NOOP;

  scene.wait(ms, () => {
    scene.buffer.blackOut(x, y);
    const tile = map.tileAt(x, y);
    scene.buffer.drawSprite(x, y, tile);

    game.actors.forEach((a) => {
      if (a.x == x && a.y == y) {
        scene.buffer.drawSprite(x, y, a.kind);
      }
    });

    scene.resume({ update: true });
    _success();
  });

  return {
    then(success) {
      _success = success || GWU.NOOP;
    },
  };
}
