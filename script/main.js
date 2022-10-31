const $fieldHuman = document.querySelector(".seabattle__sea-human");
const $fieldComputer = document.querySelector(".seabattle__sea-computer");
const $createElement = document.createElement("div");
const $visualShipEscadraHuman = document.querySelector(
  ".seabattle__escadra-human"
);
const $visualShipEscadraComputer = document.querySelector(
  ".seabattle__escadra-computer"
);
const $blockButton = document.querySelector(".seabattle__block-info-text");
const shotsComputer = [];
const shotsGamer = [];
const flagTrue = true;
const flagFalse = false;
let manualLocationField;
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
const fieldForHuman = createBattleField($fieldHuman, flagTrue);
//===============================================================================
const fieldForComputer = createBattleField($fieldComputer, flagFalse);
//===============================================================================
const randomLocationShips = (shipsArray, matrixArray, flag) => {
  for (let i = 0; i < shipsArray.length; i++) {
    const y = getRandomMatrixValue(shipsArray[i].length);
    const x = getRandomMatrixValue(shipsArray[i].length);
    const shipOrientation = getRandomShipOrientation(shipsArray[i].length);
    //=
    const dx = shipOrientation === "row";
    const dy = shipOrientation === "column";
    for (let j = 0; j < shipsArray[i].length; j++) {
      const cx = +x + dx * j;
      const cy = +y + dy * j;
      if (matrixArray[cy][cx].ship) {
        const arrReturn = shipsArray.slice(i);
        return randomLocationShips(arrReturn, matrixArray, flag);
      }
    }
    for (let cy = y - 1; cy < +y + shipsArray[i].length * dy + dx + 1; cy++) {
      for (let cx = x - 1; cx < +x + shipsArray[i].length * dx + dy + 1; cx++) {
        matrixArray?.[cy]?.[cx]
          ? (matrixArray[cy][cx].ship = true)
          : fieldForHuman;
      }
    }
    for (let k = 0; k < shipsArray[i].length; k++) {
      const cx = +x + dx * k;
      const cy = +y + dy * k;
      let indexElem;
      +cy === 0 && dx
        ? (indexElem = String(cx))
        : (indexElem = String(cy) + String(cx));
      +cy === 0 && dy
        ? (indexElem = String(cx))
        : (indexElem = String(cy) + String(cx));
      flag
        ? $fieldHuman.children?.[+indexElem]?.classList.remove("cell__gamer")
        : $fieldComputer.children?.[+indexElem]?.classList.remove(
            "cell__computer"
          );

      flag
        ? $fieldHuman.children?.[+indexElem]?.classList.add("ship__gamer")
        : $fieldComputer.children?.[+indexElem]?.classList.add(
            "ship__computer"
          );
      matrixArray[cy][cx].direction = shipOrientation;
      matrixArray[cy][cx].elem = shipsArray[i][0].elem;
      matrixArray[cy][cx].id = shipsArray[i][0].id;
      matrixArray[cy][cx].cell = k + 1;
      matrixArray[cy][cx].length = shipsArray[i].length;
    }
  }
  return matrixArray;
};
const examManualLocation = (ship, fieldForHuman, y, x, height) => {
  const $element = ship;
  let direction = $element?.className;
  const dx = direction === "cell__container-human row";
  const dy = direction === "cell__container-human";
  direction === "cell__container-human"
    ? (direction = "column")
    : (direction = "row");
  for (let i = 0; i < height; i++) {
    const cx = +x + dx * i;
    const cy = +y + dy * i;
    if (fieldForHuman[cy][cx].ship) {
      $visualShipEscadraHuman.append($element),
        ($element.style.position = "static");
      $element.classList.remove("row");
      document.onpointerdown = null;
      document.onpointerup = null;
      return;
    }
  }
  for (let i = 0; i < height; i++) {
    const cx = +x + dx * i;
    const cy = +y + dy * i;
    fieldForHuman[cy][cx].direction = direction;
    fieldForHuman[cy][cx].cell = i + 1;
    fieldForHuman[cy][cx].length = height;
    let indexElem;
    +cy === 0 && dx
      ? (indexElem = String(cx))
      : (indexElem = String(cy) + String(cx));
    +cy === 0 && dy
      ? (indexElem = String(cx))
      : (indexElem = String(cy) + String(cx));
    $fieldHuman.children?.[+indexElem]?.classList.add("ship__gamer");
    $fieldHuman.children?.[+indexElem]?.classList.remove("cell__gamer");
    $element.classList.add("hide");
  }
  for (let cy = y - 1; cy < +y + height * dy + dx + 1; cy++) {
    for (let cx = x - 1; cx < +x + height * dx + dy + 1; cx++) {
      fieldForHuman?.[cy]?.[cx]
        ? (fieldForHuman[cy][cx].ship = true)
        : fieldForHuman;
    }
  }
  manualLocationField = fieldForHuman;
};
//======================================================
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
                (document.onkeydown = null),
                ($VisualShip.onpointerup = null);
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
//====================================miss==killed============================================================
const $buttonStart = document.querySelector(".seabattle__button-start");
const $buttonRandom = document.querySelector(".seabattle__button-random");
const $buttonManual = document.querySelector(".seabattle__button-manual");
const $manualStart = document.querySelector(".seabattle__button-manual-start");
$buttonStart.disabled = true;
$manualStart.disabled = true;
//====================================miss==killed============================================================
const showBoard = (mainArray, y, x, length, dx, dy, flag) => {
  for (cy = y - 1; cy < +y + length * dy + dx + 1; cy++) {
    for (cx = x - 1; cx < +x + length * dx + dy + 1; cx++) {
      if (mainArray?.[cy]?.[cx]) {
        cy === 0 && dx
          ? (indexElem = String(cx))
          : (indexElem = String(cy) + String(cx));
        cy === 0 && dy
          ? (indexElem = String(cx))
          : (indexElem = String(cy) + String(cx));
        if (flag) {
          $fieldComputer.children[+indexElem].classList.remove(
            "cell__computer"
          );
          $fieldComputer.children[+indexElem].classList.add("killed");
        } else if (!flag) {
          $fieldHuman.children[+indexElem].classList.remove("cell__computer");
          $fieldHuman.children[+indexElem].classList.add("killed");
        }
        mainArray[cy][cx].ship = false;
        mainArray[cy][cx].cell = 0;
        mainArray[cy][cx].shit = true;
      }
    }
  }
};
//=================================================================
const eventLoopComputer = (
  mainArray,
  arrayCount,
  mainArrayHuman,
  shitsCount
) => {
  let count = 0;
  const y = getRandomMatrixValue(1);
  const x = getRandomMatrixValue(1);
  if (mainArray?.[y]?.[x].shit) {
    console.log(y, x);
    return eventLoopComputer(mainArray, arrayCount, mainArrayHuman, shitsCount);
  }
  mainArray[y][x].shit = true;
  const dx = mainArray?.[y]?.[x].direction === "row";
  const dy = mainArray?.[y]?.[x].direction === "column";
  const cell = mainArray?.[y]?.[x].cell;
  let indexElem;
  +y === 0 && dx
    ? (indexElem = String(x))
    : (indexElem = String(y) + String(x));
  +y === 0 && dy
    ? (indexElem = String(y))
    : (indexElem = String(y) + String(x));
  const $cellElement = $fieldHuman.children[+indexElem].closest(".cell__gamer");
  const $shipElement = $fieldHuman.children[+indexElem].closest(".ship__gamer");
  const length = mainArray?.[y]?.[x].length;
  if ($cellElement?.className === "cell__gamer") {
    $cellElement.classList.remove("cell__gamer");
    $cellElement.classList.add("miss");
  } else if ($shipElement?.className === "ship__gamer") {
    mainArray[y][x].ship = false;
    $shipElement.classList.remove("ship__gamer");
    $shipElement.classList.add("wounder");
  }
  if ($shipElement) {
    eventLoopComputer(mainArray, arrayCount, mainArrayHuman, shitsCount);
    arrayCount.push(1);
    if (arrayCount.length === 20) {
      return setTimeout(
        (() => alert("game over, win gamer"),
        ($fieldHuman.innerHTML = ""),
        ($fieldComputer.innerHTML = ""),
        createBattleField($fieldHuman, flagTrue),
        createBattleField($fieldComputer, flagFalse)),
        6000
      );
    }
    const outerX = +x + dx * 0 - dx * (cell - 1);
    const outerY = +y + dy * 0 - dy * (cell - 1);
    for (let i = 0; i < length; i++) {
      const cx = +x + dx * i - dx * (cell - 1);
      const cy = +y + dy * i - dy * (cell - 1);
      if (mainArray?.[cy]?.[cx]) {
        if (!mainArray[cy][cx].ship) {
          count++;
        }
        if (count === length) {
          return showBoard(
            mainArray,
            outerY,
            outerX,
            length,
            dx,
            dy,
            flagFalse
          );
        }
      }
    }
  } else if (!dx && !dy) {
    return eventLoopHuman(mainArrayHuman, shitsCount, mainArray, arrayCount);
  }
};
const eventLoopHuman = (
  mainArray,
  arrayCount,
  mainArrayComputer,
  countHitsComputer
) => {
  $fieldComputer.onclick = (event) => {
    let count = 0;
    const x = event.target.dataset.x;
    const y = event.target.dataset.y;
    console.log(y, x);
    if (mainArray?.[y]?.[x].shit) {
      return eventLoopHuman(
        mainArray,
        arrayCount,
        mainArrayComputer,
        countHitsComputer
      );
    }
    mainArray[y][x].shit = true;
    const $cellElement = event.target.closest(".cell__computer");
    const $shipElement = event.target.closest(".ship__computer");
    const dx = mainArray?.[y]?.[x].direction === "row";
    const dy = mainArray?.[y]?.[x].direction === "column";
    const cell = mainArray?.[y]?.[x].cell;
    const length = mainArray?.[y]?.[x].length;
    if (event.target === $cellElement) {
      $cellElement.classList.remove("cell__computer");
      $cellElement.classList.add("miss");
    } else if (event.target === $shipElement) {
      mainArray[y][x].ship = false;
      $shipElement.classList.remove("ship__computer");
      $shipElement.classList.add("wounded");
    }
    if ($shipElement) {
      arrayCount.push(1);
      if (arrayCount.length === 20) {
        return setTimeout(
          (() => alert("game over, win gamer"),
          ($fieldHuman.innerHTML = ""),
          ($fieldComputer.innerHTML = ""),
          createBattleField($fieldHuman, flagTrue),
          createBattleField($fieldComputer, flagFalse)),
          6000
        );
      }
      const outerX = +x + dx * 0 - dx * (cell - 1);
      const outerY = +y + dy * 0 - dy * (cell - 1);
      for (let i = 0; i < length; i++) {
        const cx = +x + dx * i - dx * (cell - 1);
        const cy = +y + dy * i - dy * (cell - 1);
        if (mainArray?.[cy]?.[cx]) {
          if (!mainArray[cy][cx].ship) {
            count++;
          }
          if (count === length) {
            return showBoard(
              mainArray,
              outerY,
              outerX,
              length,
              dx,
              dy,
              flagTrue
            );
          }
        }
      }
    } else if (!dx && !dy) {
      return eventLoopComputer(
        mainArrayComputer,
        countHitsComputer,
        mainArray,
        arrayCount
      );
    }
  };
};
document.onclick = (event) => {
  if (event.target.dataset.manual === "manual") {
    $fieldHuman.innerHTML = "";
    $visualShipEscadraComputer.innerHTML = "";
    $visualShipEscadraHuman.innerHTML = "";
    const fieldForHuman = createBattleField($fieldHuman, flagTrue);
    const manualVisualShips = createVisualShips(
      createDefaultEscadra(),
      $visualShipEscadraHuman,
      flagTrue
    );
    $manualStart.disabled = false;
    $buttonManual.disabled = true;
    $buttonRandom.disabled = true;
    $buttonStart.disabled = true;
    $visualShipEscadraComputer.classList.add("hide");
  } else if (event.target.dataset.random === "random") {
    $fieldHuman.innerHTML = "";
    $visualShipEscadraHuman.innerHTML = "";
    $fieldComputer.innerHTML = "";
    $visualShipEscadraComputer.innerHTML = "";
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
    //=============================================================
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
    const logicHuman = eventLoopHuman(
      computerFieldWithShips,
      shotsGamer,
      gamerFieldWithShips,
      shotsComputer
    );
    $buttonManual.disabled = true;
    $buttonStart.disabled = false;
    $visualShipEscadraHuman.classList.add("hide");
    $visualShipEscadraComputer.classList.add("hide");
  } else if (event.target.dataset.start === "random-start") {
    $buttonRandom.disabled = true;
    $buttonManual.disabled = true;
    $buttonStart.disabled = true;
  } else if (event.target.dataset.manual === "manual-start") {
    $fieldComputer.innerHTML = "";
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
    const logicHuman = eventLoopHuman(
      computerFieldWithShips,
      shotsGamer,
      manualLocationField,
      shotsComputer
    );
  }
};
//====================================miss==killed============================================================
