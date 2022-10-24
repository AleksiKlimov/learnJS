const createInterfaceField = (fullField, humanSea) => {
  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      let humanDiv = document.createElement("div");
      humanDiv.dataset.y = x;
      humanDiv.dataset.x = y;
      humanDiv.dataset.value = fullField[y][x];
      humanDiv.classList.add("cube");
      humanDiv.textContent = humanDiv.dataset.value;
      humanSea.append(humanDiv);
      humanDiv.dataset.value === "4"
        ? (humanDiv.style.background = "green")
        : humanDiv;
      humanDiv.dataset.value === "3"
        ? (humanDiv.style.background = "red")
        : humanDiv;
      humanDiv.dataset.value === "2"
        ? (humanDiv.style.background = "violet")
        : humanDiv;
      humanDiv.dataset.value === "1"
        ? (humanDiv.style.background = "blue")
        : humanDiv;
    }
  }
};
