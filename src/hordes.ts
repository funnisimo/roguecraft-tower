import { install } from "./horde/make";
import "./actors";

install("ZOMBIE", {
  leader: "zombie",
  members: { zombie: "2-3" },
  frequency: 10,
});
