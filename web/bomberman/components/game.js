import { board } from "./board.js";
import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";
import { StartGameLoop, StopGameLoop } from "../gameLoop/playerMovement.js";

export class Game extends Component {
  Mounting() {
    StartGameLoop(this.framework);
  }
  UnMounting() {
    StopGameLoop();
  }
  getVDom() {
    return createVElement("div", { class: "game" }, [
      GameSideBar(this.framework),
      board(this.framework),
      GameStatus(this.framework.getState("isWin")),
    ]);
  }
}

function GameStatus(isWin) {
  if (isWin == undefined) {
    return createVElement("", {}, []);
  }
  let message = "YOU LOSE !!!";
  if (isWin == true) {
    message = "YOU WIN ???";
  }
  return createVElement("div", {class:"win"}, [
    createVElement("div", {class:"winPopUp"}, [
      createVElement("span", {class:"winMessage"}, [message]),
      createVElement("div", { class: "backToHome" }, ["Playe Again"]),
    ]),
  ]);
}

function GameSideBar(framework) {
  let PlayersVDom = [];

  let Players = framework.getState("Players");
  
  Players?.forEach((p, i) => {
    let live = framework.getState("live" + (i + 1).toString());
    PlayersVDom.push(
      createVElement("li", { class: "player_holder" }, [
        p.Nickname,
        live.toString(),
      ])
    );
  });

  return createVElement("div", { class: "sidebar" }, [
    createVElement("div", { class: "title" }, [
      "players",
      createVElement("div", { class: "players_holders" }, [
        createVElement("ul", { class: "players_list_holder" }, PlayersVDom),
      ]),
    ]),
  ]);
}
