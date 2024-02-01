import * as PLUGINS from "../game/plugins";

// NOTE - There really isn't anything special about items yet.
export const core: PLUGINS.Plugin = {
  name: "core",
  plugins: ["turn_based", "item", "actor", "hero", "game", "level"],
};
PLUGINS.install(core);
