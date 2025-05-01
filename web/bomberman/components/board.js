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

export function board(framework) {
  let boardTile = framework.getState("map")

  console.log(boardTile);

  if (!boardTile) return createVElement("", {}, []);

  let tiles = [];

  for (let i = 0; i < boardTile.length; i++) {
    for (let j = 0; j < boardTile[i].length; j++) {
      const cell = boardTile[i][j];
      tiles.push(chooseItems(cell))
      if (cell == 11 || cell == 22 || cell == 33 || cell == 44) {
        tiles.push(createVElement("div", { class: "tile" }, []))
      }
    }
  }


  return createVElement("div", { class: "grid" }, tiles);
}


function chooseItems(cell) {
  switch (cell) {
    case 0:
      return (createVElement("div", { class: "tile wall" }, []));

    case 1:
      return (createVElement("div", { class: "tile" }, []));

    case 2:
      return (createVElement("div", { class: "tile wall2" }, []));
    case 11:
    case 22:
    case 33:
    case 44:
      return Player(cell / 11)
    case 5:
      return createVElement("div", { class: "tile power bomb" }, [])
    case 6:
      return createVElement("div", { class: "tile power speed" }, [])
    case 7:
      return createVElement("div", { class: "tile power flame" }, [])

  }

  return createVElement("", {}, [])
}