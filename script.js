const humanSea = document.querySelector(".seabattle__sea-human");
for (let x = 0; x <= 9; x++) {
  for (let y = 0; y <= 9; y++) {
    let div = document.createElement("div");
    div.dataset.y = x;
    div.dataset.x = y;
    div.dataset.value = 0;
    div.classList.add("cube");
    div.textContent = div.dataset.value;
    humanSea.append(div);
  }
}

const shipsBaza = document.querySelector(".seabattle__sea-computer");

const fieldHuman1 = new Array(10).fill(0).map((el) => new Array(10).fill(0));

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
  let y = arrayInfoPosition[2];
  let orientation = arrayInfoPosition[3];
  let length = arrayInfoPosition[4];
  const matrixArray = arrayInfoPosition[5];
  if (orientation) {
    let coordsLastDeckX = arrayInfoPosition[1];
  } else {
    let coordsLastDeckY = arrayInfoPosition[1];
  }
  if (!orientation) {
    if (y === 0 && x === 0) {
      for (let i = 0; i < length + 1; i++) {
        matrixArray[y++][x + 1] = 5;
      }
      matrixArray[y - 1][x] = 5;
      console.log("pere");
      return matrixArray;
    } else if (coordsLastDeckY === 6 && x === 0) {
      matrixArray[--y][x] = 5;
      matrixArray[y][++x] = 5;
      console.log(matrixArray);

      for (let i = 0; i <= length; i++) {
        matrixArray[y++][x] = 5;
      }
      return matrixArray;
    }
  }
};
// console.log(fieldHuman1);
const locationFunction = (matrixArray, length) => {
  let x = 0; //randomInteger();
  let y = 6; //randomInteger();
  let orientation = 0; //orientationPosition();
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
locationFunction(fieldHuman1, 3);
