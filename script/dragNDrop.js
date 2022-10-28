import { createCell } from "./main.js";
import { examPosition } from "./addedShipsOnField.js";
import { escadraArray } from "./main.js";
//========================================================================

//================================================================================
const showShips = (escadraArray, flag) => {
  let counter = 0;
  const arrShips = [];
  const shipVisualContainer = document.querySelector(
    ".seabattle__ship-container"
  );
  shipVisualContainer.innerHTML = "";
  escadraArray.forEach((element) => {
    const innerArr = [];
    let newShipContainer;

    if (flag) {
      newShipContainer = document.createElement("div");
      newShipContainer.classList.add("cell__container");
      newShipContainer.dataset.id = counter++;
      shipVisualContainer.append(newShipContainer);
    }
    // const newShipContainer = document.createElement("div");
    // newShipContainer.classList.add("cell__container");
    // newShipContainer.dataset.id = counter++;
    // shipVisualContainer.append(newShipContainer);
    for (let i = 0; i < element; i++) {
      const cell = createCell();
      if (flag) {
        const newDeck = document.createElement("div");
        cell.div = newDeck;
        cell.div.classList.add("ship");
        newShipContainer.append(newDeck);
      }
      // // const newDeck = document.createElement("div");
      // // newDeck.classList.add("cube");
      // // newDeck.classList.add("ship");

      // // cell.div = newDeck;
      // // cell.div.classList.add("ship");
      // // newShipContainer.append(newDeck);
      innerArr.push(cell);
    }
    arrShips.push(innerArr);
  });
  return arrShips;
};

//=======================================================================
//=======================================================================
const dragNDrop = (arrShips, mainArrHuman) => {
  const shipContainer = document.querySelectorAll(".cell__container");
  for (const oneShip of shipContainer) {
    oneShip.onpointerdown = () => {
      oneShip.style.position = "fixed";
      // oneShip.style.pointerEvents = "none";
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
          if (oneShip.childNodes.length === 4) {
            oneShip.style.left = event.pageX + oneShip.offsetWidth + "px";
          } else if (oneShip.childNodes.length === 3) {
            oneShip.style.left = event.pageX + oneShip.offsetWidth / 2 + "px";
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
      if (targetElems[3].getAttribute("id") === "seabattle__sea-human") {
        const arrElems = targetElems;
        oneShip.style.position = "absolute";
        document.onpointermove = null;
        document.onkeydown = null;
        return examPosition(arrShips, arrElems, mainArrHuman, oneShip);
      } else {
        oneShip.style.position = "static";
        oneShip.className = "cell__container";
        document.onpointermove = null;
        document.onkeydown = null;
      }
    };
  }
};
export { showShips, dragNDrop };
