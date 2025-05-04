import { InputManager, playerPosition } from "./inputManager.js";
import { INFO } from "../utils/playerStatus.js";

let tileSize = 50;
let inputManager;
let id;
const framePerStep = 10;
const maxFrames = 4;
let frameCount = 0;

let PlayersMovement = [
  { r: false, l: false, t: false, b: false },
  { r: false, l: false, t: false, b: false },
  { r: false, l: false, t: false, b: false },
  { r: false, l: false, t: false, b: false },
];

export const playerDirection = {
  right: { x: 0, y: tileSize * 2 },
  left: { x: 0, y: tileSize },
  up: { x: 0, y: tileSize * 3 },
  down: { x: 0, y: 0 },
};

export let playerFacing = ["down", "down", "down", "down"];

// 🔧 Named function for keydown so we can remove it later
function handleKeyDown(e) {
  if (e.key.toLowerCase() === "x") {
    if (!INFO.socket)return
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

function updatePosition(players) {
  players.forEach((player, index) => {
    player.style.transform = `translate(${playerPosition[index].x}px, ${playerPosition[index].y}px)`;
  });
}

function updateFacingPosition(players) {
  players.forEach((player, index) => {
    const keys = PlayersMovement[index];

    // Determine facing direction
    if (keys.r) playerFacing[index] = "right";
    else if (keys.l) playerFacing[index] = "left";
    else if (keys.t) playerFacing[index] = "up";
    else if (keys.b) playerFacing[index] = "down";

    const isMoving = keys.r || keys.l || keys.t || keys.b;
    if (isMoving) {
      if (++frameCount >= framePerStep) {
        frameCount = 0;
        const dir = playerFacing[index];
        playerDirection[dir].x =
          (playerDirection[dir].x + tileSize) % (tileSize * maxFrames);
      }

      const dir = playerFacing[index];
      const frame = playerDirection[dir];
      player.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
    }
  });
}

export function updateInput22(moveInfo) {
  const playerNbr = moveInfo.playerNbr - 1;
  PlayersMovement[playerNbr] = moveInfo.keys;

  if (moveInfo.keys.r) playerFacing[playerNbr] = "right";
  else if (moveInfo.keys.l) playerFacing[playerNbr] = "left";
  else if (moveInfo.keys.t) playerFacing[playerNbr] = "up";
  else if (moveInfo.keys.b) playerFacing[playerNbr] = "down";

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

function setPlayerPosition(Position) {
  for (let i = 0; i < 4; i++) {
    playerPosition[i].x = Position[i].x * tileSize;
    playerPosition[i].y = Position[i].y * tileSize;
  }
}

export async function StartGameLoop(framework) {
  StopGameLoop();

  inputManager = new InputManager();
  document.addEventListener("keydown", handleKeyDown);

  setPlayerPosition(INFO.room.playerPosition);

  let PLayers = [];
  const playerNbr = INFO.Players.length;

  if (playerNbr > 0) {
    PLayers.push(framework.getRef("player1"));
    framework.getRef("player1").classList.remove("loser");
  }
  if (playerNbr > 1) {
    PLayers.push(framework.getRef("player2"));
    framework.getRef("player2").classList.remove("loser");
  }
  if (playerNbr > 2) {
    PLayers.push(framework.getRef("player3"));
    framework.getRef("player3").classList.remove("loser");
  }
  if (playerNbr > 3) {
    PLayers.push(framework.getRef("player4"));
    framework.getRef("player4").classList.remove("loser");
  }

  function gameLoop() {
    updatePosition(PLayers);
    updateFacingPosition(PLayers);
    id = requestAnimationFrame(gameLoop);
  }

  id = requestAnimationFrame(gameLoop);
  inputManager.removeEvents();
}

export function StopGameLoop() {
  if (id) {
    cancelAnimationFrame(id);
    id = null;
  }


  document.removeEventListener("keydown", handleKeyDown);
}
