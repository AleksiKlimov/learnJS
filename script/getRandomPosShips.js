import { examLocationOnField } from "./addedShipsOnField.js";
const randomCoordinates = (length) => {
  const random = Math.random() * (10 - length);
  console.log(Math.round(random));
  return Math.round(random);
};
const randomOrientation = () => {
  const randomPos = Math.random() * 1;
  return Math.round(randomPos) ? "row" : "column";
};

const randomPositionShip = (escadraArray, mainArrHuman) => {
  for (let i = 0; i < escadraArray.length; i++) {
    console.log(escadraArray[i].length);
    // escadraArray[i][0].direction = randomOrientation();
    escadraArray[i][0].direction = randomOrientation();
    escadraArray[i][0].y = randomCoordinates(escadraArray[i].length);
    escadraArray[i][0].x = randomCoordinates(escadraArray[i].length);

    for (let j = 0; j < escadraArray[i].length; j++) {
      escadraArray[i][j].direction = escadraArray[i][0].direction;
      if (escadraArray[i][0].direction === "row") {
        console.log("event");
        escadraArray[i][j].x = escadraArray[i][0].x + j;
        escadraArray[i][j].y = escadraArray[i][0].y;
      } else if (escadraArray[i][0].direction === "column") {
        escadraArray[i][j].x = escadraArray[i][0].x;
        escadraArray[i][j].y = escadraArray[i][0].y + j;
      }
    }
    examLocationOnField(
      mainArrHuman,
      escadraArray[i],
      escadraArray[i][0].y,
      escadraArray[i][0].x,
      null,
      false
    );
  }
  console.log(escadraArray);
};

export { randomPositionShip, randomCoordinates, randomOrientation };
