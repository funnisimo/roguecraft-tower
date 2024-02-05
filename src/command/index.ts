/**
 * @module Command
 * Commands are the functions that get called when you press a key in the game.
 * They are installed during startup and will be referenced via keymaps.
 * A command will receive the current Scene and the key Event that is launching it.
 * A command should execute immediately and setup whatever it needs to do.
 * @see {keymap}
 */

export * from "./command";
export * from "./core";
