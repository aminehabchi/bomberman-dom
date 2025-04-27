import http from "http";
import routing from "./routes/Routes.js";
import { Server } from "socket.io";

import { Players } from "./moduls/player.js";

const PORT = 3000;

const server = http.createServer((req, res) => {
  routing(req, res);
});

const io = new Server(server);
import { isValidMove } from "./movement/playerMoving.js";
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a room
  socket.on("join-room", (room) => {
    console.log(room);
    socket.join(room);
  });

  // Listen for message and broadcast to the room
  socket.on("send-message", ({ room, message }) => {
    //send message to All
    console.log("message", message);

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
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
