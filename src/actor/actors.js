export const kinds = {
  player: {
    id: "Player",
    ch: "@",
    fg: "white",
    bg: -1,
  },

  zombie: {
    id: "Zombie",
    ch: "z",
    fg: "green",
  },
};

export function make(id) {
  const kind = kinds[id];
  if (!kind) throw new Error("Failed to find actor kind - " + id);

  return { x: 1, y: 1, kind };
}
