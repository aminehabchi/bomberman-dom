let x = 30, y = 30;
const tileSize = 32;
let targetX = x;
let targetY = y;
const speed = 5; // pixels per frame for smooth animation

let moving = false;
let direction = null;

let tileX = 1
let tileY = 1

const keys = { r: false, l: false, t: false, b: false };

function updateInput() {
    if (moving) return;

    if (keys.r) {
        targetX = x + tileSize;
        direction = "r";
        moving = true;
        tileX++
    } else if (keys.l) {
        targetX = x - tileSize;
        direction = "l";
        moving = true;
        tileX--
    } else if (keys.t) {
        targetY = y - tileSize;
        direction = "t";
        moving = true;
        tileY++
    } else if (keys.b) {
        targetY = y + tileSize;
        direction = "b";
        moving = true;
        tileY--
    }
}

function updatePosition() {
    const player1 = document.getElementById("player1");
    player1.style.transform = `translate(${x}px, ${y}px)`;
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
import { boardTile } from "../components/board.js";
addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        if (boardTile[tileY][tileX + 1] == 1) {
            keys.r = true;
        }
    }
    if (e.key === "ArrowLeft") {
        keys.l = true;
        if (boardTile[tileY][tileX - 1] == 1) {
            keys.l = true;
        }
    }
    if (e.key === "ArrowUp") {
        keys.t = true;
        if (boardTile[tileY - 1][tileX] == 1) {
            keys.t = true;
        }
    }
    if (e.key === "ArrowDown") {
        keys.b = true;
        if (boardTile[tileY + 1][tileX] == 1) {
            keys.b = true;
        }
    }
});

addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") keys.r = false;
    if (e.key === "ArrowLeft") keys.l = false;
    if (e.key === "ArrowUp") keys.t = false;
    if (e.key === "ArrowDown") keys.b = false;
});

export function StartGameLoop() {
    function gameLoop() {
        updateInput();
        animateMove();
        updatePosition();
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}
