import { board } from "./board.js";
import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";
import { StartGameLoop } from "../gomaloop/playerMovement.js";

var isStarted = false
export class Game extends Component {

    getVDom() {
        if (!isStarted) {
            StartGameLoop(this.framework)
            isStarted = true
        }
        return createVElement("div", { class: "game" },
            [board()]
        );
    }
}
