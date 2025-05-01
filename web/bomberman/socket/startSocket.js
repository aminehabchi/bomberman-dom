import { updateInput22 } from "../gameLoop/playerMovement.js";
import { INFO } from "../utils/playerStatus.js";
import { setBomb } from "../gameLoop/bomb.js";

export function startWebSocket(app, roomUuid) {
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
    console.log(players);
    
  });

  socket.on("moving", (moveInfo) => {
    updateInput22(moveInfo);
  });

  socket.on("bomb", (bombInfo) => {
    setBomb(bombInfo);
  });

  socket.on("map", (map) => {
    app.setState("map", map);
  });

  socket.on("timer", (timer) => {
    console.log(timer);
    app.setState("timer", timer.timer);
    if (timer.timer == 0) {
      setTimeout(() => {
        app.navigateTo("/game");
      }, 1500);
    }
  });

  socket.on("lives", (Info) => {
    if (Info.lives == 0) {
      app.setState("isWin", false);
    }

    app.setState("live" + Info.playerNbr.toString(), Info.lives);
  });

  socket.on("winStatus", (status) => {
    app.setState("isWin", true);
  });
}
