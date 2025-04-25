import { createVElement } from "../../framework/helpers.js"

/**
 * 0  =>  Wall
 * 1  =>  tile
 * 11 => player 1
 * 
 */
let boardTile = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
]

function Player() {
    return createVElement("div", {
        class: "player",
    }, [])
}

function random01() {
    return Math.random() < 0.9 ? 0 : 1;
}

function prepereBaord() {
    for (let i = 0; i < boardTile.length; i++) {
        for (let j = 0; j < boardTile[i].length; j++) {
            if (boardTile[i][j] == 1) {
                if (random01() == 1) {
                    boardTile[i][j] = 2
                }
            }
        }
    }
    // player 1
    boardTile[1][1] = 11   // initial position
    boardTile[1][2] = 1
    boardTile[2][1] = 1

    // player 2
    boardTile[1][15] = 22
    boardTile[1][14] = 1
    boardTile[2][15] = 1

    // player 3
    boardTile[13][1] = 33
    boardTile[13][2] = 1
    boardTile[12][1] = 1

    // player 4
    boardTile[13][15] = 44
    boardTile[13][14] = 1
    boardTile[12][15] = 1
}


export function board() {

    prepereBaord()

    let tiles = []

    for (let i = 0; i < boardTile.length; i++) {
        for (let j = 0; j < boardTile[i].length; j++) {
            if (boardTile[i][j] == 0) {
                tiles.push(createVElement('div', { class: "wall tile" }, []))
            } else if (boardTile[i][j] == 2) {
                tiles.push(createVElement('div', { class: "tile wall2" }, []))
            } else if (boardTile[i][j] == 11) {
                tiles.push(Player())
            } else {
                tiles.push(createVElement('div', { class: "tile" }, []))
            }
        }
    }

    return createVElement("div", { class: "grid" }, tiles)
}