import { Rooms } from "../moduls/room.js";
import { io } from "../server.js";
import { updateLife } from "./updateLives.js";
import { UpdateMap } from "../movement/board.js";
const bombTimer = 2500;

async function handleBomb(roomUuid, bombInfo) {
  let currentRoom = Rooms[roomUuid];
  let x = currentRoom.playerPosition[bombInfo.playerNbr - 1].x;
  let y = currentRoom.playerPosition[bombInfo.playerNbr - 1].y;

  Rooms[roomUuid].map[y][x] = 5

  setTimeout(() => {

    currentRoom.map[y][x] = 1;
    Explode(x, y, bombInfo.playerNbr, currentRoom.Uuid, bombInfo);
    UpdateMap(io, currentRoom.Uuid)
  }, bombTimer);
}

export default handleBomb;

async function Explode(x, y, playerNbr, roomUuid, bombInfo) {
  let currentRoom = Rooms[roomUuid];
  let range = currentRoom.Players[playerNbr - 1].Range


  isPlayerWallInExplosionRange(currentRoom.playerPosition, currentRoom.map, { x, y }, range, roomUuid)


  bombInfo.isExplod = true;
  io.to(roomUuid).emit("bomb", bombInfo);
}


function getBiasedRandom() {
  const rand = Math.random(); // generates a number between 0 and 1

  if (rand < 0.9) {
    return 1;
  } else {
    const options = [6, 7, 8];
    return options[Math.floor(Math.random() * options.length)];
  }
}

function isPlayerWallInExplosionRange(Players, map, bomb, range, roomUuid) {


  const dirs = [[1, 0], [-1, 0], [0, -1], [0, 1]]


  // check curren pos of bomb
  dirs.forEach(([dx, dy]) => {
    for (let i = 1; i <= range; i++) {
      let x = dx * i + bomb.x
      let y = dy * i + bomb.y
      checkPlayer(Players, x, y, roomUuid)
      if (x > 0 && x < 17 && y > 0 && y < 17) {
        if (map[y][x] != 1) {
          if (map[y][x] != 0) {
            map[y][x] = getBiasedRandom()
          }
          break
        }
      } else {
        break
      }
    }
  })

}


function checkPlayer(players, x, y, roomUuid) {
  players.forEach((player, index) => {
    if (player.x == x && player.y == y) {
      updateLife(index + 1, roomUuid)
    }
  })
}

