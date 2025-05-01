import http from "http";
import routing from "./routes/Routes.js";
import { Server } from "socket.io";
import { Players } from "./moduls/player.js";
import handleBomb from "./bomb/handleBomb.js";

const PORT = 3000;

const server = http.createServer((req, res) => {
  routing(req, res);
});

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

  // listen for new players
  socket.on("notify", ({ room, message }) => {
    //notify all except self
    socket.to(room).emit("notify", { newPlayer: Players[message["uuid"]] });
  });

  // listen for palyers moving
  socket.on("moving", ({ room, moveInfo }) => {
    moveInfo = isValidMove(room, moveInfo);
    //notify all
    io.to(room).emit("moving", moveInfo);
  });

  socket.on("bomb", ({ room, bombInfo }) => {
    handleBomb(room, bombInfo, socket);
    UpdateMap(io, room);
    io.to(room).emit("bomb", bombInfo);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
