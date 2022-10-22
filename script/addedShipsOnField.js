const examinationLocationShips = (matrixArray, length) => {
  let x = 6; //randomInteger();
  let y = 0; //randomInteger();
  let orientation = 1; //orientationPosition();
  if ((orientation && x + length <= 10) || (!orientation && y + length <= 10)) {
    // if (
    //   matrixArray[y][x] === (5 || 4 || 3 || 2 || 1) &&
    //   matrixArray[y][x + 1] === (4 || 3 || 2 || 1) &&
    //   matrixArray[y][x - 1] === (4 || 3 || 2 || 1) &&
    //   matrixArray[y + length][x] === (4 || 3 || 2 || 1) &&
    //   matrixArray[y - 1][x] === (5 || 4 || 3 || 2 || 1) &&
    //   matrixArray[y - 1][x + 1] === (5 || 4 || 3 || 2 || 1) &&
    //   matrixArray[y - 1][x - 1] === (5 || 4 || 3 || 2 || 1) &&
    //   matrixArray[y + length][x + 1] === (5 || 4 || 3 || 2 || 1) &&
    //   matrixArray[y + length][x - 1] === (5 || 4 || 3 || 2 || 1) &&
    //   matrixArray[y + length - 1][x + 1] === (5 || 4 || 3 || 2 || 1) &&
    //   matrixArray[y + length - 1][x - 1] === (5 || 4 || 3 || 2 || 1)
    // ) {
    //   return examinationLocationShips(matrixArray, length);
    // }

    return locationFunction(matrixArray, length, orientation, x, y);
  } else {
    return examinationLocationShips(matrixArray, length);
  }
};

const locationFunction = (matrixArray, length, orientation, x, y) => {
  // console.log("info", matrixArray[y][x]);

  // if ((orientation && x + length <= 10) || (!orientation && y + length <= 10)) {
  if (orientation) {
    for (let i = 0; i < length; i++) {
      matrixArray[y][x++] = length;
    }
    return borderHorizontShipMarker([
      x,
      y,
      x - length,
      orientation,
      length,
      matrixArray,
    ]);
  } else if (!orientation) {
    for (let i = 0; i < length; i++) {
      matrixArray[y++][x] = length;
    }
    return borderVerticalShipMarker([
      x,
      y,
      y - length,
      orientation,
      length,
      matrixArray,
    ]);
  }
  // // } else {
  // orientationPosition();
  // locationFunction(matrixArray, length);
  // }
};
const arr = [4];
arr.forEach((item) => {
  examinationLocationShips(fieldHumanArr, item);
});
