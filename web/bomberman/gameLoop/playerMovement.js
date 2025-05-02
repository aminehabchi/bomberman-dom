import {
  InputManager,
  playerPosition,
} from "./inputManager.js";
import { INFO } from "../utils/playerStatus.js";

let tileSize = 50;
let debounceX = 0;

addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "x") {
    const now = Date.now();
    if (now > debounceX) {
      debounceX = now + 2000; // 500ms debounce window
      INFO.socket.emit("bomb", {
        room: INFO.roomUuid,
        bombInfo: {
          x: playerPosition[INFO.playerNbr - 1].x,
          y: playerPosition[INFO.playerNbr - 1].y,
          playerNbr: INFO.playerNbr,
        },
      });
    }
  }
});

let inputManager;



function updatePosition(players) {
  players.forEach((player, index) => {
    player.style.transform = `translate(${playerPosition[index].x}px, ${playerPosition[index].y}px)`;
  });
}

let PlayersMovement = [
  { r: false, l: false, t: false, b: false },
  { r: false, l: false, t: false, b: false },
  { r: false, l: false, t: false, b: false },
  { r: false, l: false, t: false, b: false },
]
export const playerDirection = {
  right: { x: 0, y: tileSize * 2 },
  left: { x: 0, y: tileSize },
  up: { x: 0, y: tileSize * 3 },
  down: { x: 0, y: 0 },
};
let frameCount = 0;
const framePerStep = 10;
const maxFrames = 4;

export let playerFacing = ["down", "down", "down", "down"];

function updateFacingPosition(players) {
  players.forEach((player, index) => {
    const keys = PlayersMovement[index];

    // Determine facing direction based on movement
    if (keys.r) {
      playerFacing[index] = "right";
    } else if (keys.l) {
      playerFacing[index] = "left";
    } else if (keys.t) {
      playerFacing[index] = "up";
    } else if (keys.b) {
      playerFacing[index] = "down";
    }

    // If the player is moving, update animation frame
    const isMoving = keys.r || keys.l || keys.t || keys.b;
    if (isMoving) {
      if (++frameCount >= framePerStep) {
        frameCount = 0;
        const dir = playerFacing[index];
        playerDirection[dir].x =
          (playerDirection[dir].x + tileSize) % (tileSize * maxFrames);
      }

      // Set the background position
      const dir = playerFacing[index];
      const frame = playerDirection[dir];
      player.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
    }
  });
}



export function updateInput22(moveInfo) {

  PlayersMovement[moveInfo.playerNbr - 1] = moveInfo.keys

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

  let PLayers = [];
  let playerNbr = INFO.Players.length;
  console.log(PLayers);

  if (playerNbr > 0) {
    PLayers.push(framework.getRef("player1"));
  }
  if (playerNbr > 1) {
    PLayers.push(framework.getRef("player2"));
  }
  if (playerNbr > 2) {
    PLayers.push(framework.getRef("player3"));
  }
  if (playerNbr > 3) {
    PLayers.push(framework.getRef("player4"));
  }

  function gameLoop() {
    updatePosition(PLayers);
    updateFacingPosition(PLayers);
    id = requestAnimationFrame(gameLoop);
  }

  id = requestAnimationFrame(gameLoop);
}

export function StopGameLoop() {
  if (id) {
    cancelAnimationFrame(id);
  }
}
