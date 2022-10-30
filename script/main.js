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

const createDefaultEscadra = () => {
  return [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
};

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
  let count = 0;

  for (let y = 0; y < escadraShips.length; y++) {
    const arrInnerShips = [];
    const $shipContainer = document.createElement("div");
    flag
      ? $shipContainer.classList.add("cell__container-human")
      : $shipContainer.classList.add("cell__container-computer");
    flag ? ($shipContainer.dataset.id = count) : $shipContainer;
    count++;

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
  return arrOuterShips;
};
//==================================================================
//manual
const fieldForHuman = createBattleField($fieldHuman, flagTrue);
// const manualVisualShips = createVisualShips(
//   createDefaultEscadra(),
//   $visualShipEscadraHuman,
//   flagTrue
// );

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
// const escadraHiddenForComputer = createVisualShips(
//   createDefaultEscadra(),
//   $visualShipEscadraComputer,
//   flagFalse
// );
//=====================================================================
const randomLocationShips = (shipsArray, matrixArray, flag) => {
  for (let i = 0; i < shipsArray.length; i++) {
    const y = getRandomMatrixValue(shipsArray[i].length);
    const x = getRandomMatrixValue(shipsArray[i].length);
    const shipOrientation = getRandomShipOrientation(shipsArray[i].length);

    if (shipOrientation === "row") {
      for (let k = x; k < x + shipsArray[i].length; k++) {
        if (matrixArray[y][k].ship) {
          const arrReturn = shipsArray.slice(i);
          return randomLocationShips(arrReturn, matrixArray, flag);
        }
      }

      for (let j = x; j < x + shipsArray[i].length; j++) {
        let indexElem;
        y === 0 ? (indexElem = String(j)) : (indexElem = String(y) + String(j));
        flag
          ? $fieldHuman.children[indexElem].classList.add("ship__gamer")
          : $fieldComputer.children[indexElem].classList.add("ship__computer");

        matrixArray[y][j].direction = "row";
        matrixArray[y][j].elem = shipsArray[i][0].elem;
      }
      for (let j = x; j <= x + shipsArray[i].length + 1; j++) {
        matrixArray?.[y - 1]?.[j - 1]
          ? (matrixArray[y - 1][j - 1].ship = true)
          : matrixArray[y][x];
        matrixArray?.[y]?.[j - 1]
          ? (matrixArray[y][j - 1].ship = true)
          : matrixArray[y][x];
        matrixArray?.[y + 1]?.[j - 1]
          ? (matrixArray[y + 1][j - 1].ship = true)
          : matrixArray[y][x];
      }
    } else if (shipOrientation === "column") {
      for (let j = y; j < y + shipsArray[i].length; j++) {
        if (matrixArray[j][x].ship) {
          const arrReturn = shipsArray.slice(i);
          return randomLocationShips(arrReturn, matrixArray, flag);
        }
      }
      for (let j = y; j < y + shipsArray[i].length; j++) {
        if (!matrixArray[j][x].ship) {
          let indexElem;
          j === 0 ? (indexElem = x) : (indexElem = String(j) + String(x));
          flag
            ? $fieldHuman.children[indexElem].classList.add("ship__gamer")
            : $fieldComputer.children[indexElem].classList.add(
                "ship__computer"
              );

          matrixArray[j][x].ship = true;
          matrixArray[j][x].direction = "column";
          matrixArray[j][x].elem = shipsArray[i][0].elem;
        }
      }
      for (let j = y; j <= y + shipsArray[i].length + 1; j++) {
        matrixArray?.[j - 1]?.[x - 1]
          ? (matrixArray[j - 1][x - 1].ship = true)
          : matrixArray[y][x];
        matrixArray?.[j - 1]?.[x]
          ? (matrixArray[j - 1][x].ship = true)
          : matrixArray[y][x];
        matrixArray?.[j - 1]?.[x + 1]
          ? (matrixArray[j - 1][x + 1].ship = true)
          : matrixArray[y][x];
      }
    }
  }
  return matrixArray;
};

const examManualLocation = (ship, fieldForHuman, y, x, height) => {
  const $element = ship;
  let direction = $element.className;
  const dx = direction === "cell__container-human row";
  const dy = direction === "cell__container-human";
  direction === "cell__container-human"
    ? (direction = "column")
    : (direction = "row");
  for (let i = 0; i < height; i++) {
    const cx = +x + dx * i;
    const cy = +y + dy * i;
    console.log(cx, cy);
    if (fieldForHuman[cy][cx].ship) {
      $visualShipEscadraHuman.append($element),
        ($element.style.position = "static");
      $element.classList.remove("row");
      return;
    }
  }
  for (let i = 0; i < height; i++) {
    const cx = +x + dx * i;
    const cy = +y + dy * i;
    fieldForHuman[cy][cx].ship = true;
    fieldForHuman[cy][cx].direction = direction;
    // fieldForHuman[cy][cx].elem =
    //   fieldForHuman[cy][cx].elem.classList.add("ship__gamer");
  }
  for (let cy = y - 1; cy < y + 2; y++) {
    for (let cx = x - 1; cx < x + height + 1; x++) {
      console.log(cy, cx);
      // if (fieldForHuman?.[cy]?.[cx]) {
      // fieldForHuman[cy][cx].free = false;
      // }
    }
  }
};

$visualShipEscadraHuman.onpointerdown = (event) => {
  if (event.target.closest(".cell__container-human")) {
    const $VisualShip = event.target.parentElement;
    let height = $VisualShip.children.length;
    const idEventElement = event.target.parentElement.dataset.id;
    document.onpointermove = (event) => {
      $VisualShip.style.position = "fixed";
      if ($VisualShip.className === "cell__container-human") {
        $VisualShip.style.top =
          event.pageY - $VisualShip.offsetWidth / 2 + "px";
        $VisualShip.style.left =
          event.pageX - $VisualShip.offsetWidth / 2 + "px";
      } else if ($VisualShip.className === "cell__container-human row") {
        if (height === 4) {
          $VisualShip.style.top =
            event.pageY - $VisualShip.offsetWidth * 2 + "px";
          $VisualShip.style.left = event.pageX + $VisualShip.offsetWidth + "px";
        }
        if (height === 3) {
          $VisualShip.style.top =
            event.pageY - $VisualShip.offsetWidth * 1.5 + "px";
          $VisualShip.style.left =
            event.pageX + $VisualShip.offsetWidth / 2 + "px";
        }
        if (height === 2) {
          $VisualShip.style.top = event.pageY - $VisualShip.offsetWidth + "px";
          $VisualShip.style.left = event.pageX + "px";
        }
        if (height === 1) {
          $VisualShip.style.top =
            event.pageY - $VisualShip.offsetWidth / 2 + "px";
          $VisualShip.style.left =
            event.pageX - $VisualShip.offsetWidth / 2 + "px";
        }
      }
      document.onkeydown = (event) => {
        if (event.code === "Space") {
          $VisualShip.classList.toggle("row");
          console.log($VisualShip);
        }
      };
      $VisualShip.onpointerup = (event) => {
        const $fieldElem = document.elementsFromPoint(
          event.clientX,
          event.clientY
        );
        if ($fieldElem[3].id === "seabattle__sea-human") {
          const y = $fieldElem[2].dataset.y;
          const x = $fieldElem[2].dataset.x;
          console.log(y, x);
          if ($fieldElem[1].className === "cell__container-human") {
            if (+$fieldElem[2].dataset.y + +height > 10) {
              $VisualShip.style.position = "static";
              document.onpointermove = null;
              document.onkeydown = null;
              $VisualShip.classList.remove("row");
              return;
            } else {
              ($VisualShip.style.position = "absolute"),
                $fieldHuman.append($VisualShip),
                ($VisualShip.style.top = 20 * y + "px"),
                ($VisualShip.style.left = 20 * x + "px"),
                (document.onpointermove = null),
                (document.onkeydown = null);
              return examManualLocation(
                $VisualShip,
                fieldForHuman,
                y,
                x,
                height
              );
            }
          } else if ($fieldElem[1].className === "cell__container-human row") {
            if (+$fieldElem[2].dataset.x + +height > 10) {
              ($VisualShip.style.position = "static"),
                (document.onpointermove = null),
                (document.onkeydown = null),
                $VisualShip.classList.remove("row");
              return;
            } else if (height === 4) {
              ($VisualShip.style.position = "absolute"),
                $fieldHuman.append($VisualShip),
                ($VisualShip.style.top =
                  20 * y - $VisualShip.offsetWidth * 1.5 + "px"),
                ($VisualShip.style.left =
                  20 * x + $VisualShip.offsetWidth * 1.5 + "px"),
                (document.onpointermove = null),
                (document.onkeydown = null);
            } else if (height === 3) {
              ($VisualShip.style.position = "absolute"),
                $fieldHuman.append($VisualShip),
                ($VisualShip.style.top =
                  20 * y - $VisualShip.offsetWidth + "px"),
                ($VisualShip.style.left =
                  20 * x + $VisualShip.offsetWidth + "px"),
                (document.onpointermove = null),
                (document.onkeydown = null);
            } else if (height === 2) {
              ($VisualShip.style.position = "absolute"),
                $fieldHuman.append($VisualShip),
                ($VisualShip.style.top =
                  20 * y - $VisualShip.offsetWidth / 2 + "px"),
                ($VisualShip.style.left =
                  20 * x + $VisualShip.offsetWidth / 2 + "px"),
                (document.onpointermove = null),
                (document.onkeydown = null);
            } else if (height === 1) {
              ($VisualShip.style.position = "absolute"),
                $fieldHuman.append($VisualShip),
                ($VisualShip.style.top = 20 * y + "px"),
                ($VisualShip.style.left = 20 * x + "px"),
                (document.onpointermove = null),
                (document.onkeydown = null);
            }
            return examManualLocation($VisualShip, fieldForHuman, y, x, height);
          }
        } else {
          $VisualShip.style.position = "static";
          document.onpointermove = null;
          document.onkeydown = null;
          $VisualShip.classList.remove("row");
        }
      };
    };
  }
};

document.onclick = (event) => {
  if (event.target.dataset.manual) {
    $fieldHuman.innerHTML = "";
    const fieldForHuman = createBattleField($fieldHuman, flagTrue);

    $visualShipEscadraHuman.innerHTML = "";
    const manualVisualShips = createVisualShips(
      createDefaultEscadra(),
      $visualShipEscadraHuman,
      flagTrue
    );
  } else if (event.target.dataset.random) {
    $fieldHuman.innerHTML = "";
    $visualShipEscadraHuman.innerHTML = "";
    const fieldForHuman = createBattleField($fieldHuman, flagTrue);
    const manualVisualShips = createVisualShips(
      createDefaultEscadra(),
      $visualShipEscadraHuman,
      flagTrue
    );
    const gamerFieldWithShips = randomLocationShips(
      manualVisualShips,
      fieldForHuman,
      flagTrue
    );
    console.log(gamerFieldWithShips);
  } else if (event.target.dataset.start) {
    $fieldComputer.innerHTML = "";
    $visualShipEscadraComputer.innerHTML = "";
    const fieldForComputer = createBattleField($fieldComputer, flagFalse);
    const escadraHiddenForComputer = createVisualShips(
      createDefaultEscadra(),
      $visualShipEscadraComputer,
      flagFalse
    );
    const computerFieldWithShips = randomLocationShips(
      escadraHiddenForComputer,
      fieldForComputer,
      flagFalse
    );
    console.log(computerFieldWithShips);
  }
};
