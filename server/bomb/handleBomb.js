import { Rooms } from "../moduls/room.js";
import { io } from "../server.js";
import { updateLife } from "./updateLives.js";

const bombTimer = 2500;

async function handleBomb(roomUuid, bombInfo) {
  let currentRoom = Rooms[roomUuid];

  let pos = currentRoom.playerPosition[bombInfo.playerNbr - 1];
  currentRoom.map[pos.y][pos.x] = 5;

  setTimeout(() => {
    let pos = currentRoom.playerPosition[bombInfo.playerNbr - 1];
    currentRoom.map[pos.y][pos.x] = 5;
    Explode(bombInfo, roomUuid);
  }, bombTimer);
}

export default handleBomb;

async function Explode(bombInfo, roomUuid) {
  let currentRoom = Rooms[roomUuid];
  let x = bombInfo.x;
  let y = bombInfo.y;
  currentRoom.playerPosition.forEach((pos, index) => {
    let player = currentRoom.Players[bombInfo.playerNbr - 1];

    if (isPlayerInExplosionRange(pos, { x, y }, player.Range)) {
      updateLife(player);
    }
  });

  bombInfo.isExplod = true;
  io.to(roomUuid).emit("bomb", bombInfo);
}

function isPlayerInExplosionRange(pos, bomb, range) {
  if (pos.x <= bomb.x + range && pos.x >= bomb.x - range && pos.y == bomb.y) {
    return true;
  }
  if (pos.y <= bomb.y + range && pos.y >= bomb.y - range && pos.x == bomb.x) {
    return true;
  }

  return false;
}
