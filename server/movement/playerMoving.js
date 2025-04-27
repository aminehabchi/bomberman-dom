import { Rooms } from "../moduls/room.js";

/**
 *
 * @param {string} roomUuid - room hash
 */

// const keys = { r: false, l: false, t: false, b: false };

export function isValidMove(roomUuid, moveInfo) {
  let currentRoom = Rooms[roomUuid];

  if (!currentRoom) return false;

  let board = currentRoom.map;

  let keys = moveInfo.keys;
  let playerNbr = moveInfo.playerNbr;

  // console.log(board[1], currentRoom.playerPosition[playerNbr - 1]);

  // current position of player
  let x = currentRoom.playerPosition[playerNbr - 1].x;
  let y = currentRoom.playerPosition[playerNbr - 1].y;

  // check right
  if (keys.r == true) {
    if (board[y][x + 1] == 1) {
      currentRoom.playerPosition[playerNbr - 1].x++;
      currentRoom.map[y][x] = 1;
      currentRoom.map[y][x + 1] = 11;
    } else {
      keys.r = false;
    }
  }

  // check left
  if (keys.l == true) {
    if (board[y][x - 1] == 1) {
      currentRoom.playerPosition[playerNbr - 1].x--;
      currentRoom.map[y][x] = 1;
      currentRoom.map[y][x - 1] = 11;
    } else {
      keys.l = false;
    }
  }

  // check top
  if (keys.t == true) {
    if (board[y - 1][x] == 1) {
      currentRoom.playerPosition[playerNbr - 1].y--;
      currentRoom.map[y][x] = 1;
      currentRoom.map[y - 1][x] = 11;
    } else {
      keys.t = false;
    }
  }

  // check bottom
  if (keys.b == true) {
    if (board[y + 1][x] == 1) {
      currentRoom.playerPosition[playerNbr - 1].y++;
      currentRoom.map[y][x] = 1;
      currentRoom.map[y + 1][x] = 11;
    } else {
      keys.b = false;
    }
  }
  console.log(
    keys,
    currentRoom.map[y],
    currentRoom.playerPosition[playerNbr - 1]
  );

  return moveInfo;
}
