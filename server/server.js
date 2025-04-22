import http from "http";
import routing from "./routes/Routes.js";
import { Server } from "socket.io";

const PORT = 3000;

const server = http.createServer((req, res) => {
  routing(req, res);
});

const io = new Server(server);

// Listen for client connections
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Handle messages from the client
  socket.on("message", (msg) => {
    console.log("Message from client:", msg);

    socket.broadcast.emit("message", msg);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
