import { openPopUp } from "./selectName.js";
import { openChat } from "./chat.js";

let App = document.getElementById("app");

document.addEventListener("DOMContentLoaded", function () {
  const nickname = localStorage.getItem("nickname");
console.log(nickname);

  if (nickname && nickname != "") {
    
    openChat(App, nickname);
  } else {
    console.log("ssss");
    openPopUp(App);
  }
});
