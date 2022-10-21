//flag start game after press button Play
//and forbids location ships
let startGame = false;
//flag event listener manual location ships
// and editing this location
let isHandlerPlacement = false;
//flag event Listener leave sea battle
let isHandlerController = false;
//flag blocking actions gamer on time shooting computer
let compShot = false;

const getElement = (id) => document.getElementById(id);

const getCoordinates = (el) => {
  const coords = el.getBoundingClientRect();
  return {
    left: coords.left,
    right: coords.right,
    top: coords.top,
    bottom: coords.bottom,
  };
};
// const humanField = getElement("seabattle__sea-human");

// const computerField = getElement("seabattle__sea-computer");

const field = {
  fieldSide: 200,
  ship: 20,
  shipData: {
    fourDeck: [1, 4],
    threeDeck: [3, 2],
    twoDeck: [3, 2],
    oneDeck: [4, 1],
  },
  squadron: {},
  matrix: [],
  // fieldCoord: getCoordinates(humanField),
};

const fieldHuman = new Array(10).fill(0).map((el) => new Array(10).fill(0));

const ships = {
  fourDeck: {
    length: 4,
    hits: 0,
    live: true,
    count: 1,
    hit(num) {},
    isSunk() {},
  },
  threeDeck: {
    length: 3,
    hits: 0,
    live: true,
    count: 2,
    hit(num) {},
    isSunk() {},
  },
  twodeck: {
    length: 2,
    hits: 0,
    live: true,
    count: 3,
    hit(num) {},
    isSunk() {},
  },
  onedeck: {
    length: 1,
    hits: 0,
    live: true,
    count: 4,
    hit(num) {},
    isSunk() {},
  },
};
