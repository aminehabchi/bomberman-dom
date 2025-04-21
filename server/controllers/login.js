import { checkIfPlayerExist, setNewPlayer } from "../moduls/AllPlayers.js";
import { generateUUID } from "../service/uuid.js";

function loginHandler(req, res) {
  const fullUrl = new URL(req.url, `http://${req.headers.host}`);
  const params = fullUrl.searchParams;
  const nickname = params.get("nickname");

  if (!checkIfPlayerExist(nickname)) {
    const uuid = generateUUID();
    setNewPlayer(nickname, uuid);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ uuid: uuid }));
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "The player's nickname is Tekan." }));
  }
}

export default loginHandler;
