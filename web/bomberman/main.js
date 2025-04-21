import { Framework } from "../framework/framework.js";
import { SelectNickname } from "./components/selectNickname.js";

const app = new Framework();

app.route("/", SelectNickname);

app.start();