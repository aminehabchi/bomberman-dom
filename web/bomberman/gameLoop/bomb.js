import { app } from "../main.js";

export function setBomb(bombInfo) {
  let bomb = app.getRef("bomb1");

  bomb.style.transform = `translate(${bombInfo.x}px, ${bombInfo.y}px)`;
  console.log(bombInfo);
}
