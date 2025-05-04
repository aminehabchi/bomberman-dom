import { getPlayer, InsertPlayerToRoom } from "../moduls/player.js";
import { AddPlayerToRoom } from "../moduls/room.js";
import { CreateRoom, Rooms } from "../moduls/room.js";
import { deepCopy } from "../service/deepClone.js";

function JoinRRoom(res, player) {
  let room = AddPlayerToRoom(deepCopy(player));
  player = deepCopy(player)
  InsertPlayerToRoom(player, room);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ room: room, nbr: player.Nbr }));
}

function CreateJoinRoom(res, player) {
  //prepare room
  let room = CreateRoom();
  room.IsCreated = true;
  player = deepCopy(player)
  room.Players.push(player);
  Rooms[room.Uuid] = room;

  InsertPlayerToRoom(player, room);

  /* */
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ room: room, nbr: player.Nbr }));
}

function JoinRoom(res, player, roomUuid) {
  let room = Rooms[roomUuid];

  if (room && room.Players.length < 4) {
    player = deepCopy(player)
    room.Players.push(player);
    InsertPlayerToRoom(player, room);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ room: room, nbr: player.Nbr }));
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Room is Full or Not Found !!" }));
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
