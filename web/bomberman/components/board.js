import { createVElement } from "../../framework/helpers.js";
import { INFO } from "../utils/playerStatus.js";
function Player(nbr) {
  return createVElement(
    "div",
    {
      id: "player" + nbr.toString(),
      class: "player",
      ref: "player" + nbr.toString(),
    },
    []
  );
}

export function board() {
  let boardTile = INFO.room.map;

  console.log(boardTile);

  if (!boardTile) return createVElement("", {}, []);

  let tiles = [];

  for (let i = 0; i < boardTile.length; i++) {
    for (let j = 0; j < boardTile[i].length; j++) {
      if (boardTile[i][j] == 0) {
        tiles.push(createVElement("div", { class: "wall tile" }, []));
      } else if (boardTile[i][j] == 2) {
        tiles.push(createVElement("div", { class: "tile wall2" }, []));
      } else if (
        boardTile[i][j] == 11 ||
        boardTile[i][j] == 22 ||
        boardTile[i][j] == 33 ||
        boardTile[i][j] == 44
      ) {
        tiles.push(createVElement("div", { class: "tile" }, []));
        tiles.push(Player(boardTile[i][j] / 11));
      } else {
        tiles.push(createVElement("div", { class: "tile" }, []));
      }
    }
  }

  tiles.push(createVElement("div", { class: "bomb", ref:"bomb1"}, []));
  return createVElement("div", { class: "grid" }, tiles);
}
