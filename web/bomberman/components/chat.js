import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";
import { getCurrentTime } from "../utils/helpers.js";

function HeaderChat(nickname, PlayerNbr, timer) {
  return createVElement("div", { class: "headerchat" }, [
    createVElement("span", { class: "nickname" }, [nickname]),
    createVElement("span", { class: "PlayerNbr" }, [PlayerNbr]),
    createVElement("span", { class: "timer" }, [timer]),
  ]);
}

function Message(type, content, sender) {
  return createVElement("div", { class: type }, [
    createVElement("span", { class: "name" }, [sender]),
    createVElement("span", { class: "time" }, [getCurrentTime()]),
    createVElement("span", { class: "content" }, [content]),
  ]);
}

function MessagePart(msgs) {
  let Allmessages = [];

  msgs?.forEach((msg) => {
    Allmessages.push(Message("me", msg.content, msg.sender));
  });

  return createVElement("div", { class: "messagesBox" }, Allmessages);
}

function InputPart(socket) {
  function SendMessages(message) {
    if (!message || message == "") {
      return;
    }
    socket.emit("message", { content: message, sender: "amine" });
  }

  return createVElement("div", { class: "inputBox" }, [
    createVElement(
      "input",
      {
        id: "messageInput",
        onkeyup: (e) => {
          if (e.key == "Enter") {
            SendMessages(e.target.value);
          }
        },
        placeholder: "send Message...",
      },
      []
    ),
    createVElement("button", {}, ["send"]),
  ]);
}

export class Chat extends Component {
  startSocket(RoomUuid) {
    const socket = io();

    socket.on("connect", () => {
      console.log("Connected with ID:", socket.id);
    });

    socket.on("message", (msg) => {
      console.log("Received from server:", msg);

      let messages = this.framework.getState("messages");
      messages.push(msg);
      
      this.framework.setState("messages", messages);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return socket;
  }

  getVDom() {
    let socket = this.framework.getState("socket");
    if (!socket) {
      this.framework.setState("socket", this.startSocket());
    }

    return createVElement("div", { class: "box" }, [
      HeaderChat("amine", 2, 17),
      MessagePart(this.framework.getState("messages")),
      InputPart(socket),
    ]);
  }
}
