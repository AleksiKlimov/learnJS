const randomInteger = () => {
  const randomIndex = 0 + Math.random() * (9 + 1 - 0);
  return Math.floor(randomIndex);
};
const orientationPosition = () => {
  let randomPosition = 0 + Math.random() * (10 + 1 - 0);
  return Math.floor(randomPosition) % 2 === 0 ? 0 : 1;
  //x ==1 ->
  //y ==0
};
export { randomInteger, orientationPosition };
