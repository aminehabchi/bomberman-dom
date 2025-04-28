export let boardTile = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 22, 0],
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
  [0, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 44, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function random01() {
  return Math.random() < 0.9 ? 0 : 1;
}

function deepClone2DArray(array) {
  return array.map((innerArray) => [...innerArray]);
}

export function prepereBaord(NbrPlayer) {
  let newboardTile = deepClone2DArray(boardTile);

  // for (let i = 0; i < boardTile.length; i++) {
  //   for (let j = 0; j < boardTile[i].length; j++) {
  //     if (boardTile[i][j] == 1) {
  //       if (random01() == 1) {
  //         boardTile[i][j] = 2;
  //       }
  //     }
  //   }
  // }

  // // player 1
  // newboardTile[1][1] = 11; // initial position
  // newboardTile[1][2] = 1;
  // newboardTile[2][1] = 1;

  // if (NbrPlayer > 1) {
  //   // player 2
  //   newboardTile[1][15] = 22;
  //   newboardTile[1][14] = 1;
  //   newboardTile[2][15] = 1;
  // }

  // if (NbrPlayer > 2) {
  //   // player 3
  //   newboardTile[13][1] = 33;
  //   newboardTile[13][2] = 1;
  //   newboardTile[12][1] = 1;
  // }

  // if (NbrPlayer > 3) {
  //   // player 4
  //   newboardTile[13][15] = 44;
  //   newboardTile[13][14] = 1;
  //   newboardTile[12][15] = 1;
  // }

  return newboardTile;
}
