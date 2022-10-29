const $fieldHuman = document.querySelector(".seabattle__sea-human");
const $fieldComputer = document.querySelector(".seabattle__sea-computer");
const $createElement = document.createElement("div");
const $visualShipEscadraHuman = document.querySelector(
  ".seabattle__escadra-human"
);
const $visualShipEscadraComputer = document.querySelector(
  ".seabattle__escadra-computer"
);

const flagTrue = true;
const flagFalse = false;

//======================================//
const createDefaultObj = () => {
  return {
    direction: null,
    ship: false,
  };
};

const createDefaultEscadra = (() => {
  return [4, 3, 3];
})();

const getRandomMatrixValue = (length) => {
  const randomValue = Math.random() * (10 - length);
  return Math.round(randomValue);
};

const getRandomShipOrientation = () => {
  const randomValue = Math.random() * 1;
  return Math.round(randomValue) ? "row" : "column";
};

const createBattleField = ($html, flag) => {
  const outerMatrix = [];
  for (let y = 0; y < 10; y++) {
    const innerMatrixRow = [];
    for (let x = 0; x < 10; x++) {
      //html=================================
      const $element = document.createElement("div");
      $element.dataset.y = y;
      $element.dataset.x = x;
      flag
        ? $element.classList.add("cell__gamer")
        : $element.classList.add("cell__computer");
      //obj==================================
      const defaultObj = createDefaultObj();
      defaultObj.y = y;
      defaultObj.x = x;
      defaultObj.elem = $element;
      $html.append($element);
      innerMatrixRow.push(defaultObj);
    }
    outerMatrix.push(innerMatrixRow);
  }
  // console.log(outerMatrix);
  return outerMatrix;
};

const createVisualShips = (escadraShips, $html, flag) => {
  const arrOuterShips = [];
  let count = 1;

  for (let y = 0; y < escadraShips.length; y++) {
    count++;
    const arrInnerShips = [];
    const $shipContainer = document.createElement("div");
    flag
      ? $shipContainer.classList.add("cell__container-human")
      : $shipContainer.classList.add("cell__container-computer");

    for (let x = 0; x < escadraShips[y]; x++) {
      //html element================================================
      //===============================
      const $elem = document.createElement("div");
      $elem.dataset.y = y;
      $elem.dataset.x = x;
      flag
        ? $elem.classList.add("ship__gamer")
        : $elem.classList.add("ship__computer");
      //create obj ============================================================
      //====================================
      const defaultObj = createDefaultObj();
      // defaultObj.y = y;
      // defaultObj.x = x;
      defaultObj.elem = $elem;
      defaultObj.ship = true;
      defaultObj.id = count;
      $shipContainer.append($elem);
      arrInnerShips.push(defaultObj);
    }
    $html.append($shipContainer);
    arrOuterShips.push(arrInnerShips);
  }
  console.log(arrOuterShips);
  return arrOuterShips;
};
//==================================================================
//manual
let fieldForHuman = createBattleField($fieldHuman, flagTrue);
const manualVisualShips = createVisualShips(
  createDefaultEscadra,
  $visualShipEscadraHuman,
  flagTrue
);

//===================================================================
//random
// const randomVarian = createBattleField($fieldHuman, flagTrue);
// const randomHiddenShips = createVisualShips(
//   createDefaultEscadra,
//   $visualShipEscadraHuman,
//   flagTrue
// );
//====================================================================
//start
const fieldForComputer = createBattleField($fieldComputer, flagFalse);
const escadraHiddenForComputer = createVisualShips(
  createDefaultEscadra,
  $visualShipEscadraComputer,
  flagFalse
);
//=====================================================================
const randomLocationShips = (shipsArray, matrixArray) => {
  const collection = document.querySelector(".seabattle__sea-human");
  for (let i = 0; i < shipsArray.length; i++) {
    console.log(shipsArray);

    let y = getRandomMatrixValue(shipsArray[i].length);
    let x = getRandomMatrixValue(shipsArray[i].length);
    const shipOrientation = getRandomShipOrientation(shipsArray[i].length);
    console.log(y, x, shipOrientation);

    if (shipOrientation === "row") {
      for (let k = x; k < x + shipsArray[i].length; k++) {
        if (matrixArray[y][k].ship) {
          console.log("call");
          console.log(shipsArray[i]);
          return randomLocationShips(
            [shipsArray[i], ...shipsArray],
            fieldForHuman
          );
        }
      }
      for (let j = x; j < x + shipsArray[i].length; j++) {
        if (!matrixArray[y][j].ship) {
          let indexElem;
          y === 0
            ? (indexElem = String(j))
            : (indexElem = String(y) + String(j));
          collection.children[indexElem].classList.add("ship__gamer");
          matrixArray[y][j].direction = "row";
          matrixArray[y][j].elem = shipsArray[i][0].elem;
        }
      }
      for (let j = x; j <= x + shipsArray[i].length + 1; j++) {
        matrixArray?.[y - 1]?.[j - 1]
          ? (matrixArray[y - 1][j - 1].ship = true)
          : matrixArray[0][0];
        matrixArray?.[y]?.[j - 1]
          ? (matrixArray[y][j - 1].ship = true)
          : matrixArray[0][0];
        matrixArray?.[y + 1]?.[j - 1]
          ? (matrixArray[y + 1][j - 1].ship = true)
          : matrixArray[0][0];
      }
    } else if (shipOrientation === "column") {
      for (let j = y; j < y + shipsArray[i].length; j++) {
        if (matrixArray[j][x].ship) {
          console.log("call");
          console.log(shipsArray[i]);
          return randomLocationShips(
            [shipsArray[i], ...shipsArray],
            fieldForHuman
          );
        }
      }
      for (let j = y; j < y + shipsArray[i].length; j++) {
        if (!matrixArray[j][x].ship) {
          let indexElem;
          j === 0 ? (indexElem = x) : (indexElem = String(j) + String(x));
          collection.children[indexElem].classList.add("ship__gamer");
          matrixArray[j][x].ship = true;
          matrixArray[j][x].direction = "column";
          matrixArray[j][x].elem = shipsArray[i][0].elem;
        }
      }
      for (let j = y; j <= y + shipsArray[i].length + 1; j++) {
        matrixArray?.[j - 1]?.[x - 1]
          ? (matrixArray[j - 1][x - 1].ship = true)
          : matrixArray[0][0];
        matrixArray?.[j - 1]?.[x]
          ? (matrixArray[j - 1][x].ship = true)
          : matrixArray[0][0];
        matrixArray?.[j - 1]?.[x + 1]
          ? (matrixArray[j - 1][x + 1].ship = true)
          : matrixArray[0][0];
      }
    }
    shipsArray.shift();
  }
  console.log(shipsArray, matrixArray);
};

document.onclick = (event) => {
  if (event.target.dataset.manual) {
  } else if (event.target.dataset.random) {
    $fieldHuman.innerHTML = "";
    fieldForHuman = createBattleField($fieldHuman, flagTrue);
    randomLocationShips(manualVisualShips, fieldForHuman);
  } else if (event.target.dataset.start) {
  }
};
