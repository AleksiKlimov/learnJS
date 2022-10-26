import { createCell } from "./main.js";
import { examPosition } from "./addedShipsOnField.js";
const generateUniqId = () => {
  let randomIndex = 0 + Math.random() * (20 + 1 - 0);
  randomIndex = Math.floor(randomIndex);
  const arrId = [];
  for (let i = 0; i < arrId.length; i++) {
    if (arrId[i] === randomIndex) {
      return generateUniqId();
    }
  }
  arrId.push(randomIndex);
  return randomIndex;
};
const showShips = (escadraArray) => {
  const arrShips = [];
  const shipVisualContainer = document.querySelector(
    ".seabattle__ship-container"
  );
  shipVisualContainer.innerHTML = "";
  escadraArray.forEach((element) => {
    const innerArr = [];
    const newShipContainer = document.createElement("div");
    newShipContainer.classList.add("cell__container");
    newShipContainer.dataset.id = generateUniqId();
    shipVisualContainer.append(newShipContainer);
    for (let i = 0; i < element; i++) {
      const cell = createCell();
      cell.direction = "column";
      const newDeck = document.createElement("div");
      newDeck.classList.add("cube");
      newDeck.dataset.y = i;
      newDeck.dataset.x = 0;
      cell.div = newDeck;
      cell.y = i + 1;
      cell.x = 0;
      cell.id = newShipContainer.dataset.id;
      newShipContainer.append(newDeck);
      innerArr.push(cell);
    }
    arrShips.push(innerArr);
  });

  return dragNDrop(arrShips);
};

//=======================================================================
//=======================================================================
const dragNDrop = (arrShips) => {
  const shipContainer = document.querySelectorAll(".cell__container");
  for (const oneShip of shipContainer) {
    oneShip.onpointerdown = () => {
      oneShip.style.position = "fixed";
      document.onkeydown = (event) => {
        if (event.code === "Space") {
          oneShip.classList.toggle("horizontal");
        }
      };
      document.onpointermove = (event) => {
        if (oneShip.className === "cell__container") {
          oneShip.style.position = "fixed";
          oneShip.style.left = event.pageX - oneShip.offsetWidth / 2 + "px";
          oneShip.style.top =
            event.pageY -
            oneShip.offsetHeight / oneShip.childNodes.length +
            5 +
            "px";
        } else if (oneShip.className === "cell__container horizontal") {
          oneShip.style.position = "fixed";
          oneShip.style.top = event.pageY - oneShip.offsetHeight / 2 + "px";
          oneShip.style.left = event.pageX + "px";
          if (oneShip.childNodes.length > 2) {
            oneShip.style.left = event.pageX + oneShip.offsetWidth + "px";
          }
        }
        event.preventDefault();
      };
    };
    oneShip.onpointerup = (event) => {
      const targetElems = document.elementsFromPoint(
        event.clientX,
        event.clientY
      );
      if (targetElems[3].hasAttribute("id")) {
        const currentShip = targetElems[1];
        const coordinateOnField = targetElems[2];
        oneShip.style.position = "absolute";
        document.onpointermove = null;
        document.onkeydown = null;
        return examPosition(coordinateOnField, arrShips, currentShip);
      } else {
        oneShip.style.position = "static";
        document.onpointermove = null;
        document.onkeydown = null;
      }
    };
  }
};
export { showShips };
