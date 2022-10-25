const gameLoop = () => {
  logicHuman();
};
const logicComputer = () => {
  const fieldHuman = document.querySelector(".seabattle__sea-human");
  fieldHuman.addEventListener("click", () => {});
};
const logicHuman = () => {
  const fieldComputer = document.querySelector(".seabattle__sea-computer");
  fieldComputer.addEventListener("click", logic);
};

const logic = (event) => {
  console.log(event.target, event.currentTarget, event);
  if (event.target.dataset.value) {
  }
};
export { gameLoop, logicComputer, logicHuman, logic };
