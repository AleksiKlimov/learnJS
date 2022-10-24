const createInterfaceFieldHuman = (fullField) => {
  const humanSea = document.querySelector(".seabattle__sea-human");
  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      let div = document.createElement("div");
      div.dataset.y = x;

      div.dataset.x = y;
      div.dataset.value = fullField[y][x];
      div.classList.add("cube");
      div.textContent = div.dataset.value;
      humanSea.append(div);
      console.log(div.dataset.value);
      div.dataset.value === "4" ? (div.style.background = "green") : div;
      div.dataset.value === "3" ? (div.style.background = "red") : div;
      div.dataset.value === "2" ? (div.style.background = "violet") : div;
      div.dataset.value === "1" ? (div.style.background = "blue") : div;
    }
  }
};

const createInterfaceFieldComputer = (fullField) => {
  const humanSea = document.querySelector(".seabattle__sea-computer");
  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      let div = document.createElement("div");
      div.dataset.y = x;

      div.dataset.x = y;
      div.dataset.value = fullField[y][x];
      div.classList.add("cube");
      div.textContent = div.dataset.value;
      humanSea.append(div);
      console.log(div.dataset.value);
      div.dataset.value === "4" ? (div.style.background = "green") : div;
      div.dataset.value === "3" ? (div.style.background = "red") : div;
      div.dataset.value === "2" ? (div.style.background = "violet") : div;
      div.dataset.value === "1" ? (div.style.background = "blue") : div;
    }
  }
};
