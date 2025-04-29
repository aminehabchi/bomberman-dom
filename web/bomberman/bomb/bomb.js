import { INFO } from "../utils/playerStatus.js";

export class Bomb {
    constructor(bombCooldown = 2, player, timer = Date.now()) {
        this.player = player;
        this.bombCooldown = bombCooldown * 1000; // en millisecondes
        this.lastBombTime = timer;
        this.activeBombs = new Set();
        this.isAlreadyCreated = false;
    }

    createBomb() {
        const gameContainer = document.querySelector('.grid');
        const currentTime = Date.now();

        if  (this.isAlreadyCreated  || (currentTime - this.lastBombTime <= this.bombCooldown)) {
            console.log("Bomb on cooldown or already created.");
            return;
        }

        // Création de la bombe
        this.isAlreadyCreated = true;
        this.lastBombTime = currentTime;

        const bombElement = document.createElement('div');
        bombElement.classList.add('bomb');

        const xCell = Math.floor(this.player.x / 50);
        const yCell = Math.floor(this.player.y / 50);
        console.log(xCell, yCell);
        

        this.BombToServer(xCell, yCell);
        const bombLeft = xCell * 50;
        const bombTop = yCell * 50 ;

        bombElement.style.left = `${bombLeft}px`;
        bombElement.style.top = `${bombTop}px`;
        const bombKey = `${xCell},${yCell}`;

        this.activeBombs.add(bombKey);
        bombElement.dataset.position = bombKey;
        gameContainer.appendChild(bombElement);

        
        // Supprime la bombe après 2 secondes
        setTimeout(() => {
            // this.explodeBomb(gameContainer, bombElement); // Décommente si tu ajoutes cette méthode
            gameContainer.removeChild(bombElement);
            this.activeBombs.delete(bombKey);
            this.isAlreadyCreated = false;
            console.log("Bomb removed.");
        }, 2000);
    }


    BombToServer(xCell, yCell) {
        let socket = INFO.socket;
        socket.emit("bomb", {
          room: INFO.roomUuid,
          bombInfo: {
            x: xCell,
            y: yCell,
            playerNbr: INFO.playerNbr,
          }
        });
      }
      
}


    // explodeBomb(gameContainer,bombElement) {
    //     bombElement.remove()
    //     const bombKey = bombElement.dataset.position;
    //     this.activeBombs.delete(bombKey);
    //     const [bombX, bombY] = bombKey.split(',').map(Number);
    //     const explosionOffsets = [1, -1];
    //     const destroyWall = (targetX, targetY) => {
    //         const targetWallKey = `${targetX},${targetY}`;
    //         if (wallsGris.has(targetWallKey)) {
    //             const wallElement = document.querySelector(`[data-position="${targetWallKey}"]`);
    //             if (wallElement) {
    //                 gameContainer.removeChild(wallElement);
    //                 wallsGris.delete(targetWallKey);
    //             }
    //         }
    //     };
    //     const checkPlayerCollision = (targetX, targetY) => {
    //         const playerGridX = Math.floor(this.player.x / cellSize);
    //         const playerGridY = Math.floor(this.player.y / cellSize);
    //         console.log(targetX, targetY, playerGridX, playerGridY)
    //         if (playerGridX === targetX && playerGridY === targetY) {
    //             gameOver(); 
    //             return true
    //             // this.player.playerReset()
    //         }
    //         return false
    //     };
    //     for (let offset of explosionOffsets) {
    //         destroyWall(bombX + offset, bombY);
    //         destroyWall(bombX, bombY + offset);
    //         checkMonsterHit(bombX + offset, bombY);
    //         checkMonsterHit(bombX, bombY + offset);
    //     }
    //     checkMonsterHit(bombX, bombY);
    //     for (let offset of explosionOffsets) {
    //         let offestX = checkPlayerCollision(bombX + offset, bombY)
    //         let offestY = checkPlayerCollision(bombX, bombY + offset);
    //         console.log(offestX, offestY)
    //        if (offestX || offestY) {
    //         return
    //        }
    //     }
    //     checkPlayerCollision(bombX, bombY);
    
    // }
// }
