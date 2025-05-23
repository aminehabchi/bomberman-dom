export let INFO = {
  roomUuid: undefined,
  room: undefined,
  nickname: undefined,
  Players: undefined,
  playerNbr: -1,
  socket: undefined,
};
import { startWebSocket } from "../socket/startSocket.js";
/*
---player status when page load
  
            redirect    
 1-no login    =>      "/"

 2-no room     =>      "/start"

 3-room        =>      "/chat" 

 4-room start  =>      "/game"

*/

export async function playerStatus(res, app) {
  if (res.status !== 200) {
    // Redirect to login page if status is not 200
    localStorage.removeItem("uuid");
    history.pushState(null, "", "/");
  } else {
    const data = await res.json();
    console.log(data);

    INFO.nickname = data.player.Nickname;

    if (data.room) {
      INFO.room = data.room;
      INFO.roomUuid = data.room.Uuid;
      INFO.Players = data.room.Players;
      INFO.playerNbr = data.nbr;
      console.log("-->", INFO.playerNbr);

      INFO.Players.forEach((player, index) => {
        app.setWState("live" + (index + 1).toString(), player.Lives);
      });
      app.setWState("map", data.room.map);
      app.setWState("Players", data.room.Players);
    }

    if (data.player.JoinedRoom != "") {
      if (data.room.IsStart == true) {
        startWebSocket(app, INFO.roomUuid);
        history.pushState(null, "", "/game");
      } else {
        history.pushState(null, "", "/chat");
      }
    } else {
      history.pushState(null, "", "/start");
    }
  }
}

export async function checkIfLogin(app) {
  const uuid = localStorage.getItem("uuid");

  // Make sure we have a UUID stored
  if (!uuid) {
    history.pushState(null, "", "/");
    return;
  }

  try {
    const res = await fetch(`/checker?uuid=${uuid}`);
    console.log(app);

    await playerStatus(res, app);
  } catch (err) {
    console.error("Error checking login:", err);
    // Optionally, redirect or show an error page
    history.pushState(null, "", "/");
  }
}

/*

    there is 3 type if jioning room
                                  
                                    type

    => random room             =>   RR

    => create your own room    =>   CR

    => join a created room     =>   JR


*/

export async function StartGetRoom(framework, type, RoomUuid) {
  const uuid = localStorage.getItem("uuid");

  let res = await fetch(
    `/createroom?uuid=${uuid}&type=${type}&room=${RoomUuid}`
  );

  if (res.status == 200) {
    let data = await res.json();
    if (data.error) {
      console.log("error->", data.error);
      return;
    }

    INFO.room = data.room;
    INFO.roomUuid = data.room.Uuid;
    INFO.Players = data.room.Players;
    INFO.playerNbr = data.nbr;
    console.log("-->", INFO.playerNbr);

    framework.setWState("Players", data.room.Players);
    framework.setWState("map", data.room.map);
    framework.navigateTo("/chat");
  } else {
    framework.navigateTo("/");
  }
}
