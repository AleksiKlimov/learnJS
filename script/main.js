import { showShips } from "./dragNDrop.js";
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
      const cell = createCell();
      const newDiv = document.createElement("div");
      // newDiv.classList.add("cube");
      newDiv.dataset.y = y;
      newDiv.dataset.x = x;
      cell.y = y;
      cell.x = x;
      cell.div = newDiv;
      cell.div.classList.add("cube");

      battleField.append(newDiv);
      mainArr[y][x] = cell;
    }
  }
  window.mainArr = mainArr;
  return mainArr;
};
//event listener main buttons games ====================================================
document.addEventListener("click", (event) => {
  if (event.target.dataset.random) {
  } else if (event.target.dataset.manual) {
    humanField.innerHTML = "";
    const mainArrHuman = createInterfaceField(humanField);
    showShips(escadraArray(), mainArrHuman);
  } else if (event.target.dataset.start) {
    computerField.innerHTML = "";
    createInterfaceField(computerField);
  }
});
export { escadraArray, createCell };
