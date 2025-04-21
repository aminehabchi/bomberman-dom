export class Player {
  constructor(nickname, uuid, nbr, joienedRoom, x, y) {
    this.Nickname = nickname;
    this.Uuid = uuid;
    this.Nbr = nbr; // nbr of player in room 1-4
    this.JoienedRoom = joienedRoom;
    this.Score = 0;
    this.JoinedAt = new Date();
    this.x = x;
    this.y = y;
  }
}
