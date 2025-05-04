import { io } from "../server.js";
import { generateUUID } from "../service/uuid.js";

export let Players = {};

export class Player {
  constructor(nickname, uuid, x, y) {
    this.Nickname = nickname;
    this.Uuid = uuid;
    this.JoinedAt = new Date();
    this.JoinedRoom = "";
    this.Nbr = -1;
    this.x = x;
    this.y = y;
    this.Speed = 1;
    this.Range = 1;
    this.Lives = 3;
    this.numberbomb = 1;
  }
}



export function createPlayer(nickname) {
  const uuid = generateUUID();
  let newPlayer = new Player(nickname, uuid, 0, 0);
  Players[uuid] = newPlayer;
  return uuid;
}

export function InsertPlayerToRoom(player, room) {
  player.JoinedRoom = room.Uuid;
  player.Nbr = room.Players.length;
  if (room.NbrPlayes == 2) {
    start20Timer(room.Uuid);
  }

  //notify
  io.to(room.Uuid).emit("notify", { Players: room.Players });
}
export function getPlayer(uuid) {
  return Players[uuid] || undefined;
}

export function getNickname(uuid) {
  if (uuid in Players) {
    return Players[uuid].Nickname;
  }
  return undefined;
}
