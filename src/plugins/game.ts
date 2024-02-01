import * as PLUGINS from "../game/plugins";

// NOTE - There really isn't anything special about items yet.
export const game: PLUGINS.Plugin = {
  name: "game",
  game: {},
};
PLUGINS.install(game);
