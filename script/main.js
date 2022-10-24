const createLogicField = () => {
  return new Array(10).fill(0).map((el) => new Array(10).fill(0));
};

const randomLocationShips = (fieldHuman) => {
  const arr = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  arr.forEach((item) => {
    examinationLocationShips(fieldHuman, item);
  });
  console.log(fieldHuman);
  return fieldHuman;
};

document.addEventListener("click", (event) => {
  if (event.target.dataset.start) {
    console.log("start");
  }
  if (event.target.dataset.random) {
    const fieldHuman = createLogicField();
    const fullField = randomLocationShips(fieldHuman);
    console.log(fullField);
    return createInterfaceFieldHuman(fullField);
  }
});
const printShipsField = () => {};
