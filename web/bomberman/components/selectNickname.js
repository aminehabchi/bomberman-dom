import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";

export class SelectNickname extends Component {
  setNickname = async (nickname) => {
    if (typeof nickname != "string" || nickname == "" || nickname.length > 50) {
      return;
    }

    let res = await fetch(`http://localhost:3000/login?nickname=${nickname}`);

    if (res.status == 200) {
      let data = await res.json();
      localStorage.setItem("uuid", data.uuid);
      this.framework.navigateTo("/chat");
    } else {
      /***** set error ****/
    }
  };

  getVDom() {
    return createVElement("div", { class: "container" }, [
      createVElement("div", { class: "popup" }, [
        createVElement("h1", { class: "title" }, [
          "Ready to Play? Pick a Nickname!",
        ]),
        createVElement(
          "input",
          {
            id: "nicknameInput",
            placeholder: "Enter your alias...",
            onkeyup: (e) => {
              if (e.key == "Enter") this.setNickname(e.target.value);
            },
          },
          []
        ),
        createVElement(
          "button",
          {
            class: "btnNickname",
            onclick: (e) =>
              this.setNickname(document.getElementById("nicknameInput").value),
          },
          ["Let’s Go 🚀"]
        ),
      ]),
    ]);
  }
}
