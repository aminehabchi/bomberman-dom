import { INFO } from "../utils/playerStatus.js";

let x = 30,
  y = 30;
const tileSize = 30;
let targetX = x;
let targetY = y;
const speed = 5; // pixels per frame for smooth animation

let moving = false;
let direction = null;

let keys = { r: false, l: false, t: false, b: false };

function updateInput(keys) {
  if (moving) return;

  if (keys.r) {
    targetX = x + tileSize;
    direction = "r";
    moving = true;
  } else if (keys.l) {
    targetX = x - tileSize;
    direction = "l";
    moving = true;
  } else if (keys.t) {
    targetY = y - tileSize;
    direction = "t";
    moving = true;
  } else if (keys.b) {
    targetY = y + tileSize;
    direction = "b";
    moving = true;
  }
}

function updatePosition(player1) {
  player1.style.transform = `translate(${x}px, ${y}px)`;
}

export function updateInput22(moveInfo) {
  keys = moveInfo.keys;
}

function animateMove() {
  if (!moving) return;

  if (direction === "r") {
    x += speed;
    if (x >= targetX) {
      x = targetX;
      moving = false;
    }
  } else if (direction === "l") {
    x -= speed;
    if (x <= targetX) {
      x = targetX;
      moving = false;
    }
  } else if (direction === "t") {
    y -= speed;
    if (y <= targetY) {
      y = targetY;
      moving = false;
    }
  } else if (direction === "b") {
    y += speed;
    if (y >= targetY) {
      y = targetY;
      moving = false;
    }
  }
}

function deepCloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

addEventListener("keydown", (e) => {
  let socket = INFO.socket;
  if (
    e.key === "ArrowRight" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown"
  ) {
    let newKeys = deepCloneObject(keys);
    if (e.key === "ArrowRight") {
      newKeys.r = true;
    }
    if (e.key === "ArrowLeft") {
      newKeys.l = true;
    }
    if (e.key === "ArrowUp") {
      newKeys.t = true;
    }
    if (e.key === "ArrowDown") {
      newKeys.b = true;
    }
    console.log(newKeys);

    socket.emit("moving", {
      room: INFO.roomUuid,
      moveInfo: { keys: newKeys, playerNbr: 1 },
    });
  }
});

addEventListener("keyup", (e) => {
  let socket = INFO.socket;
  if (
    e.key === "ArrowRight" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown"
  ) {
    let newKeys = deepCloneObject(keys);
    if (e.key === "ArrowRight") {
      newKeys.r = false;
    }
    if (e.key === "ArrowLeft") {
      newKeys.l = false;
    }
    if (e.key === "ArrowUp") {
      newKeys.t = false;
    }
    if (e.key === "ArrowDown") {
      newKeys.b = false;
    }
    socket.emit("moving", {
      room: INFO.roomUuid,
      moveInfo: { keys: newKeys, playerNbr: 1 },
    });
  }
});

let id;
export function StartGameLoop(framework) {
  StopGameLoop();
  const player1 = framework.getRef("player1");

  x = 30 * INFO.room.playerPosition[0].x;
  y = 30 * INFO.room.playerPosition[0].y;
  function gameLoop() {
    updateInput();
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
