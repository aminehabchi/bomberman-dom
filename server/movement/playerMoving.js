import { Rooms } from "../moduls/room.js";
import { UpdateMap } from "./board.js";
import { io } from "../server.js";
function setPower(player, power) {
  console.log(power, player);

  switch (power) {
    case 8:
      //bombsallowed
      player.numberbomb++ 

    case 6:
      //speed 
      if (player.Speed < 3) {
        player.Speed++

      }
    case 7:
      // flame
      if (player.Range < 4) {
        player.Range++
      }
  }
}

export function isValidMove(roomUuid, moveInfo) {
  const currentRoom = Rooms[roomUuid];
  if (!currentRoom) return false;

  const board = currentRoom.map;

  const { keys, playerNbr } = moveInfo;
  const X = currentRoom.playerPosition[playerNbr - 1].x;
  const Y = currentRoom.playerPosition[playerNbr - 1].y;

  // Constants for player and tile size
  const playerSize = 40; // Player size
  const tileSize = 50; // Tile size

  const currentleft = moveInfo.position.x / tileSize;
  const currentright = (moveInfo.position.x + playerSize) / tileSize;
  const currentup = moveInfo.position.y / tileSize;
  const currentdown = (moveInfo.position.y + playerSize) / tileSize;

  // Move Right
  if (keys.r) {
    if (currentup >= Y && currentdown <= Y + 1) {
      // console.log("r inside");

      if (currentright >= X + 0.95) {
        if (board[Y][X + 1] === 1 || board[Y][X + 1] === 8
          || board[Y][X + 1] === 6 || board[Y][X + 1] === 7
        ) {
          if (board[Y][X + 1] != 1 && board[Y][X + 1] != 5) {
            setPower(currentRoom.Players[playerNbr - 1], board[Y][X + 1], roomUuid)
            board[Y][X + 1] = 1;
            UpdateMap(io, roomUuid)
          }
          currentRoom.playerPosition[playerNbr - 1].x = X + 1;
        } else {
          keys.r = false; // Disable right movement if blocked
        }
      }
    } else {
      // console.log("r outside");
      if (currentright >= X + 0.95) {
        keys.r = false; // Disable right movement if blocked
      }
    }
  }

  // Move Left
  if (keys.l) {
    if (currentup >= Y && currentdown <= Y + 1) {
      // console.log("l inside");

      if (currentleft <= X + 0.05) {
        if (board[Y][X - 1] === 1 || board[Y][X - 1] === 8
          || board[Y][X - 1] === 6 || board[Y][X - 1] === 7
        ) {
          if (board[Y][X - 1] != 1 && board[Y][X - 1] != 5) {
            setPower(currentRoom.Players[playerNbr - 1], board[Y][X - 1], roomUuid)
            board[Y][X - 1] = 1;
            UpdateMap(io, roomUuid)
          }
          currentRoom.playerPosition[playerNbr - 1].x = X - 1;
        } else {
          keys.l = false; // Disable left movement if blocked
        }
      }
    } else {
      // console.log("l outside");
      if (currentleft <= X + 0.05) {
        keys.l = false; // Disable left movement if blocked
      }
    }
  }

  // Move Up (Top)
  if (keys.t) {
    if (currentleft >= X && currentright <= X + 1) {
      // console.log("t inside");

      if (currentup <= Y + 0.05) {
        if (board[Y - 1][X] === 1  || board[Y - 1][X] === 8
          || board[Y - 1][X] === 6 || board[Y - 1][X] === 7
        ) {
          if (board[Y - 1][X] != 1 && board[Y - 1][X] != 5) {
            setPower(currentRoom.Players[playerNbr - 1], board[Y - 1][X], roomUuid)
            board[Y - 1][X] = 1;
            UpdateMap(io, roomUuid)
          }
          currentRoom.playerPosition[playerNbr - 1].y = Y - 1;
        } else {
          keys.t = false; // Disable top movement if blocked
        }
      }
    } else {
      // console.log("t outside");
      if (currentup <= Y + 0.05) {
        keys.t = false; // Disable top movement if blocked
      }
    }
  }

  // Move Down (Bottom)
  if (keys.b) {
    if (currentleft >= X && currentright <= X + 1) {
      // console.log("d inside");

      if (currentdown >= Y + 0.95) {
        if (board[Y + 1][X] === 1 || board[Y + 1][X] === 8
          || board[Y + 1][X] === 6 || board[Y + 1][X] === 7
        ) {
          if (board[Y + 1][X] != 1 && board[Y + 1][X] != 5) {
            setPower(currentRoom.Players[playerNbr - 1], board[Y + 1][X], roomUuid)
            board[Y + 1][X] = 1;
            UpdateMap(io, roomUuid)
          }
          currentRoom.playerPosition[playerNbr - 1].y = Y + 1;
        } else {
          keys.b = false; // Disable bottom movement if blocked
        }
      }
    } else {
      // console.log("d outside");
      if (currentdown >= Y + 0.95) {
        keys.b = false; // Disable bottom movement if blocked
      }
    }
  }

  // Update moveInfo based on the movement
  if (keys.r === true) {
    moveInfo.position.x += currentRoom.Players[playerNbr - 1].Speed;
  } else if (keys.l === true) {
    moveInfo.position.x -= currentRoom.Players[playerNbr - 1].Speed;
  } else if (keys.t === true) {
    moveInfo.position.y -= currentRoom.Players[playerNbr - 1].Speed;
  } else if (keys.b === true) {
    moveInfo.position.y += currentRoom.Players[playerNbr - 1].Speed;
  }

  // console.log(moveInfo.position);
  // console.log(currentRoom.map[1]);

  return moveInfo;
}
