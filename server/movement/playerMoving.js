import { Rooms } from "../moduls/room.js";
const speed = 1;

export function isValidMove(roomUuid, moveInfo) {
  let currentRoom = Rooms[roomUuid];
  if (!currentRoom) return false;

  let board = currentRoom.map;
  let keys = moveInfo.keys;
  let playerNbr = moveInfo.playerNbr;

  let X = currentRoom.playerPosition[playerNbr - 1].x;
  let Y = currentRoom.playerPosition[playerNbr - 1].y;

  //20 is the player size
  let currentleft = moveInfo.position.x / 30;
  let currentrigth = (moveInfo.position.x + 20) / 30;
  let currentup = moveInfo.position.y / 30;
  let currentdow = (moveInfo.position.y + 20) / 30;

  /*******/
  console.log(
    "l ",
    currentleft.toFixed(2),
    "  r ",
    currentrigth.toFixed(2),
    "  u ",
    currentup.toFixed(2),
    "  d ",
    currentdow.toFixed(2),
    "  x ",
    X,
    "  y ",
    Y
  );

  // Move Right
  if (keys.r) {
    if (currentup >= Y && currentdow <= Y + 1) {
      console.log("r inside");

      if (currentrigth >= X + 0.95) {
        if (board[Y][X + 1] === 1) {
          board[Y][X] = 1;
          board[Y][X + 1] = 11;
          currentRoom.playerPosition[playerNbr - 1].x = X + 1;
        } else {
          keys.r = false;
        }
      }

    } else {
      console.log("r outside");
      if (currentrigth >= X + 0.95) {
        keys.r = false;
      }
    }
  }

  // Move Left
  if (keys.l) {
    if (currentup >= Y && currentdow <= Y + 1) {
      console.log("l inside");

      if (currentleft <= X + 0.05) {
        if (board[Y][X - 1] === 1) {
          board[Y][X] = 1;
          board[Y][X - 1] = 11;
          currentRoom.playerPosition[playerNbr - 1].x = X - 1;
        } else {
          keys.l = false;
        }
      }
    } else {
      console.log("l outside");
      if (currentleft <= X + 0.05) {
        keys.l = false;
      }
    }
  }

  // Move Up (Top)
  if (keys.t) {
    if (currentleft >= X && currentrigth <= X + 1) {
      console.log("t inside");
      if (currentup <= Y + 0.05) {
        if (board[Y - 1][X] === 1) {
          board[Y][X] = 1;
          board[Y - 1][X] = 11;
          currentRoom.playerPosition[playerNbr - 1].y = Y - 1;
        } else {
          keys.t = false;
        }
      }
    } else {
      console.log("t outside");
      if (currentup <= Y + 0.05) {
        keys.t = false;
      }
    }
  }

  // Move Down (Bottom)
  if (keys.b) {
    if (currentleft >= X && currentrigth <= X + 1) {
      console.log("d inside");
      if (currentdow >= Y + 0.95) {
        if (board[Y + 1][X] === 1) {
          board[Y][X] = 1;
          board[Y + 1][X] = 11;
          currentRoom.playerPosition[playerNbr - 1].y = Y + 1;
        } else {
          keys.b = false;
        }
      }
    } else {
      console.log("d outside");
      if (currentdow >= Y + 0.95) {
        keys.b = false;
      }
    }
  }


  if (keys.r == true) {
    moveInfo.position.x++
  } else if (keys.l == true) {
    moveInfo.position.x--
  } else if (keys.t == true) {
    moveInfo.position.y--
  } else if (keys.b == true) {
    moveInfo.position.y++
  }
  return moveInfo;
}
