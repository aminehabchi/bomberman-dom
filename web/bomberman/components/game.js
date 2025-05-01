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
    return createVElement("div", { class: "game" }, [board(this.framework)]);
  }
}
