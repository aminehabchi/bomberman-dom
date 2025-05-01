import { getPlayer } from "../moduls/player.js";
import { AddPlayerToRoom } from "../moduls/room.js";
import { CreateRoom, Rooms } from "../moduls/room.js";

function JoinRRoom(res, player) {
  let room = AddPlayerToRoom(player);
  Rooms[room.Uuid] = room;
  player.JoinedRoom = room.Uuid;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ room: room, nbr: player.Nbr }));
}

function CreateJoinRoom(res, player) {
  //prepare room
  let room = CreateRoom();
  room.IsCreated = true;
  room.Players.push(player);
  player.Nbr = room.Players.length;
  if (player.Nbr == 2) {
    start20Timer(room.Uuid);
  }
  Rooms[room.Uuid] = room;
  player.JoinedRoom = room.Uuid;

  /* */
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ room: room, nbr: player.Nbr }));
}

function JoinRoom(res, player, roomUuid) {
  let room = Rooms[roomUuid];

  if (room.Players.length < 4) {
    room.Players.push(player);
    player.Nbr = room.Players.length;
    if (player.Nbr == 2) {
      start20Timer(roomUuid);
    }
    player.JoinedRoom = room.Uuid;
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ room: room, nbr: player.Nbr }));
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Room is Full !!" }));
  }
}

function createRoomrHandler(req, res) {
  const fullUrl = new URL(req.url, `http://${req.headers.host}`);
  const params = fullUrl.searchParams;
  const uuid = params.get("uuid");
  const type = params.get("type");
  const roomUuid = params.get("room");

  let player = getPlayer(uuid);
  if (player) {
    switch (type) {
      case "RR":
        JoinRRoom(res, player);
        break;
      case "CR":
        CreateJoinRoom(res, player);
        break;
      case "JR":
        JoinRoom(res, player, roomUuid);
        break;
    }
  } else {
    res.statusCode = 400;
    res.end();
  }
}

export default createRoomrHandler;
