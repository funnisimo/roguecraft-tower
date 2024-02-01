import * as PLUGINS from "../game/plugins";

// NOTE - There really isn't anything special about items yet.
export const item: PLUGINS.Plugin = {
  name: "item",
  item: {},
};
PLUGINS.install(item);
