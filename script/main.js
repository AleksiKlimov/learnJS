const createLogicField = () => {
  return new Array(10).fill(0).map((el) => new Array(10).fill(0));
};

const randomLocationShips = (fieldHuman) => {
  const arr = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  arr.forEach((item) => {
    examinationLocationShips(fieldHuman, item);
  });

  return fieldHuman;
};

document.addEventListener("click", (event) => {
  const startButton = document.querySelector(".seabattle__button-start");
  const randomButton = document.querySelector(".seabattle__button-random");
  const manualButton = document.querySelector(".seabattle__button-manual");

  if (event.target.dataset.random) {
    const humanSea = document.querySelector(".seabattle__sea-human");
    humanSea.innerHTML = "";

    const fieldHuman = createLogicField();
    const fullField = randomLocationShips(fieldHuman);

    createInterfaceField(fullField, humanSea);
    manualButton.setAttribute("disabled", true);
    startButton.removeAttribute("disabled");
  } else if (event.target.dataset.manual) {
    const humanSea = document.querySelector(".seabattle__sea-human");
    humanSea.innerHTML = "";

    const fieldHuman = createLogicField();

    createInterfaceField(fieldHuman, humanSea);

    const ship = document.querySelector(".seabattle__ship-container");
    ship.classList.toggle("hide");
    randomButton.setAttribute("disabled", true);
    startButton.removeAttribute("disabled");
  } else if (event.target.dataset.start) {
    const computerSea = document.querySelector(".seabattle__sea-computer");
    computerSea.innerHTML = "";

    const fieldHuman = createLogicField();
    const fullField = randomLocationShips(fieldHuman);

    createInterfaceField(fullField, computerSea);
    gameLoop();
  }
});
const printShipsField = () => {};
