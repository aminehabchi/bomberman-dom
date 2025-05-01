import {
  InputManager,
  playerPosition,
  playerDirection,
  playerFacing,
} from "./inputManager.js";
import { INFO } from "../utils/playerStatus.js";

addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() == "x") {
    INFO.socket.emit("bomb", {
      room: INFO.roomUuid,
      bombInfo: {
        x: playerPosition[INFO.playerNbr - 1].x,
        y: playerPosition[INFO.playerNbr - 1].y,
        playerNbr: INFO.playerNbr,
      },
    });
  }
});


let inputManager;
let keys = { r: false, l: false, t: false, b: false };
let frameCount = 0;
const framePerStep = 10;
const maxFrames = 4;

function updatePosition(player1, player2, player3, player4) {
  player1.style.transform = `translate(${playerPosition[0].x}px, ${playerPosition[0].y}px)`;
  player2.style.transform = `translate(${playerPosition[1].x}px, ${playerPosition[1].y}px)`;
  player3.style.transform = `translate(${playerPosition[2].x}px, ${playerPosition[2].y}px)`;
  player4.style.transform = `translate(${playerPosition[3].x}px, ${playerPosition[3].y}px)`;
}

function updateFacingPosition(player1, player2, player3, player4) {
  // console.log("+++++++++++++++++++>",playerNbr);
    const playerNbr = INFO.playerNbr - 1
    // Only animate when the current player (us) is moving
    if (!inputManager.isSetEmpty()) {
      if (++frameCount >= framePerStep) {
        frameCount = 0;
        // Only update the animation frame for current direction
        // if(playerNbr) {
          playerDirection[playerFacing[playerNbr]].x =
            (playerDirection[playerFacing[playerNbr]].x + tileSize) %
            (tileSize * maxFrames);
          console.log("frame", playerDirection[playerFacing[playerNbr]].x);
        // }
      }
    }
    // Set the background position for each player based on their facing direction
    player1.style.backgroundPosition = `-${
      playerDirection[playerFacing[0]].x
    }px -${playerDirection[playerFacing[0]].y}px`;
    player2.style.backgroundPosition = `-${
      playerDirection[playerFacing[1]].x
    }px -${playerDirection[playerFacing[1]].y}px`;
    player3.style.backgroundPosition = `-${
      playerDirection[playerFacing[2]].x
    }px -${playerDirection[playerFacing[2]].y}px`;
    player4.style.backgroundPosition = `-${
      playerDirection[playerFacing[3]].x
    }px -${playerDirection[playerFacing[3]].y}px`;
}


export function updateInput22(moveInfo) {
  const playerNbr = moveInfo.playerNbr - 1;

  // Update the facing direction and position only for the specific player
  if (moveInfo.playerNbr) {
    if (moveInfo.keys.r) {
      playerFacing[playerNbr] = "right";
    } else if (moveInfo.keys.l) {
      playerFacing[playerNbr] = "left";
    } else if (moveInfo.keys.t) {
      playerFacing[playerNbr] = "up";
    } else if (moveInfo.keys.b) {
      playerFacing[playerNbr] = "down";
    }

    if (
      moveInfo.keys.r ||
      moveInfo.keys.l ||
      moveInfo.keys.t ||
      moveInfo.keys.b
    ) {
      playerPosition[playerNbr].x = moveInfo.position.x;
      playerPosition[playerNbr].y = moveInfo.position.y;
    }
  }
}

let tileSize = 50;
let id;

function setPlayerPosition(Position) {
  playerPosition[0].x = Position[0].x * tileSize;
  playerPosition[0].y = Position[0].y * tileSize;
  playerPosition[1].x = Position[1].x * tileSize;
  playerPosition[1].y = Position[1].y * tileSize;
  playerPosition[2].x = Position[2].x * tileSize;
  playerPosition[2].y = Position[2].y * tileSize;
  playerPosition[3].x = Position[3].x * tileSize;
  playerPosition[3].y = Position[3].y * tileSize;
}
export function StartGameLoop(framework) {
  StopGameLoop();

  inputManager = new InputManager();

  setPlayerPosition(INFO.room.playerPosition);

  const player1 = framework.getRef("player1");
  const player2 = framework.getRef("player2");
  const player3 = framework.getRef("player3");
  const player4 = framework.getRef("player4");

  function gameLoop() {
    updatePosition(player1, player2, player3, player4);
    updateFacingPosition(player1, player2, player3, player4)
    id = requestAnimationFrame(gameLoop);
  }

  id = requestAnimationFrame(gameLoop);
}

export function StopGameLoop() {
  if (id) {
    cancelAnimationFrame(id);
  }
}
