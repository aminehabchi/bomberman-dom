export class Room {
    constructor(uuid) {
        this.Uuid = uuid
        this.Player = {}
        this.NbrPlayes = 0
        this.CreatedAt = new Date();
    }
}