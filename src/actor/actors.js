export const kinds = {
  player: {
    id: "Player",
    ch: "@",
    fg: "white",
    bg: -1,
    moveSpeed: 100,
  },

  zombie: {
    id: "Zombie",
    ch: "z",
    fg: "green",
    moveSpeed: 100,
  },
};

export function make(id) {
  const kind = kinds[id];
  if (!kind) throw new Error("Failed to find actor kind - " + id);

  return { x: 1, y: 1, kind };
}
