import { board } from "./board.js";
import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";



export class Game extends Component {

    getVDom() {
        return createVElement("div", { class: "game" },
            [board()]
        );
    }
}
