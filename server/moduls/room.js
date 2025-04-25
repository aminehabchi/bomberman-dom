import { generateUUID } from "../service/uuid.js";

export class Room {
  constructor(uuid) {
    this.Uuid = uuid;
    // index  => player
    this.Players = [];
    this.NbrPlayes = this.Players.length;
    this.MaxPlayers = 4;
    this.CreatedAt = new Date();
    this.IsStart = false;
    this.IsCreated = false;
  }
}

export var Rooms = {};

export var AvailableRoom;

export function CreateRoom() {
  const uuid = generateUUID();

  return new Room(uuid);
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

  return AvailableRoom;
}
