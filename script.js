// const humanSea = document.querySelector(".seabattle__sea-human");
// for (let x = 0; x <= 9; x++) {
//   for (let y = 0; y <= 9; y++) {
//     let div = document.createElement("div");
//     div.dataset.y = x;
//     div.dataset.x = y;
//     div.dataset.value = 0;
//     div.classList.add("cube");
//     div.textContent = div.dataset.value;
//     humanSea.append(div);
//   }
// }

const shipsBaza = document.querySelector(".seabattle__sea-computer");

const fieldHuman1 = () => {
  console.log("call");
  return new Array(10).fill(0).map((el) => new Array(10).fill(0));
};
const fieldHumanArr = fieldHuman1();
const randomInteger = () => {
  let randomIndex = 0 + Math.random() * (9 + 1 - 0);
  return Math.floor(randomIndex);
};
const orientationPosition = () => {
  let randomPosition = 0 + Math.random() * (10 + 1 - 0);
  return Math.floor(randomPosition) % 2 === 0 ? 0 : 1;
  //x ==1 ->
  //y ==0
};

const borderShipMarker = (arrayInfoPosition) => {
  let x = arrayInfoPosition[0];
  const lastPositionShips = arrayInfoPosition[1];
  let y = arrayInfoPosition[2];
  const orientation = arrayInfoPosition[3];
  const length = arrayInfoPosition[4];
  const matrixArray = arrayInfoPosition[5];
  //vertical orientation
  if (!orientation) {
    if (y === 0 && x === 0) {
      //vertical left/top
      for (let i = 0; i < length + 1; i++) {
        matrixArray[y++][x + 1] = 5;
      }
      matrixArray[y - 1][x] = 5;
      return matrixArray;
    } else if (lastPositionShips - 1 === 9 && x === 0) {
      //vertical left/bottom
      matrixArray[--y][x] = 5;
      matrixArray[y][++x] = 5;
      for (let i = 0; i <= length; i++) {
        matrixArray[y++][x] = 5;
      }
      return matrixArray;
    } else if (y === 0 && x === 9) {
      //vertical orient right/top
      matrixArray[y][--x] = 5;
      for (let i = 0; i < length; i++) {
        matrixArray[++y][x] = 5;
      }
      matrixArray[y][++x] = 5;
      return matrixArray;
    } else if (x === 9 && lastPositionShips - 1 === 9) {
      // vertical orient right/bottom
      matrixArray[--y][x] = 5;
      matrixArray[y][--x] = 5;
      for (let i = 0; i < length; i++) {
        matrixArray[++y][x] = 5;
      }
    } else if (y === 0 && x > 0 && x < 9) {
      //vertical orient top/center
      matrixArray[y][x + 1] = 5;
      for (let i = 0; i <= length * 2; i++) {
        if (i < length) {
          matrixArray[++y][x + 1] = 5;
        } else {
          matrixArray[y--][x - 1] = 5;
        }
      }
      matrixArray[lastPositionShips][x] = 5;
      return matrixArray;
    } else if (lastPositionShips - 1 === 9 && x > 0 && x < 9) {
      //vertical orient bottom/center
      matrixArray[--y][--x] = 5;
      for (let i = 0; i <= length * 2; i++) {
        if (i < length) {
          matrixArray[++y][x] = 5;
        } else {
          matrixArray[y--][x + 2] = 5;
        }
      }
      matrixArray[++y][++x] = 5;
    } else if (x === 0 && y > 0 && y < 9) {
      //vertical orient left/center
      matrixArray[--y][x] = 5;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray[y++][x + 1] = 5;
      }
      matrixArray[--y][x] = 5;
    } else if (x === 9 && y > 0 && y < 9) {
      //vertical orient right/center
      matrixArray[--y][x] = 5;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray[y++][x - 1] = 5;
      }
      matrixArray[--y][x++] = 5;
    } else if (y > 0 && y < 9 && x > 0 && x < 9) {
      //vertical orien center/center
      matrixArray[--y][x] = 5;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray[y][x + 1] = 5;
        matrixArray[y++][x - 1] = 5;
      }
      matrixArray[--y][x] = 5;
    }
  }
  console.log(matrixArray);
};
let count = 0;
// console.log(fieldHuman1);
const locationFunction = (matrixArray, length) => {
  let x = randomInteger();
  let y = randomInteger();
  let orientation = 0; //orientationPosition();
  console.log("info", matrixArray[y][x]);
  if (
    (matrixArray[y][x] === 4 && matrixArray[y + length][x] === 4) ||
    matrixArray[y][x] === 5 ||
    (matrixArray[y][x] === 3 && matrixArray[y + length][x] === 3) ||
    (matrixArray[y][x] === 2 && matrixArray[y + length][x] === 2) ||
    (matrixArray[y][x] === 1 && matrixArray[y + length][x] === 3)
  ) {
    console.log(matrixArray, count++);
    orientationPosition();
    locationFunction(matrixArray, length);
  }
  if ((orientation && x + length <= 10) || (!orientation && y + length <= 10)) {
    if (orientation) {
      for (let i = 0; i < length; i++) {
        matrixArray[y][x++] = length;
      }
      return borderShipMarker([
        x - length,
        x,
        y,
        orientation,
        length,
        matrixArray,
      ]);
    } else if (!orientation) {
      for (let i = 0; i < length; i++) {
        matrixArray[y++][x] = length;
      }
      return borderShipMarker([
        x,
        y,
        y - length,
        orientation,
        length,
        matrixArray,
      ]);
    }
  } else {
    orientationPosition();
    locationFunction(matrixArray, length);
  }
};

const arr = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
arr.forEach((item) => locationFunction(fieldHumanArr, item));
