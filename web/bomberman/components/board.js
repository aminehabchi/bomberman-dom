import { createVElement } from "../../framework/helpers.js";
import { INFO } from "../utils/playerStatus.js";
function Player() {
  
  return createVElement(
    "div",
    {
      id: "player1",
      class: "player",
      ref: "player1",
    },
    []
  );
}

export function board() {
  let boardTile = INFO.room.map;
  if (!boardTile) return createVElement("", {}, []);

  let tiles = [];

  for (let i = 0; i < boardTile.length; i++) {
    for (let j = 0; j < boardTile[i].length; j++) {
      if (boardTile[i][j] == 0) {
        tiles.push(createVElement("div", { class: "wall tile" }, []));
      } else if (boardTile[i][j] == 2) {
        tiles.push(createVElement("div", { class: "tile wall2" }, []));
      } else if (boardTile[i][j] == 11) {
        tiles.push(createVElement("div", { class: "tile" }, []));
        tiles.push(Player());
      } else {
        tiles.push(createVElement("div", { class: "tile" }, []));
      }
    }
  }

  return createVElement("div", { class: "grid" }, tiles);
}
