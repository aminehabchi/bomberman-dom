import { createVElement } from "../../framework/helpers.js";

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
  let boardTile = framework.getState("map");

  console.log(boardTile);

  if (!boardTile) return createVElement("", {}, []);

  let tiles = [];

  for (let i = 0; i < boardTile.length; i++) {
    for (let j = 0; j < boardTile[i].length; j++) {
      const cell = boardTile[i][j];
      if (cell == 11 || cell == 22 || cell == 33 || cell == 44) {
        tiles.push(createVElement("div", { class: "tile" }, []));
      } else {
        tiles.push(chooseItems(cell));
      }
    }
  }
  let playerNbr = framework.getState("Players")?.length || 0;
  console.log(playerNbr);

  if (playerNbr > 0) {
    tiles.push(chooseItems(11));
  }
  if (playerNbr > 1) {
    tiles.push(chooseItems(22));
  }
  if (playerNbr > 2) {
    tiles.push(chooseItems(33));
  }
  if (playerNbr > 3) {
    tiles.push(chooseItems(44));
  }

  return createVElement("div", { class: "grid" }, tiles);
}

function chooseItems(cell) {
  switch (cell) {
    case 0:
      return createVElement("div", { class: "tile wall" }, []);
    case 1:
      return createVElement("div", { class: "tile" }, []);
    case 2:
      return createVElement("div", { class: "tile wall2" }, []);
    case 11:
    case 22:
    case 33:
    case 44:
      return Player(cell / 11);
    case 5:
      console.log("bomb");

      return createVElement("div", { class: "tile bomb" }, []);
    case 6:
      return createVElement("div", { class: "tile Power Speed" }, []);
    case 7:
      return createVElement("div", { class: "tile Power Flame" }, []);
    case 8:
      return createVElement("div", { class: "tile Power Flame" }, []);
  }

  return createVElement("", {}, []);
}
