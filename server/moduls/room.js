import { generateUUID } from "../service/uuid.js";
import { prepereBaord } from "../movement/board.js";
import { start20Timer } from "./counter.js";
export class Room {
  constructor(uuid, Map) {
    this.Uuid = uuid;
    // index  => player
    this.Players = [];
    this.NbrPlayes = this.Players.length;
    this.MaxPlayers = 4;
    this.CreatedAt = new Date();
    this.IsStart = false;
    this.IsCreated = false;
    this.DeadPlayers = []
    this.map = Map;
    this.playerPosition = [
      { x: 1, y: 1 }, // player 1
      { x: 15, y: 1 }, // player 2
      { x: 1, y: 13 }, // player 3
      { x: 15, y: 13 }, // player 4
    ];
  }
}

export var Rooms = {};

export var AvailableRoom;

export function CreateRoom() {
  const uuid = generateUUID();

  return new Room(uuid, prepereBaord(4));
}

function PrepereRoom() {
  if (!AvailableRoom || AvailableRoom.NbrPlayes == 4 || AvailableRoom.IsStart) {
    AvailableRoom = CreateRoom();
    Rooms[AvailableRoom.Uuid] = AvailableRoom;
  }
}

export function AddPlayerToRoom(player) {
  PrepereRoom();
  player.JoinedRoom = AvailableRoom.Uuid;
  AvailableRoom.Players.push(player);
  player.Nbr = AvailableRoom.Players.length;
  if (player.Nbr == 2) {
    start20Timer(player.JoinedRoom);
  }
  return AvailableRoom;
}
