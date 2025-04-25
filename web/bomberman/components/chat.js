import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";
import { copy } from "../utils/copyPast.js";
import { getCurrentTime } from "../utils/helpers.js";

function HeaderChat(players) {
  let PlayersVDom = [];

  players?.forEach((p, i) => {
    const name = (i + 1).toString() + "-" + p.Nickname;
    PlayersVDom.push(createVElement("span", {}, [name]));
  });
  return createVElement("div", { class: "topBar" }, PlayersVDom);
}

function Message(nickname, contnet, time) {
  return createVElement("div", { class: "message" }, [
    createVElement("span", { class: "nickname" }, [nickname]),
    createVElement("span", { class: "text" }, [contnet]),
    createVElement("span", { class: "time" }, [time]),
  ]);
}

function MessagePart(messages) {
  let AllMessages = [];
  messages?.forEach((msg) => {
    AllMessages.push(
      Message(msg.sender || "none", msg.content || "none", getCurrentTime())
    );
  });
  return createVElement(
    "div",
    { ref: "messagesBox", class: "messagesBox" },
    AllMessages
  );
}

function InputPart(framework) {
  let input = framework.getRef("inputMessages");

  function SendMessage(message) {
    if (message == "" || message.length > 50) {
      return;
    }

    let socket = framework.getState("socket");

    let msg = {
      sender: framework.getState("nickname"),
      content: message,
    };


    socket.emit("send-message", {

      room: framework.getState("roomUuid"),
      message: msg,
    });
  }

  return createVElement("div", { class: "inputBar" }, [
    createVElement("input", {
      ref: "inputMessages",
      placeholder: "Type a message...",
      id: "chatInput",
      onkeyup: (e) => {
        if (e.key == "Enter") {
          SendMessage(e.target.value);
          e.target.value = "";
        }
      },
    }),
    createVElement(
      "button",
      {
        id: "sendBtn",
        onclick: () => {
          SendMessage(input.value);
          input.value = "";
        },
      },
      ["Send 💬"]
    ),
  ]);
}

function Header(room) {
  console.log(room);

  let copyBtn = createVElement("span", { class: "room" }, ["general room"])
  if (room.IsCreated) {
    copyBtn = createVElement("button", {
      class: "copybtn",
      onclick: () => {
        copy(room.Uuid)
      }
    }, ["Copy Hash"])
  }
  return createVElement("div", { class: "roomHeader" }, [
    createVElement("span", { class: "timer" }, ["00:19"]),
    copyBtn,
  ])
}

export class Chat extends Component {
  getVDom() {
    return createVElement("div", { class: "chatContainer" }, [
      Header(this.framework.getState("room")),
      HeaderChat(this.framework.getState("players")),
      MessagePart(this.framework.getState("messages")),
      InputPart(this.framework),
    ]);
  }
}
