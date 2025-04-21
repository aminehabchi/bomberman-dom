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

function MessagePart() {
  return createVElement("div", { class: "messagesBox" }, [
    Message("me", "helloo", "amine"),
    Message("other", "hellodso", "amine1"),
  ]);
}

function InputPart() {
  return createVElement("div", { class: "inputBox" }, [
    createVElement(
      "input",
      {
        id: "messageInput",
        placeholder: "send Message...",
      },
      []
    ),
    createVElement("button", {}, ["send"]),
  ]);
}

export class Chat extends Component {
  getVDom() {
    return createVElement("div", { class: "box" }, [
      HeaderChat("amine", 2, 17),
      MessagePart(),
      InputPart(),
    ]);
  }
}
