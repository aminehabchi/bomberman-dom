import { INFO } from "../utils/playerStatus.js";

let x = 30,
  y = 30;
const tileSize = 30;

const speed = 1; // pixels per frame for smooth animation

let keys = { r: false, l: false, t: false, b: false };

function updatePosition(player1) {
  player1.style.transform = `translate(${x}px, ${y}px)`;
}

export function updateInput22(moveInfo) {
  keys = moveInfo.keys;}

function animateMove() {
  if (keys.r) {
    x += speed;
  } else if (keys.l) {
    x -= speed;
  } else if (keys.t) {
    y -= speed;
  } else if (keys.b) {
    y += speed;
  }
}

function deepCloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}



let rr = 0;
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
  
  console.log("start move", rr++, e.key);

  let newKeys = { r: false, l: false, t: false, b: false };
  newKeys[keyMap[e.key]] = true;

  moveInterval = setInterval(() => {
    sendToServer(newKeys, { x: x, y: y }, INFO.roomUuid);
  }, 30); // Send every 30ms for smooth movement
});

addEventListener("keyup", (e) => {
  if (!keyMap[e.key]) return;

  console.log("stop move", rr++, e.key);

  if (moveInterval) {
    clearInterval(moveInterval);
    moveInterval = null;
    // Also send a stop signal to the server
    sendToServer(
      { r: false, l: false, t: false, b: false },
      { x: x, y: y },
      INFO.roomUuid
    );
  }
});




function sendToServer(newKeys, position, roomUuid) {
  let socket = INFO.socket;
  socket.emit("moving", {
    room: INFO.roomUuid,
    moveInfo: { keys: newKeys, playerNbr: 1, position: position },
  });
}

let id;
export function StartGameLoop(framework) {
  StopGameLoop();
  const player1 = framework.getRef("player1");

  x = 30 * INFO.room.playerPosition[0].x;
  y = 30 * INFO.room.playerPosition[0].y;
  function gameLoop() {
    animateMove();
    updatePosition(player1);
    id = requestAnimationFrame(gameLoop);
  }

  id = requestAnimationFrame(gameLoop);
}

export function StopGameLoop() {
  if (id) {
    cancelAnimationFrame(id);
  }
}
