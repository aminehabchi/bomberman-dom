export let INFO = {
  roomUuid: undefined,
  room: undefined,
  nickname: undefined,
  Players: undefined,
  socket: undefined,
};

/*
---player status when page load
  
            redirect    
 1-no login    =>      "/"

 2-no room     =>      "/start"

 3-room        =>      "/game" 


*/

export async function playerStatus(res, app) {
  if (res.status !== 200) {
    // Redirect to login page if status is not 200
    localStorage.removeItem("uuid");
    history.pushState(null, "", "/");
  } else {
    const data = await res.json();
    console.log(data.room);

    INFO.nickname = data.player.Nickname;

    if (data.room) {
      INFO.room = data.room;
      INFO.roomUuid = data.room.Uuid;
      INFO.Players = data.room.Players;

      app.setState("Players", data.room.Players);
    }

    if (data.player.JoinedRoom != "") {
      history.pushState(null, "", "/chat");
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
    framework.setState("Players", data.room.Players);

    framework.navigateTo("/chat");
  } else {
    framework.navigateTo("/");
  }
}
