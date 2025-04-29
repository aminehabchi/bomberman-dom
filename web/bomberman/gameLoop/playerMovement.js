import { InputManager, playerPosition } from "./inputManager.js";
import { INFO } from "../utils/playerStatus.js";
let inputManager;

function updatePosition(player1, player2, player3, player4) {
  player1.style.transform = `translate(${playerPosition[0].x}px, ${playerPosition[0].y}px)`;
  player2.style.transform = `translate(${playerPosition[1].x}px, ${playerPosition[1].y}px)`;
  player3.style.transform = `translate(${playerPosition[2].x}px, ${playerPosition[2].y}px)`;
  player4.style.transform = `translate(${playerPosition[3].x}px, ${playerPosition[3].y}px)`;
}

export function updateInput22(moveInfo) {

  if (moveInfo.keys.r == true ||
    moveInfo.keys.l == true ||
    moveInfo.keys.t == true ||
    moveInfo.keys.b == true) {

    console.log(moveInfo.position);

    playerPosition[moveInfo.playerNbr - 1].x = moveInfo.position.x
    playerPosition[moveInfo.playerNbr - 1].y = moveInfo.position.y
  }
}

let tileSize = 50;
let id;


function setPlayerPosition(Position) {
  playerPosition[0].x = Position[0].x * tileSize
  playerPosition[0].y = Position[0].y * tileSize
  playerPosition[1].x = Position[1].x * tileSize
  playerPosition[1].y = Position[1].y * tileSize
  playerPosition[2].x = Position[2].x * tileSize
  playerPosition[2].y = Position[2].y * tileSize
  playerPosition[3].x = Position[3].x * tileSize
  playerPosition[3].y = Position[3].y * tileSize

}
export function StartGameLoop(framework) {
  StopGameLoop();

  inputManager = new InputManager()

  setPlayerPosition(INFO.room.playerPosition)

  const player1 = framework.getRef("player1");
  const player2 = framework.getRef("player2");
  const player3 = framework.getRef("player3");
  const player4 = framework.getRef("player4");




  function gameLoop() {
    updatePosition(player1, player2, player3, player4);
    id = requestAnimationFrame(gameLoop);
  }

  id = requestAnimationFrame(gameLoop);
}

export function StopGameLoop() {
  if (id) {
    cancelAnimationFrame(id);
  }
}
