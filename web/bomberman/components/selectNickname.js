import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";

export class SelectNickname extends Component {

    setNickname(nickname) {
        console.log(nickname);
    }

    render() {
        return createVElement("div", { class: "container" }, [
            createVElement("div", { class: "popup" }, [
                createVElement("h1", { class: "title" }, ["Ready to Play? Pick a Nickname!"]),
                createVElement("input", {
                    class: "nicknameInput",
                    placeholder: "Enter your alias...",
                    onkeyup: (e) => { if (e.key == "Enter") this.setNickname(e.target.value) }
                }, []),
                createVElement("button", {}, ["Let’s Go 🚀"])
            ])
        ])
    }
}