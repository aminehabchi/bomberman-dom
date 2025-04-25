import { startWebSocket } from "../socket/startSocket.js";
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
    console.log(data);

    app.setState("nickname", data.player.Nickname);
    app.setState("room", data.room);
    if (data.room) {
      app.setState("players", data.room.Players);
    }

    if (data.player.JoinedRoom != "") {
      startWebSocket(app, data.player.JoinedRoom);
      history.pushState(null, "", "/chat");
    } else {
      history.pushState(null, "", "/start");
    }
  }
}

export async function checkIfLogin(app) {
  const path = window.location.pathname;

  const uuid = localStorage.getItem("uuid");

  // Make sure we have a UUID stored
  if (!uuid) {
    history.pushState(null, "", "/");
    return;
  }

  try {
    // Correct the query string format
    const res = await fetch(`http://localhost:3000/checker?uuid=${uuid}`);

    await playerStatus(res, app);
  } catch (err) {
    console.error("Error checking login:", err);
    // Optionally, redirect or show an error page
    history.pushState(null, "", "/");
  }
}
