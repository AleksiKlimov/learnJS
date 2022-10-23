const examinationLocationShips = (matrixArray, length) => {
  let x = randomInteger();
  let y = randomInteger();
  const immutableX = x;
  const immutableY = y;
  let orientation = 0; //orientationPosition();
  const markerArr = [];
  if ((orientation && x + length <= 10) || (!orientation && y + length <= 10)) {
    if (!orientation) {
      for (let i = 0; i < length; i++) {
        matrixArray?.[y++]?.[x] === (5 || 4 || 3 || 2 || 1)
          ? markerArr.push(1)
          : markerArr;
      }
      matrixArray?.[y]?.[x] === (4 || 3 || 2 || 1)
        ? markerArr.push(1)
        : markerArr;
      matrixArray?.[y + 1]?.[x + 1] === (5 || 4 || 3 || 2 || 1)
        ? markerArr.push(1)
        : markerArr;
      matrixArray?.[y + 1]?.[x - 1] === (5 || 4 || 3 || 2 || 1)
        ? markerArr.push(1)
        : markerArr;

      for (let i = 0; i <= length + 1; i++) {
        matrixArray?.[y]?.[x + 1] === (4 || 3 || 2 || 1)
          ? markerArr.push(1)
          : markerArr;
        matrixArray?.[y--]?.[x - 1] === (4 || 3 || 2 || 1)
          ? markerArr.push(1)
          : markerArr;
      }
      matrixArray?.[++y]?.[x] === (4 || 3 || 2 || 1)
        ? markerArr.push(1)
        : markerArr;

      if (markerArr.length) {
        return examinationLocationShips(matrixArray, length);
      } else {
        return locationFunction(
          matrixArray,
          length,
          orientation,
          immutableX,
          immutableY
        );
      }
    }
  } else {
    return examinationLocationShips(matrixArray, length);
  }
};

const locationFunction = (matrixArray, length, orientation, x, y) => {
  if (orientation) {
    for (let i = 0; i < length; i++) {
      matrixArray[y][x++] = length;
    }
    console.log("call locationFunc");
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
    console.log("call locationFunc");

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
const arr = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
arr.forEach((item) => {
  examinationLocationShips(fieldHumanArr, item);
});
console.log(fieldHumanArr);
