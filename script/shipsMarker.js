const borderVerticalShipMarker = (arrayInfoPosition) => {
  let x = arrayInfoPosition[0];
  const lastPositionShips = arrayInfoPosition[1];
  let y = arrayInfoPosition[2];
  const orientation = arrayInfoPosition[3];
  const length = arrayInfoPosition[4];
  const matrixArray = arrayInfoPosition[5];
  console.log(x, y, lastPositionShips, length);
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
      return matrixArray;
    } else if (x === 0 && y > 0 && y < 9) {
      //vertical orient left/center
      matrixArray[--y][x] = 5;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray[y++][x + 1] = 5;
      }
      matrixArray[--y][x] = 5;
      return matrixArray;
    } else if (x === 9 && y > 0 && y < 9) {
      //vertical orient right/center
      matrixArray[--y][x] = 5;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray[y++][x - 1] = 5;
      }
      matrixArray[--y][x++] = 5;
      return matrixArray;
    } else if (y > 0 && y < 9 && x > 0 && x < 9 && lastPositionShips <= 9) {
      //vertical orient center/center
      matrixArray[--y][x] = 5;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray[y][x + 1] = 5;
        matrixArray[y++][x - 1] = 5;
      }
      matrixArray[--y][x] = 5;
      return matrixArray;
    }
  }
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
    if (y === 0 && x === 0) {
      //horizont orient left /top
      for (let i = 0; i <= length; i++) {
        matrixArray[y + 1][x++] = 5;
      }
      matrixArray[y][--x] = 5;
      return matrixArray;
    } else if (lastPositionShips - 1 === 9 && y === 0) {
      //right right/top
      for (let i = 0; i <= length; i++) {
        matrixArray[y + 1][--lastPositionShips] = 5;
      }
      matrixArray[y][--x] = 5;
      return matrixArray;
    } else if (lastPositionShips - 1 === 9 && y === 9) {
      //horizont pos right/bottom
      for (let i = 0; i <= length; i++) {
        matrixArray[y - 1][--lastPositionShips] = 5;
      }
      matrixArray[y][--x] = 5;
      return matrixArray;
    } else if (y === 9 && x === 0) {
      //horizont orient left/bottom
      for (let i = 0; i <= length; i++) {
        matrixArray[y - 1][x++] = 5;
      }
      matrixArray[y][--x] = 5;
      return matrixArray;
    } else if (x > 0 && x < 9 && y === 0) {
      //horizont pos top/center
      matrixArray[y][--x] = 5;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray[y + 1][x++] = 5;
      }
      matrixArray[y][--x] = 5;
      return matrixArray;
    } else if (y > 0 && y < 9 && lastPositionShips - 1 === 9) {
      // position right/center
      matrixArray[y][x - 1] = 5;
      for (let i = 0; i <= length; i++) {
        matrixArray[y - 1][x - 1] = 5;
        matrixArray[y + 1][x - 1] = 5;
        matrixArray[y][x++];
      }
      return matrixArray;
    } else if (x > 0 && x < 9 && y === 9) {
      //position horizont bottom/center
      matrixArray[y][--x] = 5;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray[y - 1][x++] = 5;
      }
      matrixArray[y][x - 1] = 5;
      return matrixArray;
    } else if (x === 0 && y > 0 && y < 9) {
      //pos horizont left/center
      for (let i = 0; i <= length; i++) {
        matrixArray[y - 1][x] = 5;
        matrixArray[y + 1][x] = 5;
        matrixArray[y][x++];
      }
      matrixArray[y][x - 1] = 5;
      return matrixArray;
    } else if (y > 0 && y < 9 && x > 0 && x < 9 && lastPositionShips <= 9) {
      //pos horizont center/center
      matrixArray[y][--x] = 5;
      for (let i = 0; i <= length + 1; i++) {
        matrixArray[y - 1][x] = 5;
        matrixArray[y + 1][x] = 5;
        matrixArray[y][++x];
      }
      matrixArray[y][x - 1] = 5;
      return matrixArray;
    }
  }
};
console.log(fieldHumanArr);
