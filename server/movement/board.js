export let boardTile = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function random01() {
  return Math.random() < 0.4 ? 0 : 1;
}

function deepClone2DArray(array) {
  return array.map((innerArray) => [...innerArray]);
}

export function prepereBaord(NbrPlayer) {
  let newboardTile = deepClone2DArray(boardTile);

  for (let i = 0; i < newboardTile.length; i++) {
    for (let j = 0; j < newboardTile[i].length; j++) {
      if (newboardTile[i][j] == 1) {
        if (random01() == 1) {
          newboardTile[i][j] = 2;
        }
      }
    }
  }

  // player 1
  newboardTile[1][1] = 1; // initial position
  newboardTile[1][2] = 1;
  newboardTile[2][1] = 1;

  if (NbrPlayer > 1) {
    // player 2
    newboardTile[1][15] = 1;
    newboardTile[1][14] = 1;
    newboardTile[2][15] = 1;
  }

  if (NbrPlayer > 2) {
    // player 3
    newboardTile[13][1] = 1;
    newboardTile[13][2] = 1;
    newboardTile[12][1] = 1;
  }

  if (NbrPlayer > 3) {
    // player 4
    newboardTile[13][15] = 1;
    newboardTile[13][14] = 1;
    newboardTile[12][15] = 1;
  }

  return newboardTile;
}

import { Rooms } from "../moduls/room.js";
export function UpdateMap(io, room) {
  let currentRoom = Rooms[room];

  io.to(room).emit("map", currentRoom.map);
}
