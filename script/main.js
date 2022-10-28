import { showShips, dragNDrop } from "./dragNDrop.js";
import {
  randomPositionShip,
  randomOrientation,
  randomCoordinates,
} from "./getRandomPosShips.js";
//=====================================================

//=====================================================================
//gamesField PC and gamer
const humanField = document.querySelector(".seabattle__sea-human");
const computerField = document.querySelector(".seabattle__sea-computer");

//create default obj================================
function createCell() {
  return { x: 0, y: 0, direction: null, hits: 0, ship: false };
}
//array counter and length ships==========================================
const escadraArray = () => {
  const arr = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  return arr;
};
//function create matrix with defaults objects=================================
const createInterfaceField = (battleField) => {
  const mainArr = [];
  for (let y = 0; y <= 9; y++) {
    const innerArr = [];
    mainArr.push(innerArr);
    for (let x = 0; x <= 9; x++) {
      const $filedCell = document.createElement("div");
      $filedCell.classList.add("cube");
      $filedCell.dataset.y = y;
      $filedCell.dataset.x = x;
      const cell = createCell();
      // newDiv.classList.add("cube");
      cell.y = y;
      cell.x = x;
      cell.div = $filedCell;

      battleField.append($filedCell);
      mainArr[y][x] = cell;
    }
  }
  return mainArr;
};
//event listener main buttons games ====================================================
document.addEventListener("click", (event) => {
  if (event.target.dataset.random) {
    //RANDOM================================================
    humanField.innerHTML = "";
    const mainArrHuman = createInterfaceField(humanField);
    const escadraHuman = showShips(escadraArray(), true);
    randomPositionShip(escadraHuman, mainArrHuman);
    // dragNDrop(escadraHuman, mainArrHuman);
  } else if (event.target.dataset.manual) {
    //MANUAL=================================================
    humanField.innerHTML = "";
    const mainArrHuman = createInterfaceField(humanField);
    const escadraHuman = showShips(escadraArray(), true);
    dragNDrop(escadraHuman, mainArrHuman);
  } else if (event.target.dataset.start) {
    //START==========================================

    computerField.innerHTML = "";
    const mainArrComputer = createInterfaceField(computerField);
    const escadraComputer = showShips(escadraArray(), false);
    const positionFullShip = randomPositionShip(escadraComputer);
  }
});
export { escadraArray, createCell };
