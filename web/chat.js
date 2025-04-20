import { chat } from "./component.js";

let socket;
let NICKNAME;
let boxMessages = document.getElementById("MessgesBox");
function displayMessage(type, message) {
  boxMessages = document.getElementById("MessgesBox");
  let Messagediv = document.createElement("div");
  Messagediv.className = type;
  Messagediv.innerHTML = `<span class="nickname">${message.name}</span>
                  <span class="time">${getCurrentTime()}</span>
                  <p class="message">${message.message}</p>`;
  boxMessages.appendChild(Messagediv);
}

function sendMessage(e) {
  let inputContent = document.getElementById("input").value.trim();
  if (inputContent != "") {
    let message = { name: NICKNAME, message: inputContent };
    // Send a message to the server
    socket.emit("message", message);
    displayMessage("me", message);
    document.getElementById("input").value = "";
    boxMessages.scrollTo({
      top: boxMessages.scrollHeight,
      behavior: "smooth",
    });
  }
}

function getCurrentTime() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}

function startSocket() {
  socket = io("http://localhost:3000");

  socket.on("message", (data) => {
    console.log(data);

    if (data?.name != NICKNAME) {
      displayMessage("other", data);
      boxMessages.scrollTo({
        top: boxMessages.scrollHeight,
        behavior: "smooth",
      });
      //console.log("Received from server:", data);
    }
  });
}

export function openChat(App, name) {
  NICKNAME = name;
  App.innerHTML = chat;
  let input = document.getElementById("input");
  let button = document.getElementById("send");
  console.log(button);

  input.onkeyup = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };
  button.onclick = sendMessage;
  startSocket();
}
