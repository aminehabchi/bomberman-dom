import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";
import { copy } from "../utils/copyPast.js";
import { getCurrentTime } from "../utils/helpers.js";
import { startWebSocket } from "../socket/startSocket.js";
import { INFO } from "../utils/playerStatus.js";

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

    let socket = INFO.socket;

    let msg = {
      sender: INFO.nickname,
      content: message,
    };

    socket.emit("send-message", {
      room: INFO.roomUuid,
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

function Header(framework) {
  let copyBtn = createVElement("span", { class: "room" }, ["general room"]);
  if (INFO.room.IsCreated) {
    copyBtn = createVElement(
      "button",
      {
        class: "copybtn",
        onclick: () => {
          copy(INFO.room.Uuid);
        },
      },
      ["Copy Hash"]
    );
  }
  return createVElement("div", { class: "roomHeader" }, [
    createVElement("span", { class: "timer" }, ["00:19"]),
    copyBtn,
    createVElement(
      "span",
      {
        onclick: () => {
          framework.navigateTo("/game");
        },
      },
      ["Game"]
    ),
  ]);
}

export class Chat extends Component {
  Mounting() {
    startWebSocket(this.framework, INFO.roomUuid);
  }
  getVDom() {
    return createVElement("div", { class: "chatContainer" }, [
      Header(this.framework),
      HeaderChat(this.framework.getState("Players")),
      MessagePart(this.framework.getState("messages")),
      InputPart(this.framework),
    ]);
  }
}
