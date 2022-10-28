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

const createDefaultObj = () => {
  return {
    x: 0,
    y: 0,
    direction: null,
    ship: false,
  };
};

const createDefaultEscadra = (() => {
  return [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
})();

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

  for (let y = 0; y < escadraShips.length; y++) {
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
      defaultObj.y = y;
      defaultObj.x = x;
      defaultObj.elem = $elem;
      defaultObj.direction = defaultObj.ship = true;
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
const manualVariant = createBattleField($fieldHuman, flagTrue);
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

document.onclick = (event) => {
  if (event.target.dataset.manual) {
  } else if (event.target.dataset.random) {
  } else if (event.target.dataset.start) {
  }
};
