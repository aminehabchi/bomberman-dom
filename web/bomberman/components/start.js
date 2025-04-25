import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";
import { StartGetRoom } from "../utils/jionRoom.js";
import { copy, paste } from "../utils/copyPast.js";

function Header() {
  return createVElement("div", { class: "header" }, [
    createVElement("span", { class: "title" }, ["BomberMan"]),
  ]);
}

function JoinRandomRoom(app) {
  return createVElement(
    "div",
    {
      class: "joinRBtn",
      onclick: () => {
        StartGetRoom(app, "RR");
      },
    },
    ["Join Random Room"]
  );
}

function CreateRoom(app) {
  return createVElement(
    "div",
    {
      class: "createBtn",
      onclick: () => {
        StartGetRoom(app, "CR");
      },
    },
    ["Create Room"]
  );
}

function JoinRoom(framework) {
  return createVElement(
    "div",
    {
      class: "joinBtn",
      onclick: () => {
        framework.setState("isOpen", true);
      },
    },
    ["Join Room"]
  );
}

function JoinRoomPopUp(framework) {
  if (!framework.getState("isOpen")) {
    return createVElement("", {}, []);
  }

  return createVElement("div", { class: "container2" }, [
    createVElement("div", { class: "popup2" }, [
      createVElement(
        "span",
        {
          class: "x",
          onclick: () => {
            framework.setState("isOpen", false);
          },
        },
        ["X"]
      ),
      createVElement("h1", { class: "title2" }, [
        "Type the Room Hash to Jump In!",
      ]),
      createVElement("div", { class: "inpt" }, [
        createVElement(
          "input",
          {
            ref: "JoinRInput",
            onkeyup: (e) => {
              if (e.key == "Enter") {
                StartGetRoom(
                  framework,
                  "JR",
                  framework.getRef("JoinRInput").value
                );
              }
            },
            placeholder: "Paste your room code here",
          },
          []
        ),
        createVElement(
          "span",
          {
            class: "paste",
            type: "text",
            onclick: async () => {
              framework.getRef("JoinRInput").value += await paste();
            },
          },
          ["paste"]
        ),
      ]),

      createVElement(
        "button",
        {
          class: "joinBtn",
          onclick: () => {
            StartGetRoom(framework, "JR", framework.getRef("JoinRInput").value);
          },
        },
        ["Boom In 🔓"]
      ),
    ]),
  ]);
}

export class Start extends Component {
  getVDom() {
    return createVElement("div", { class: "startbox" }, [
      Header(),
      JoinRandomRoom(this.framework),
      CreateRoom(this.framework),
      JoinRoom(this.framework),
      JoinRoomPopUp(this.framework),
    ]);
  }
}
