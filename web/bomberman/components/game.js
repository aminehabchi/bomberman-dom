import { Component } from "../../framework/component.js";
import { createVElement } from "../../framework/helpers.js";


const walls = new Set([
  '0,0','1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0', '9,0', '10,0', '11,0', '12,0', '13,0', '14,0',
  '0,1','0,2', '0,3', '0,4', '0,5', '0,6', '0,7', '0,8', '0,9', '0,10', '0,11',
  '14,1', '14,2', '14,3', '14,4', '14,5', '14,6', '14,7', '14,8', '14,9', '14,10', '14,11',
  '2,2', '4,2', '6,2', '8,2', '10,2', '12,2',
  '2,4', '4,4', '6,4', '8,4', '10,4', '12,4',
  '2,6', '4,6', '6,6', '8,6', '10,6', '12,6',
  '2,8', '4,8', '6,8', '8,8', '10,8', '12,8',
  '2,10', '4,10', '6,10', '8,10', '10,10', '12,10',
  '0,12', '1,12', '2,12', '3,12', '4,12', '5,12', '6,12', '7,12', '8,12', '9,12', '10,12', '11,12', '12,12', '13,12', '14,12'
]);

export class Game extends Component {
    getVDom() {
      const wallElements = Array.from(walls).map(wall => {
        const [x, y] = wall.split(',').map(Number);
        return createVElement("div", {
          class: "wall",
          dataset: wall,
          style: `left: ${x*40}px; top: ${y*40}px;`
        }, []);
      })
      return createVElement("div", { class: "map"}, wallElements); // Added position: relative to the map

    }
}
