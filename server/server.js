import http from "http";
import routing from "./routes/Routes.js";
import { Server } from "socket.io";
import handleBomb from "./bomb/handleBomb.js";

import { Rooms } from "./moduls/room.js";

const PORT = 3000;

const server = http.createServer((req, res) => {
  routing(req, res);
});

async function deleteRoom(io, roomName) {
  try {
    const sockets = await io.in(roomName).fetchSockets();

    for (const socket of sockets) {
      socket.leave(roomName);
    }

    console.log(`Room "${roomName}" has been deleted.`);
  } catch (err) {
    console.error(`Failed to delete room "${roomName}":`, err);
  }
}

export const io = new Server(server);
import { isValidMove } from "./movement/playerMoving.js";
import { UpdateMap } from "./movement/board.js";

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a room
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`${socket.id} left room ${room}`);
  });

  // Listen for message and broadcast to the room
  socket.on("send-message", ({ room, message }) => {
    //send message to All
    io.to(room).emit("message", message);
  });

  // listen for palyers moving
  socket.on("moving", ({ room, moveInfo }) => {
    moveInfo = isValidMove(room, moveInfo);
    //notify all
    io.to(room).emit("moving", moveInfo);
  });

  socket.on("bomb", ({ room, bombInfo }) => {
    let currentRoom = Rooms[room];
    let player = currentRoom.Players[bombInfo.playerNbr - 1];
    if (player.numberbomb > 0) {
      player.numberbomb--;

      handleBomb(room, bombInfo, socket);
      UpdateMap(io, room);
      io.to(room).emit("bomb", bombInfo);
    }

    if (Rooms[room].AlivePlayers <= 1) {
      delete Rooms[room]
      deleteRoom(io, room)
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
