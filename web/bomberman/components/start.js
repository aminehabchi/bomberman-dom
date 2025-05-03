import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";
import { StartGetRoom } from "../utils/playerStatus.js";
import { paste } from "../utils/copyPast.js";

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
    "span",
    {
      class: "createBtn",
      onclick: () => {
        // return;
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

function instructions() {
  return createVElement("div", {class: "instructions-container"}, [
    createVElement("h2", {class: "instructions-title"}, ["HOW TO PLAY"]),
    createVElement("div", {class: "instructions-content"}, [
      createVElement("div", {class: "instruction-group"}, [
        createVElement("div", {class: "instruction-label"}, ["MOVEMENT:"]),
        createVElement("div", {class: "key-container"}, [
          createVElement("div", {class: "arrow-keys"}, [
            createVElement("div", {class: "arrow-key up"}, ["↑"]),
            createVElement("div", {class: "arrow-row"}, [
              createVElement("div", {class: "arrow-key left"}, ["←"]),
              createVElement("div", {class: "arrow-key down"}, ["↓"]),
              createVElement("div", {class: "arrow-key right"}, ["→"])
            ])
          ])
        ])
      ]),
      createVElement("div", {class: "instruction-group"}, [
        createVElement("div", {class: "instruction-label"}, ["PLACE BOMB:"]),
        createVElement("div", {class: "key-container"}, [
          createVElement("div", {class: "action-key"}, [
            createVElement("span", {class: "key-letter"}, ["X"]),
            createVElement("span", {class: "bomb-icon"}, ["💣"])
          ])
        ])
      ]),
      createVElement("div", {class: "instruction-group abilities-group"}, [
        createVElement("div", {class: "instruction-label"}, ["POWER-UPS:"]),
        createVElement("div", {class: "abilities-container"}, [
          createVElement("div", {class: "ability-item"}, [
            createVElement("div", {class: "ability-icon bomb-ability"}, ["💣"]),
            createVElement("div", {class: "ability-desc"}, ["Bombs: +1 bomb capacity"])
          ]),
          createVElement("div", {class: "ability-item"}, [
            createVElement("div", {class: "ability-icon flame-ability"}, ["🔥"]),
            createVElement("div", {class: "ability-desc"}, ["Flames: +1 explosion range"])
          ]),
          createVElement("div", {class: "ability-item"}, [
            createVElement("div", {class: "ability-icon speed-ability"}, ["⚡"]),
            createVElement("div", {class: "ability-desc"}, ["Speed: Faster movement"])
          ])
        ])
      ])
    ])
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
      instructions(),
    ]);
  }
}
