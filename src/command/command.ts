import * as GWU from "gw-utils";
import * as ACTION from "../action";
import { Game } from "../game";
import { Level } from "../level";

/**
 * A command function that will be called with the ui event that it is
 * configured with.
 * @see {keymap}
 */
export type CommandFn = (scene: GWU.app.Scene, e: GWU.app.Event) => void;

/**
 * A set of commands indexed by name.
 */
export type CommandSet = Record<string, CommandFn>;

/**
 * The installed Commands.
 * @todo - Move to CommandFactory class and global instance.
 */
const commandsByName: CommandSet = {};

/**
 * Installs a Command function for use in keymaps.
 * @param name The name that is used to activate the Command.
 * @param fn The function that is called when the Command is activated.
 * @see {keymap}
 */
export function install(name: string, fn: CommandFn) {
  commandsByName[name] = fn;
}

export function installSet(set: CommandSet | CommandSet[]) {
  if (!set) return;
  let arr: CommandSet[] = !Array.isArray(set) ? [set] : set;
  arr.forEach((set) => {
    if (typeof set !== "object") return; // TODO - log warning!
    Object.entries(set).forEach(([key, val]) => {
      install(key, val);
    });
  });
}

/**
 * Finds the installed Command with the given name.
 * @param name The name that the Command was installed with
 * @returns The Command function (if any) that matches the name
 * @see {keymap}
 */
export function get(name: string): CommandFn | null {
  return commandsByName[name] || null;
}

export function makeActionCommand(action: string): CommandFn {
  return (scene: GWU.app.Scene, e: GWU.app.Event) => {
    const actionObj = ACTION.get(action);
    if (!actionObj) throw new Error("Failed to find action: " + action);
    if (!scene.data.level)
      throw new Error(
        "This scene does not have a level so it cannot run an action command: " +
          action
      );
    const level = scene.data.level as Level;

    // @ts-ignore
    actionObj(level, level.game.hero);
  };
}

export function makeTargetedActionCommand(action: string): CommandFn {
  return GWU.NOOP;
}
