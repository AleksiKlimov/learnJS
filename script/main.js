const fieldHuman1 = () => {
  console.log("call");
  return new Array(10).fill(0).map((el) => new Array(10).fill(0));
};
const fieldHumanArr = fieldHuman1();
