import { createCell } from "./main.js";

const generateUniqId = () => {
  let randomIndex = 0 + Math.random() * (20 + 1 - 0);
  randomIndex = Math.floor(randomIndex);
  const arr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === randomIndex) {
      return generateUniqId();
    }
  }

  arr.push(randomIndex);
  return randomIndex;
};

const showShips = (escadraArray) => {
  const shipVisualContainer = document.querySelector(
    ".seabattle__ship-container"
  );
  shipVisualContainer.innerHTML = "";
  escadraArray.forEach((element) => {
    const newShipContainer = document.createElement("div");
    newShipContainer.classList.add("cell__container");
    newShipContainer.dataset.id = generateUniqId();
    shipVisualContainer.append(newShipContainer);
    for (let i = 0; i < element; i++) {
      const newDeck = document.createElement("div");
      newDeck.classList.add("cube");
      newDeck.dataset.y = 0;
      newDeck.dataset.x = 0;
      newShipContainer.append(newDeck);
    }
  });
  return dragNDrop();
};
const dragNDrop = () => {
  const shipContainer = document.querySelectorAll(".cell__container");

  for (let oneShip of shipContainer) {
    oneShip.onpointerdown = () => {
      oneShip.style.position = "fixed";
      oneShip.style.zIndex = 1000;
      document.body.append(oneShip);
      document.onpointermove = (event) => {
        oneShip.style.left = event.clientX + "px";
        oneShip.style.top = event.clientY + "px";
        oneShip.onpointerup = () => {
          let elemBelow = document.elementFromPoint(
            event.clientX,
            event.clientY
          );
          console.log(elemBelow.closest(".seabattle__sea-container"));
          if (elemBelow.closest(".seabattle__sea-container")) {
          }
          console.log(event);
        };
      };
    };
  }
};
export { showShips };
