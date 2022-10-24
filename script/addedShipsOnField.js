const examinationLocationShips = (matrixArray, length) => {
  let x = randomInteger();
  let y = randomInteger();
  let orientation = orientationPosition();
  if ((orientation && x + length <= 10) || (!orientation && y + length <= 10)) {
    if (!orientation) {
      //exam inner ships-----------------
      for (let i = y; i < y + length; i++) {
        if (matrixArray?.[i]?.[x] >= 1 && matrixArray?.[i]?.[x] <= 5) {
          return examinationLocationShips(matrixArray, length);
        }
      }
      //exam outer ships-----------------------
      for (let i = y; i <= y + length + 1; i++) {
        if (
          matrixArray?.[i - 1]?.[x - 1] >= 1 &&
          matrixArray?.[i - 1]?.[x - 1] <= 4
        ) {
          return examinationLocationShips(matrixArray, length);
        }
        if (matrixArray?.[i - 1]?.[x] >= 1 && matrixArray?.[i - 1]?.[x] <= 5) {
          return examinationLocationShips(matrixArray, length);
        }
        if (
          matrixArray?.[i - 1]?.[x + 1] >= 1 &&
          matrixArray?.[i - 1]?.[x + 1] <= 4
        ) {
          return examinationLocationShips(matrixArray, length);
        }
      }
      return locationFunction(matrixArray, length, orientation, x, y);
    }
    for (let i = x; i < x + length; i++) {
      if (matrixArray?.[y]?.[i] >= 1 && matrixArray?.[y]?.[i] <= 5) {
        return examinationLocationShips(matrixArray, length);
      }
    }
    for (let i = x; i <= x + length + 1; i++) {
      if (
        matrixArray?.[y - 1]?.[i - 1] >= 1 &&
        matrixArray?.[y - 1]?.[i - 1] <= 4
      ) {
        return examinationLocationShips(matrixArray, length);
      }
      if (matrixArray?.[y]?.[i - 1] >= 1 && matrixArray?.[y]?.[i - 1] <= 5) {
        return examinationLocationShips(matrixArray, length);
      }
      if (
        matrixArray?.[y + 1]?.[i - 1] >= 1 &&
        matrixArray?.[y + 1]?.[i - 1] <= 4
      ) {
        return examinationLocationShips(matrixArray, length);
      }
    }
    return locationFunction(matrixArray, length, orientation, x, y);
  } else {
    return examinationLocationShips(matrixArray, length);
  }
};

const locationFunction = (matrixArray, length, orientation, x, y) => {
  if (orientation) {
    for (let i = 0; i < length; i++) {
      matrixArray[y][x++] = length;
    }
    console.log("horiz");
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
};
