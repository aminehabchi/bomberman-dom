import { Rooms } from "../moduls/room.js";
const speed = 1;

function getDecimalPart(num) {
  return num - Math.floor(num);
}

export function isValidMove(roomUuid, moveInfo) {
  let currentRoom = Rooms[roomUuid];
  if (!currentRoom) return false;

  let board = currentRoom.map;
  let keys = moveInfo.keys;
  let playerNbr = moveInfo.playerNbr;

  let currentX = currentRoom.playerPosition[playerNbr - 1].x;
  let currentY = currentRoom.playerPosition[playerNbr - 1].y;

  let currentleft = moveInfo.position.x / 30;
  let currentrigth = (moveInfo.position.x + 20) / 30;
  let currentup = moveInfo.position.x / 30;
  let currentdow = (moveInfo.position.x + 20) / 30;

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
    currentX,
    "  y ",
    currentY
  );

  // Move Right
  if (keys.r) {
    //-10 is diff oneSquare - playerSize
    let newTileX = (moveInfo.position.x - 10 + speed) / 30;
    //    console.log("r", newTileX, moveInfo.position.x);

    if (newTileX > currentX) {
      if (board[currentY][currentX + 1] === 1) {
        board[currentY][currentX] = 1;
        board[currentY][currentX + 1] = 11;
        currentRoom.playerPosition[playerNbr - 1].x = currentX + 1;
      } else {
        keys.r = false;
      }
    }
  }

  // Move Left
  if (keys.l) {
    let newTileX = (moveInfo.position.x - speed) / 30;
    //console.log("r", newTileX, moveInfo.position.x);

    if (newTileX < currentX) {
      if (board[currentY][currentX - 1] === 1) {
        board[currentY][currentX] = 1;
        board[currentY][currentX - 1] = 11;
        currentRoom.playerPosition[playerNbr - 1].x = currentX - 1;
      } else {
        keys.l = false;
      }
    }
  }

  // Move Up (Top)
  if (keys.t) {
    let newTileY = Math.floor((moveInfo.position.y - speed) / 30);

    // let xleft = (moveInfo.position.x - speed) / 30;
    // let xRigth = (moveInfo.position.x - 10 + speed) / 30;

    // console.log("top ", xleft.toFixed(2), xRigth.toFixed(2), newTileY);

    if (newTileY < currentY) {
      if (board[currentY - 1][currentX] === 1) {
        board[currentY][currentX] = 1;
        board[currentY - 1][currentX] = 11;
        currentRoom.playerPosition[playerNbr - 1].y = currentY - 1;
      } else {
        keys.t = false;
      }
    }
  }

  // Move Down (Bottom)
  if (keys.b) {
    let newTileY = Math.ceil((moveInfo.position.y - 10 + speed) / 30);

    // let xleft = (moveInfo.position.x - speed) / 30;
    // let xRigth = (moveInfo.position.x - 10 + speed) / 30;

    // console.log("down top ", xleft.toFixed(2), xRigth.toFixed(2), newTileY);

    if (newTileY > currentY) {
      if (board[currentY + 1][currentX] === 1) {
        board[currentY][currentX] = 1;
        board[currentY + 1][currentX] = 11;
        currentRoom.playerPosition[playerNbr - 1].y = currentY + 1;
      } else {
        keys.b = false;
      }
    }
  }

  return moveInfo;
}
