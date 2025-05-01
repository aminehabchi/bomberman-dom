import { io } from "../server.js";
import { Rooms } from "../moduls/room.js";
export function updateLife(playerNbr, roomUuid) {
  let player = Rooms[roomUuid].Players[playerNbr - 1]
  player.Lives--;

  io.to(roomUuid).emit("lives", { playerNbr: playerNbr, lives: player.Lives });
}
