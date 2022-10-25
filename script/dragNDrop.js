import { randomInteger } from "./getRandomPosShips.js";

const showShips = (escadraArray, Cell) => {
  const shipVisualContainer = document.querySelector(
    ".seabattle__ship-container"
  );

  escadraArray.forEach((element) => {
    const newShip = document.createElement("div");
    const cell = new Cell();
    cell.id = randomInteger();
    console.log(cell);
    newShip.classList.add("cube");
    shipVisualContainer.append(newShip);
  });
};
export { showShips };
