import * as PLUGINS from "../game/plugins";

// NOTE - There really isn't anything special about items yet.
export const actor: PLUGINS.Plugin = {
  name: "actor",
  actor: {},
};
PLUGINS.install(actor);
