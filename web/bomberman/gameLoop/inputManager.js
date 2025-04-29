import { INFO } from "../utils/playerStatus.js";
let tileSize = 50;

export var playerPosition = [
    { x: 1 * tileSize, y: 1 * tileSize },
    { x: 15 * tileSize, y: 1 * tileSize },
    { x: 1 * tileSize, y: 13 * tileSize },
    { x: 15 * tileSize, y: 13 * tileSize },
];

export class InputManager {
    constructor() {
        this.moveInterval = undefined;
        this.Keys = new Set();

        this.AllowedKeys = {
            ArrowRight: "r",
            ArrowLeft: "l",
            ArrowUp: "t",
            ArrowDown: "b",
        };

        this.IdTime = undefined

        this.#initEvents();
    }

    #initEvents() {
        document.addEventListener("keydown", this.#handleKeyDown);
        document.addEventListener("keyup", this.#handleKeyUp);
    }

    isSetEmpty() {
        return this.Keys.size === 0;
    }

    getLastOfSet() {
        if (this.Keys.size === 0) return null;
        let last = null;
        for (const item of this.Keys) {
            last = item;
        }
        return last;
    }

    deleteKey(key) {
        return this.Keys.delete(key);
    }

    moveToLastOfSet(item) {
        this.Keys.delete(item);
        this.Keys.add(item);
    }

    #handleKeyDown = (e) => {
        const key = this.AllowedKeys[e.key];
        if (!key) return;
        this.moveToLastOfSet(key);



        const newKeys = { r: false, l: false, t: false, b: false };
        const lastKey = this.getLastOfSet();
        if (lastKey) {
            newKeys[lastKey] = true;
        }

        this.IdTime = setTimeout(() => {
            sendToServer(
                newKeys,
                {
                    x: playerPosition[INFO.playerNbr - 1].x,
                    y: playerPosition[INFO.playerNbr - 1].y,
                }
            );
        }, 8)

    }


    #handleKeyUp = (e) => {
        const key = this.AllowedKeys[e.key];
        if (!key) return;

        this.deleteKey(key);

        if (this.isSetEmpty()) {
            clearTimeout(this.IdTime)
            this.IdTime = null
            sendToServer(
                { r: false, l: false, t: false, b: false },
                {
                    x: playerPosition[INFO.playerNbr - 1].x,
                    y: playerPosition[INFO.playerNbr - 1].y,
                }
            );
        }
    };

}

function sendToServer(newKeys, position) {
    INFO.socket.emit("moving", {
        room: INFO.roomUuid,
        moveInfo: {
            keys: newKeys,
            playerNbr: INFO.playerNbr,
            position: position,
        },
    });
}
