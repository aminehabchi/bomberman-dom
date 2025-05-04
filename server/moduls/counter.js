import { io } from "../server.js";
import { Rooms } from "./room.js";
export async function start20Timer(roomUuid) {
  let currentRoom = Rooms[roomUuid];

  if (currentRoom.Players.length < 2) {
    return;
  }

  let timer = 0;
  let id;
  function counter() {
    let currentRoom = Rooms[roomUuid];

    timer++;
    io.to(roomUuid).emit("timer", { timer });
    if (currentRoom.Players.length == 4 || timer == 20) {
      clearTimeout(id);
      start10Timer(roomUuid);
      return;
    }
    setTimeout(counter, 1000);
  }

  id = setTimeout(counter, 1000);
}

async function start10Timer(roomUuid) {
  let timer = 10 + 1;
  let id;

  function counter() {
    timer--;
    if (timer == 0) {
      clearTimeout(id);
      Rooms[roomUuid].IsStart = true;
      Rooms[roomUuid].AlivePlayers = Rooms[roomUuid].Players.length
    }

    io.to(roomUuid).emit("timer", { timer });

    if (timer != 0) {
      setTimeout(counter, 1000);
    }
  }

  id = setTimeout(counter, 1000);
}
