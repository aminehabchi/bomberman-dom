import { io } from "../server.js";
import { Rooms } from "../moduls/room.js";
import { lose } from "../moduls/player.js";
export function updateLife(playerNbr, roomUuid) {
  let player = Rooms[roomUuid].Players[playerNbr - 1];
  player.Lives--;

  if (player.Lives == 0) {
    lose(player.Uuid)
  }

  io.to(roomUuid).emit("lives", { playerNbr: playerNbr, lives: player.Lives });
}
