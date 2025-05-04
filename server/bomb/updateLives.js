import { io } from "../server.js";
import { Rooms } from "../moduls/room.js";
import { Players } from "../moduls/player.js";

export function updateLife(playerNbr, roomUuid) {

  let player = Rooms[roomUuid].Players[playerNbr - 1];

  player.Lives--;
  if (player.Lives < 0) {
    return
  }
  if (player) {
    io.to(roomUuid).emit("lives", {
      playerNbr: playerNbr,
      lives: player.Lives,
    });
  }

  if (player.Lives == 0) {
    Rooms[roomUuid].AlivePlayers--
    Players[player.Uuid].JoinedRoom = ''
  }

  if (Rooms[roomUuid].AlivePlayers <= 1) {
    let winnerPlayer = Rooms[roomUuid].Players.find(
      p => Players[p.Uuid].JoinedRoom !== ''
    );
    if (!winnerPlayer) return;
    Players[winnerPlayer.Uuid].JoinedRoom = ''
    io.to(roomUuid).emit("lives", { win: true, Uuid: winnerPlayer.Uuid });
  }
}



