import { io } from "../server.js";

export function updateLife(player, roomUuid) {
  player.Lives--;
  if (player.Lives == 0) {

    }
}
