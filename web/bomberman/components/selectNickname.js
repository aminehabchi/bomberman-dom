import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";
import { startWebSocket } from "../socket/startSocket.js";

export class SelectNickname extends Component {
  setNickname = async (nickname) => {
    if (
      typeof nickname !== "string" ||
      nickname.trim() === "" ||
      nickname.length > 50
    ) {
      this.showError("Invalid nickname. Please use 1–50 characters.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/login?nickname=${nickname}`
      );

      if (res.ok) {
        const data = await res.json();

        localStorage.setItem("uuid", data.uuid);

        this.framework.setState("nickname", nickname);

        this.framework.navigateTo("/start");
      } else {
        // const errorMsg = await res.text();
        // this.showError(`Login failed: ${errorMsg || "Server error."}`);
      }
    } catch (err) {
      // this.showError("Could not connect to server. Please try again later.");
      console.log(err);
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
