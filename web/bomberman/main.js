import { Framework } from "../framework/framework.js";
import { Chat } from "./components/chat.js";
import { SelectNickname } from "./components/selectNickname.js";
import { Game } from "./components/game.js";
const app = new Framework();

app.route("/", SelectNickname);
app.route("/game", Game);
app.route("/chat", Chat);

app.setState("nickname", "a");
app.setState("messages", []);
app.setState("socket", undefined);

app.start();
