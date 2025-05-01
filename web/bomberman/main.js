import { Framework } from "../framework/framework.js";
import { Chat } from "./components/chat.js";
import { SelectNickname } from "./components/selectNickname.js";
import { Game } from "./components/game.js";
import { Start } from "./components/start.js";
import { checkIfLogin } from "./utils/playerStatus.js";

export const app = new Framework({
  messages: [],
  players: undefined,
  live1: "3",
  live2: "3",
  live3: "3",
  live4: "3",

});

app.route("/", SelectNickname);
app.route("/game", Game);
app.route("/chat", Chat);
app.route("/start", Start);

await checkIfLogin(app);

console.log("app.start() ");
app.start();
