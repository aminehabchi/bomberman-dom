

const breakWalls = new Set();

function generateRandomWalls() {
    while (breakWalls.size < 30) {
        const randomX = Math.floor(Math.random() * gridWidth);
        const randomY = Math.floor(Math.random() * gridHeight);

        if ((randomX === 1 && randomY === 1) ||
            (randomX === 1 && randomY === 2) ||
            (randomX === 2 && randomY === 1) ||
            walls.has(`${randomX},${randomY}`))
            continue;
        else {
            const wallKey = `${randomX},${randomY}`;
            breakWalls.add(wallKey);
        }
    }
}


const gridWidth = 15;
const gridHeight = 13;
const cellSize = 40;

const map = new Set();
for (let x = 0; x < gridHeight; x++) {
    for (let y = 0; y < gridWidth; y++) {
        map.add(`${x},${y}`);
    }
}