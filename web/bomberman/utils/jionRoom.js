import { startWebSocket } from "../socket/startSocket.js";

/*

    there is 3 type if jioning room
                                  
                                    type

    => random room             =>   RR

    => create your own room    =>   CR

    => join a created room     =>   JR


*/

export async function StartGetRoom(framework, type, roomUuid) {
  const uuid = localStorage.getItem("uuid");

  let res = await fetch(
    `http://localhost:3000/createroom?uuid=${uuid}&type=${type}&room=${roomUuid}`
  );

  if (res.status == 200) {
    let data = await res.json();
    if (data.error) {
      console.log(data.error);

      return;
    }
    console.log(data, framework);

    startWebSocket(framework, data.room.Uuid);

    framework.setState("room", data.room)

    framework.setState("players", data.room.Players);

    let socket = framework.getState("socket");
    socket.emit("notify", { room: data.room.Uuid, message: { uuid: uuid } });

    framework.navigateTo("/chat");
  } else {
    framework.navigateTo("/");
  }
}
