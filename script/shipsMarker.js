const borderVerticalShipMarker = (arrayInfoPosition) => {
  let x = arrayInfoPosition[0];
  const lastPositionShips = arrayInfoPosition[1];
  let y = arrayInfoPosition[2];
  const orientation = arrayInfoPosition[3];
  const length = arrayInfoPosition[4];
  const matrixArray = arrayInfoPosition[5];

  if (!orientation) {
    matrixArray?.[y - 1]?.[x] === 0 || matrixArray?.[y - 1]?.[x] === 5
      ? (matrixArray[y - 1][x] = 5)
      : matrixArray[y][x];
    matrixArray?.[lastPositionShips]?.[x] === 0 ||
    matrixArray?.[lastPositionShips]?.[x] === 5
      ? (matrixArray[lastPositionShips][x] = 5)
      : matrixArray[y][x];
    for (let i = y; i <= y + length + 1; i++) {
      matrixArray?.[i - 1]?.[x - 1] === 0 || matrixArray?.[i - 1]?.[x - 1] === 5
        ? (matrixArray[i - 1][x - 1] = 5)
        : matrixArray[y][x];
      matrixArray?.[i - 1]?.[x + 1] === 0 || matrixArray?.[i - 1]?.[x + 1] === 5
        ? (matrixArray[i - 1][x + 1] = 5)
        : matrixArray[y][x];
    }
  }

  return matrixArray;
};

//=================================
const borderHorizontShipMarker = (arrayInfoPosition) => {
  let x = arrayInfoPosition[2];
  let y = arrayInfoPosition[1];
  let lastPositionShips = arrayInfoPosition[0];
  const orientation = arrayInfoPosition[3];
  const length = arrayInfoPosition[4];
  const matrixArray = arrayInfoPosition[5];
  if (orientation) {
    matrixArray?.[y]?.[x - 1] === 0 || matrixArray?.[y]?.[x - 1] === 5
      ? (matrixArray[y][x - 1] = 5)
      : matrixArray[y][x];
    matrixArray?.[y]?.[lastPositionShips] === 0 ||
    matrixArray?.[y]?.[lastPositionShips] === 5
      ? (matrixArray[y][lastPositionShips] = 5)
      : matrixArray[y][x];
    for (let i = x; i <= x + length + 1; i++) {
      matrixArray?.[y - 1]?.[i - 1] === 0 || matrixArray?.[y - 1]?.[i - 1] === 5
        ? (matrixArray[y - 1][i - 1] = 5)
        : matrixArray[y][x];
      matrixArray?.[y + 1]?.[i - 1] === 0 || matrixArray?.[y + 1]?.[i - 1] === 5
        ? (matrixArray[y + 1][i - 1] = 5)
        : matrixArray[y][x];
    }
    return matrixArray;
  }
};
export { borderHorizontShipMarker, borderVerticalShipMarker };
