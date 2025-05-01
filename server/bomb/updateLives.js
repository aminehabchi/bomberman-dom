import { io } from "../server.js";
import { Rooms } from "../moduls/room.js";
export function updateLife(playerNbr, roomUuid) {
  let player = Rooms[roomUuid].Players[playerNbr - 1];
  player.Lives--;

  if (player.Lives == 0) {
    Rooms[roomUuid].Players[playerNbr - 1].JoinedRoom = "";
    Rooms[roomUuid].Players[playerNbr - 1] = "";
  }

  io.to(roomUuid).emit("lives", { playerNbr: playerNbr, lives: player.Lives });
}
