const examinationLocationShips = (matrixArray, length) => {
  let x = 3; //randomInteger();
  let y = 3; //randomInteger();
  const immutableX = x;
  const immutableY = y;

  let orientation = 0; //orientationPosition();
  const markerArr = [];
  console.log(2, "call exam", matrixArray[y][x]);
  if ((orientation && x + length <= 10) || (!orientation && y + length <= 10)) {
    if (!orientation) {
      matrixArray[y][x] === (5 || 4 || 3 || 2 || 1)
        ? markerArr.push(1)
        : markerArr;
      matrixArray?.[--y]?.[x] === (4 || 3 || 2 || 1)
        ? markerArr.push(1)
        : markerArr;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray?.[y]?.[x + 1] === (4 || 3 || 2 || 1)
          ? markerArr.push(1)
          : markerArr;
        matrixArray?.[y++]?.[x - 1] === (4 || 3 || 2 || 1)
          ? markerArr.push(1)
          : markerArr;
      }
      matrixArray?.[--y][x] === (4 || 3 || 2 || 1)
        ? markerArr.push(1)
        : markerArr;

      console.log(markerArr);
      if (markerArr.length) {
        console.log(markerArr);
        examinationLocationShips(matrixArray, length);
      } else {
        console.log("call locationFunc", markerArr);
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
  // console.log("info", matrixArray[y][x]);

  // if ((orientation && x + length <= 10) || (!orientation && y + length <= 10)) {
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
const arr = [4, 3];
arr.forEach((item) => {
  examinationLocationShips(fieldHumanArr, item);
});
