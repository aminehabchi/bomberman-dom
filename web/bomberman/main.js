import { Framework } from "../framework/framework.js";
import { Chat } from "./components/chat.js";
import { SelectNickname } from "./components/selectNickname.js";

const app = new Framework();

app.route("/", SelectNickname);

app.route("/chat", Chat);

app.setState({
  nickname: "",
});

app.start();
