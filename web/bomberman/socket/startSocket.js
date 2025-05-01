import { updateInput22 } from "../gameLoop/playerMovement.js";
import { INFO } from "../utils/playerStatus.js";
import { setBomb } from "../gameLoop/bomb.js";

export function startWebSocket(app, roomUuid) {
  console.log("start websocket");

  const socket = io("/", {
    reconnection: true, // default is true
    reconnectionAttempts: 5, // 🔁 max number of tries
    reconnectionDelay: 1000, // 🕐 wait 1 second before retry
    reconnectionDelayMax: 5000, // ⏳ max delay between tries
  }); // Adjust port if needed

  INFO.socket = socket;
  // Join a room
  socket.emit("join-room", roomUuid);

  const uuid = localStorage.getItem("uuid");
  socket.emit("notify", { room: roomUuid, message: { uuid: uuid } });

  socket.on("message", (msg) => {
    let messages = app.getState("messages");
    messages.push(msg);
    app.setState("messages", messages);

    let messagesBox = app.getRef("messagesBox");
    messagesBox?.scrollTo({
      top: messagesBox.scrollHeight,
      behavior: "smooth",
    });
  });

  socket.on("notify", (msg) => {
    let players = app.getState("Players");
    players.push(msg["newPlayer"]);
    app.setState("Players", players);
  });

  socket.on("moving", (moveInfo) => {
    updateInput22(moveInfo);
  });

  socket.on("bomb", (bombInfo) => {
    setBomb(bombInfo)
  });

  socket.on("map", (map) => {
    console.log("---------new map seted-----------");

    app.setState("map", map)
  });
}
