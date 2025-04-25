export function startWebSocket(app, roomUuid) {
  const socket = io("http://localhost:3000", {
    reconnection: true, // default is true
    reconnectionAttempts: 5, // 🔁 max number of tries
    reconnectionDelay: 1000, // 🕐 wait 1 second before retry
    reconnectionDelayMax: 5000, // ⏳ max delay between tries
  }); // Adjust port if needed
  app.setState("socket", socket);

  const room = roomUuid;
  app.setState("room", room);
  // Join a room
  socket.emit("join-room", room);

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
    let players = app.getState("players");
    players.push(msg["newPlayer"]);
    app.setState("players", players);
  });
}
