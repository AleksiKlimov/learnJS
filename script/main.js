import { showShips } from "./dragNDrop.js";
//=====================================================

//=====================================================================
function createCell() {
  return { id: 0, x: 0, y: 0, direction: null, hits: 0, ship: false };
}
const escadraArray = () => {
  const arr = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  return arr;
};

const createInterfaceField = (battleField) => {
  const mainArr = [];
  for (let y = 0; y <= 9; y++) {
    const innerArr = [];
    mainArr.push(innerArr);
    for (let x = 0; x <= 9; x++) {
      const cell = createCell();
      const newDiv = document.createElement("div");
      newDiv.classList.add("cube");
      newDiv.dataset.y = y;
      newDiv.dataset.x = x;
      cell.y = y;
      cell.x = x;
      cell.div = newDiv;
      battleField.append(newDiv);
      mainArr[y][x] = cell;
    }
  }
  return mainArr;
};

document.addEventListener("click", (event) => {
  const startButton = document.querySelector(".seabattle__button-start");
  const randomButton = document.querySelector(".seabattle__button-random");
  const manualButton = document.querySelector(".seabattle__button-manual");

  if (event.target.dataset.random) {
  } else if (event.target.dataset.manual) {
    const humanField = document.querySelector(".seabattle__sea-human");
    humanField.innerHTML = "";
    const mainArrHuman = createInterfaceField(humanField);
    showShips(escadraArray(), mainArrHuman);
  } else if (event.target.dataset.start) {
    const computerField = document.querySelector(".seabattle__sea-computer");
    computerField.innerHTML = "";
    const mainArrComputer = createInterfaceField(computerField);
  }
});
export { escadraArray, createCell };
