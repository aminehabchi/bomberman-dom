import { createPlayer } from "../moduls/player.js";
import { isValidNickname } from "../service/login.js";

function loginHandler(req, res) {
  const fullUrl = new URL(req.url, `http://${req.headers.host}`);
  const params = fullUrl.searchParams;
  const nickname = params.get("nickname");

  if (isValidNickname(nickname)) {
    res.statusCode = 200;
    const uuid = createPlayer(nickname);
    res.end(JSON.stringify({ uuid: uuid }));
  } else {
    res.statusCode = 400;
    res.end();
  }
}

export default loginHandler;
 

 