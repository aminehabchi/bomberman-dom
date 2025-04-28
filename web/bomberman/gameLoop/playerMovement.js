import { INFO } from "../utils/playerStatus.js";

const tileSize = 30;

let playerPosition = [
  { x: 1 * tileSize, y: 1 * tileSize }, // player 1
  { x: 15 * tileSize, y: 1 * tileSize }, // player 2
  { x: 1 * tileSize, y: 13 * tileSize }, // player 3
  { x: 15 * tileSize, y: 13 * tileSize }, // player 4
];



let keys = { r: false, l: false, t: false, b: false };

function updatePosition(player1, player2, player3, player4) {
  player1.style.transform = `translate(${playerPosition[0].x}px, ${playerPosition[0].y}px)`;
  player2.style.transform = `translate(${playerPosition[1].x}px, ${playerPosition[1].y}px)`;
  player3.style.transform = `translate(${playerPosition[2].x}px, ${playerPosition[2].y}px)`;
  player4.style.transform = `translate(${playerPosition[3].x}px, ${playerPosition[3].y}px)`;
}



export function updateInput22(moveInfo) {
  keys = moveInfo.keys;

  if (keys.r == true || keys.l == true || keys.t == true || keys.b == true) {
    playerPosition[moveInfo.playerNbr - 1].x = moveInfo.position.x
    playerPosition[moveInfo.playerNbr - 1].y = moveInfo.position.y
  }
}




let moveInterval = null; // Store the interval ID

const keyMap = {
  ArrowRight: "r",
  ArrowLeft: "l",
  ArrowUp: "t",
  ArrowDown: "b",
};

addEventListener("keydown", (e) => {
  if (!keyMap[e.key]) return; // Only react to arrows

  if (moveInterval) return; // Already moving, don't start a new interval


  let newKeys = { r: false, l: false, t: false, b: false };
  newKeys[keyMap[e.key]] = true;

  moveInterval = setInterval(() => {
    sendToServer(newKeys, { x: playerPosition[INFO.playerNbr - 1].x, y: playerPosition[INFO.playerNbr - 1].y }, INFO.roomUuid);
  }, 30); // Send every 30ms for smooth movement
});

addEventListener("keyup", (e) => {
  if (!keyMap[e.key]) return;

  if (moveInterval) {
    clearInterval(moveInterval);
    moveInterval = null;
    // Also send a stop signal to the server



    sendToServer(
      { r: false, l: false, t: false, b: false },
      { x: playerPosition[INFO.playerNbr - 1].x, y: playerPosition[INFO.playerNbr - 1].y },
      INFO.roomUuid
    );
  }
});




function sendToServer(newKeys, position) {
  let socket = INFO.socket;
  socket.emit("moving", {
    room: INFO.roomUuid,
    moveInfo: { keys: newKeys, playerNbr: INFO.playerNbr, position: position },
  });
}

let id;
export function StartGameLoop(framework) {
  StopGameLoop();
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
