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

function checkIfInexplosionRange(framework, y, x) {
  let explosionCords = framework.getState("explosionCords");
  if (explosionCords) {
    for (let i = 0; i < explosionCords?.length; i++) {
      let pos = explosionCords[i];
      if (pos.x == x && pos.y == y) {
        return true;
      }
    }
  }
  return false;
}


export function board(framework) {
  let boardTile = framework.getState("map");

  if (!boardTile) return createVElement("", {}, []);

  let tiles = [];

  for (let i = 0; i < boardTile.length; i++) {
    for (let j = 0; j < boardTile[i].length; j++) {
      tiles.push(chooseItems(framework, boardTile[i][j], i, j));
    }
  }
  let playerNbr = framework.getState("Players")?.length || 0;

  if (playerNbr > 0) {
    tiles.push(chooseItems(framework, 11));
  }
  if (playerNbr > 1) {
    tiles.push(chooseItems(framework, 22));
  }
  if (playerNbr > 2) {
    tiles.push(chooseItems(framework, 33));
  }
  if (playerNbr > 3) {
    tiles.push(chooseItems(framework, 44));
  }

  setTimeout(() => {
    framework.setState("explosionCords", []);
  }, 2000);

  return createVElement("div", { class: "grid" }, tiles);
}

function chooseItems(framework, cell, y, x) {
  let tile = createVElement("", {}, []);
  switch (cell) {
    case 0:
      tile = createVElement("div", { class: "tile wall" }, []);
      break;
    case 1:
      tile = createVElement("div", { class: "tile" }, []);
      break;
    case 2:
      tile = createVElement("div", { class: "tile wall2" }, []);
      break;
    case 11:
    case 22:
    case 33:
    case 44:
      return Player(cell / 11);
    case 5:
      tile = createVElement("div", { class: "tile bomb" }, []);
      break;
    case 6:
      tile = createVElement("div", { class: "tile Power Speed" }, []);
      break;
    case 7:
      tile = createVElement("div", { class: "tile Power Flame" }, []);
      break;
    case 8:
      tile = createVElement("div", { class: "tile Power Bomb" }, []);
      break;
  }
  if (checkIfInexplosionRange(framework, y, x) == true) {
    if (tile) {
      tile.props["class"] = tile.props["class"] + " fire";
    }
  }

  return tile;
}
