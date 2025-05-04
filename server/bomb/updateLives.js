import { io } from "../server.js";
import { Rooms } from "../moduls/room.js";
import { Players } from "../moduls/player.js";
export function updateLife(playerNbr, roomUuid) {
  let player = Rooms[roomUuid].Players[playerNbr - 1];
  player.Lives--;
  if (player.Lives <= 0) {
    Players[player.Uuid].JoinedRoom = ''
    console.log(player);

    Rooms[roomUuid].DeadPlayers.push(player);
    let deadplayernbr = Rooms[roomUuid].DeadPlayers.length;
    let nbPlayer = Rooms[roomUuid].Players.length;
    if (deadplayernbr == nbPlayer - 1) {
      // Valeurs dans `a` mais pas dans `b`
      const diffA = Rooms[roomUuid].DeadPlayers.filter(
        (x) => !Rooms[roomUuid].Players.includes(x)
      ); // [1, 3]
      // Valeurs dans `b` mais pas dans `a`
      const diffB = Rooms[roomUuid].Players.filter(
        (x) => !Rooms[roomUuid].DeadPlayers.includes(x)
      ); // [5]
      // Valeurs différentes dans les deux (non partagées)
      const winner = [...diffA, ...diffB]; // [1, 3, 5]
      if (winner) {
        Rooms[roomUuid].Players.forEach(p => {
          Players[p.Uuid].JoinedRoom = ''
        });
        io.to(roomUuid).emit("lives", { winner: winner, win: true });
      }
    }
  }
  if (player) {
    io.to(roomUuid).emit("lives", {
      playerNbr: playerNbr,
      lives: player.Lives,
    });
  }
}
