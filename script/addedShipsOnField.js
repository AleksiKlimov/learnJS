import { randomPositionShip } from "./getRandomPosShips.js";

const examPosition = function () {
  const arrShips = arguments[0];
  const arrCurrentElem = arguments[1];
  const mainArray = arguments[2];
  const elem = arguments[3];
  const id = elem.dataset.id;
  const directionLine = arrCurrentElem[1].className;
  const y = arrCurrentElem[2].dataset.y;
  const x = arrCurrentElem[2].dataset.x;
  const ships = arrShips[id];
  for (let i = 0; i < ships.length; i++) {
    ships[i].ship = true;
    if (directionLine === "cell__container") {
      ships[i].direction = "column";
      ships[i].x = +x;
      ships[i].y = +y + +i;
    } else if (directionLine === "cell__container horizontal") {
      ships[i].direction = "row";
      ships[i].x = +x + +i;
      ships[i].y = +y;
    }
  }
  return examLocationOnField(mainArray, ships, y, x, arrCurrentElem, true);
};
//===========================================================================
//=====================================================================================

const examLocationOnField = function () {
  const mainArray = arguments[0];
  const arrayShip = arguments[1];
  const y = arguments[2];
  const x = arguments[3];
  const selectElem = arguments?.[4]?.[1];
  const flag = arguments[5];
  //exam ship field on borders ==============================================
  if (flag) {
    if (+x + arrayShip.length > 10 && arrayShip[0].direction === "row") {
      selectElem.style.position = "static";
      selectElem.className = "cell__container";
      console.log("event");
      return;
    } else if (
      +y + arrayShip.length > 10 &&
      arrayShip[0].direction === "column"
    ) {
      selectElem.style.position = "static";
      selectElem.className = "cell__container";
      console.log("event");
      return;
    }
  }

  /////==========================================================
  //exam ship on the ship
  for (let i = 0; i < arrayShip.length; i++) {
    let x = arrayShip[i].x;
    let y = arrayShip[i].y;
    if (mainArray[y][x].ship) {
      if (flag) {
        selectElem.style.position = "static";
        selectElem.className = "cell__container";
        return;
      }
      return randomPositionShip(arrayShip, mainArray);
    }
  }
  //exam ship and write property in matrix
  for (let i = 0; i < arrayShip.length; i++) {
    let x = arrayShip[i].x;
    let y = arrayShip[i].y;
    if (mainArray[y][x].ship) {
      if (flag) {
        selectElem.style.position = "static";
        selectElem.className = "cell__container";
        return;
      }
      console.log("event");
      return randomPositionShip(arrayShip, mainArray);
    } else if (!mainArray[y][x].ship) {
      mainArray[y][x].div.className = "ship";
      mainArray[y][x] = arrayShip[i];
      arrayShip[i].div.className = "hide";
    }
  }
  if (arrayShip[0].direction === "row") {
    for (let i = x; i <= +x + arrayShip.length + 1; i++) {
      mainArray?.[+y + 1]?.[i - 1]
        ? (mainArray[+y + 1][i - 1].ship = true)
        : mainArray?.[y]?.[i];
      mainArray?.[y]?.[i - 1]
        ? (mainArray[y][i - 1].ship = true)
        : mainArray?.[y]?.[i];
      mainArray?.[y - 1]?.[i - 1]
        ? (mainArray[y - 1][i - 1].ship = true)
        : mainArray?.[y]?.[i];
    }
  } else if (arrayShip[0].direction === "column") {
    for (let i = y; i <= +y + arrayShip.length + 1; i++) {
      mainArray?.[i - 1]?.[x - 1]
        ? (mainArray[i - 1][x - 1].ship = true)
        : mainArray?.[i]?.[x];
      mainArray?.[i - 1]?.[x]
        ? (mainArray[i - 1][x].ship = true)
        : mainArray?.[i]?.[x];
      mainArray?.[i - 1]?.[+x + 1]
        ? (mainArray[i - 1][+x + 1].ship = true)
        : mainArray?.[i]?.[x];
    }
  }
  console.log(mainArray);
  return mainArray;
};
export { examPosition, examLocationOnField };
