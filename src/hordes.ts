import { install } from "./horde/make";
import "./actors";

install("ZOMBIE", {
  leader: "ZOMBIE",
  members: { ZOMBIE: "2-3" },
  frequency: 10,
});

install("ZOMBIE2", {
  leader: "ARMOR_ZOMBIE",
  members: { ZOMBIE: "2-3" },
  frequency: (l) => l + 5,
});

install("ZOMBIE3", {
  leader: "ARMOR_ZOMBIE_2",
  members: { ARMOR_ZOMBIE: "1-2", ZOMBIE: "1-3" },
  frequency: (l) => 2 * l,
});

install("SKELETON", {
  leader: "SKELETON",
  members: { SKELETON: "2-3" },
  frequency: 100,
});
