const fieldHuman1 = () => {
  console.log("call");
  return new Array(10).fill(0).map((el) => new Array(10).fill(0));
};
const fieldHumanArr = fieldHuman1();

// if (
//   matrixArray[y][x] === (5 || 4 || 3 || 2 || 1) &&
//   matrixArray[y]?.[x + 1] === (4 || 3 || 2 || 1) &&
//   matrixArray[y]?.[x - 1] === (4 || 3 || 2 || 1) &&
//   matrixArray?.[y + length][x] === (4 || 3 || 2 || 1) &&
//   matrixArray?.[y - 1][x] === (5 || 4 || 3 || 2 || 1) &&
//   matrixArray?.[y - 1]?.[x + 1] === (5 || 4 || 3 || 2 || 1) &&
//   matrixArray?.[y - 1]?.[x - 1] === (5 || 4 || 3 || 2 || 1) &&
//   matrixArray?.[y + length]?.[x + 1] === (5 || 4 || 3 || 2 || 1) &&
//   matrixArray?.[y + length]?.[x - 1] === (5 || 4 || 3 || 2 || 1) &&
//   matrixArray?.[y + length - 1]?.[x + 1] === (5 || 4 || 3 || 2 || 1) &&
//   matrixArray?.[y + length - 1]?.[x - 1] === (5 || 4 || 3 || 2 || 1)
// ) {
//   return examinationLocationShips(matrixArray, length);
// }
