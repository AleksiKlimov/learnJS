import { gameLoop } from "./gameLoop.js";
import { showShips } from "./dragNDrop.js";
import {
  examinationLocationShips,
  locationFunction,
} from "./addedShipsOnField.js";
//=====================================================
// import { randomInteger, orientationPosition } from "./getRandomPosShips.js";

//=====================================================================
function Cell() {
  return { id: 0, x: 0, y: 0, length: 0, hits: 0, ship: false };
}
const escadraArray = () => {
  const arr = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  return arr;
};

const createInterfaceField = (humanSea) => {
  const mainArr = [];
  console.log(mainArr);
  for (let y = 0; y <= 9; y++) {
    const innerArr = [];
    mainArr.push(innerArr);
    for (let x = 0; x <= 9; x++) {
      const cell = new Cell();
      cell.x = x;
      cell.y = y;

      let newDiv = document.createElement("div");
      newDiv.classList.add("cube");
      newDiv.dataset.y = y;
      newDiv.dataset.x = x;
      humanSea.append(newDiv);
      mainArr[y][x] = cell;
    }
  }
  return escadraArray(mainArr);
};

document.addEventListener("click", (event) => {
  const startButton = document.querySelector(".seabattle__button-start");
  const randomButton = document.querySelector(".seabattle__button-random");
  const manualButton = document.querySelector(".seabattle__button-manual");

  if (event.target.dataset.random) {
  } else if (event.target.dataset.manual) {
    showShips(escadraArray(), Cell);
  } else if (event.target.dataset.start) {
    const computerSea = document.querySelector(".seabattle__sea-computer");
    computerSea.innerHTML = "";
    // const fullField = randomLocationShips(fieldHuman);
    createInterfaceField(computerSea);
    gameLoop();
  }
});
export { escadraArray, Cell };
