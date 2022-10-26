const examPosition = function () {
  const arrShips = arguments[0];
  const arrCurrentElem = arguments[1];
  const mainArray = arguments[2];
  console.log(arrShips[0][0].direction);
  const y = arrCurrentElem[2].dataset.y;
  const x = arrCurrentElem[2].dataset.x;
  console.log(y, x);
};
export { examPosition };
