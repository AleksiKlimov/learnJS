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
  return examLocationOnField(mainArray, ships, y, x, arrCurrentElem[1]);
};
const examLocationOnField = function () {
  const mainArray = arguments[0];
  const arrayShip = arguments[1];
  const y = arguments[2];
  const x = arguments[3];
  const selectElem = arguments[4];
  for (let i = 0; i < arrayShip.length; i++) {
    let x = arrayShip[i].x;
    let y = arrayShip[i].y;
    console.log(mainArray[y][x].div, arrayShip[i].div.classList.add("hide"));
    console.log();
    if (!mainArray[y][x].ship) {
      mainArray[y][x] = arrayShip[i];
      arrayShip[i].div.className = "hide";
      // mainArray[y][x].div.className = "ship";

      // mainArray[y][x].div.style.background = "red";
      // selectElem.classList.add("hide");
    } else if (!mainArray[y][x].ship) {
      selectElem.style.position = "static";
    }
  }

  console.log(mainArray);
};
export { examPosition };
