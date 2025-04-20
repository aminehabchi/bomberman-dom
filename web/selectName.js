import { openChat } from "./chat.js";
import { popUp } from "./component.js";
async function setname(name) {
  let res = await fetch(`http://localhost:3000/setname?name=${name}`);
  return res.status;
}

async function chooseName() {
  let input = document.getElementById("input");
  let name = input.value;
  
  
  /*  check name */
  let status = await setname(name);
  console.log(status);
  
  if (status != 200) {
    document.getElementById("err").textContent = "name already exist";
    return;
  }
  localStorage.setItem("nickname", name);

  openChat(document.getElementById("app"), name);
}

export function openPopUp(App) {
  App.innerHTML = popUp;
  document.getElementById("btn").onclick = chooseName;
}
