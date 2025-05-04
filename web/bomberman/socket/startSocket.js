import { updateInput22 } from "../gameLoop/playerMovement.js";
import { INFO } from "../utils/playerStatus.js";
import { setBomb } from "../gameLoop/bomb.js";
import { StopGameLoop } from "../gameLoop/playerMovement.js";

export function startWebSocket(app, roomUuid) {
  console.log("START WEBSOCKET");

  const socket = io("/", {
    reconnection: false,
  });

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

  socket.on("notify", (data) => {
    INFO.Players = data.Players;
    app.setState("Players", data.Players);
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
    app.setState("timer", timer.timer);
    if (timer.timer == 0) {
      setTimeout(() => {
        app.navigateTo("/game");
      }, 1500);
    }
  });
  socket.on("explode", (data) => {
    app.setState("explosionCords", data);
  });

  socket.on("lives", (Info) => {
    if (Info.win == true) {
      const uuid = localStorage.getItem("uuid");
      if (uuid == Info.Uuid) {
        console.log("wiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiin");
        app.setState("isWin", true);
      }
      StopGameLoop();
      return;
    }
    if (Info.lives <= 0 && INFO.playerNbr == Info.playerNbr) {

      StopGameLoop();
      console.log("looooooooooooooooooooooooooooooooooooooose");

      app.setState("isWin", false);
      return;
    }

    app.setState("live" + Info?.playerNbr.toString(), Info.lives);
  });

  socket.on("winStatus", (status) => {
    app.setState("isWin", status.status);
  });
}

export function leaveRoom(socket, roomUuid) {
  socket.emit("leaveRoom", roomUuid);
}
