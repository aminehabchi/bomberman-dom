import { Rooms } from "../moduls/room.js";
import { io } from "../server.js";
import { updateLife } from "./updateLives.js";
import { UpdateMap } from "../movement/board.js";
const bombTimer = 2500;

function handleBomb(roomUuid, bombInfo) {
  let currentRoom = Rooms[roomUuid];
  let x = currentRoom.playerPosition[bombInfo.playerNbr - 1].x;
  let y = currentRoom.playerPosition[bombInfo.playerNbr - 1].y;
  let player = currentRoom.Players[bombInfo.playerNbr - 1];

  Rooms[roomUuid].map[y][x] = 5;

  setTimeout(() => {
    currentRoom.map[y][x] = 1;
    Explode(x, y, bombInfo.playerNbr, currentRoom.Uuid, bombInfo);
    UpdateMap(io, currentRoom.Uuid);
    player.numberbomb++;
  }, bombTimer);
}

export default handleBomb;

function Explode(x, y, playerNbr, roomUuid) {
  let currentRoom = Rooms[roomUuid];
  let NumberOfPlayers = currentRoom.Players.length;
  let range = currentRoom.Players[playerNbr - 1].Range;

  isPlayerWallInExplosionRange(
    currentRoom.playerPosition,
    currentRoom.map,
    { x, y },
    range,
    roomUuid,
    NumberOfPlayers
  );
}

function getBiasedRandom() {
  const rand = Math.random(); // generates a number between 0 and 1

  if (rand < 0.2) {
    return 1;
  } else {
    const options = [6, 7, 8];
    let b = Math.floor(Math.random() * options.length);
    return options[b];
  }
}

function isPlayerWallInExplosionRange(
  Players,
  map,
  bomb,
  range,
  roomUuid,
  NumberOfPlayers
) {
  let explosionCords = [];
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  explosionCords.push({ x: bomb.x, y: bomb.y });

  // check bomb position
  checkPlayer(Players, bomb.x, bomb.y, roomUuid, NumberOfPlayers);

  // check curren pos of bomb
  dirs.forEach(([dx, dy]) => {
    for (let i = 1; i <= range; i++) {
      let x = dx * i + bomb.x;
      let y = dy * i + bomb.y;
      checkPlayer(Players, x, y, roomUuid, NumberOfPlayers);
      if (map[y][x] != 0) {
        explosionCords.push({ x, y });

        // in case if there is a block
        if (map[y][x] == 2) {
          map[y][x] = getBiasedRandom();
        }
      } else {
        break;
      }
    }
  });

  io.to(roomUuid).emit("explode", explosionCords);
}

function checkPlayer(players, x, y, roomUuid, NumberOfPlayers) {
  for (let i = 0; i < NumberOfPlayers; i++) {
    const player = players[i];
    if (player.x === x && player.y === y) {
      updateLife(i + 1, roomUuid);
    }
  }
}
