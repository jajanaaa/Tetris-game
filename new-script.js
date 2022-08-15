// CREATE 200 DIV 10 width * 20 height) AND 10 DIV FOR THE BOTTOM OF THE CONTAINER IN HTML
let grid = document.getElementsByClassName("grid")[0];
for (let i = 0; i < 210; i++) {
  let element = document.createElement("div");
  if (i >= 200) {
    element.classList.add("bottom");
  }
  grid.appendChild(element);
}
// CREATE 36 DIV (6 * 6) FOR THE MINI GRID
let miniGrid = document.getElementsByClassName("mini-grid")[0];
for (let i = 0; i < 36; i++) {
  let element = document.createElement("div");
  miniGrid.appendChild(element);
}

//SELECT ELEMENTS
let squares = Array.from(document.querySelectorAll(".grid div")); //Array with 200 div (index 0-199)
const width = 10; // 10 squares is width of the grid

const startBtn = document.querySelector("#btn-start");
const scoreDisplay = document.querySelector("#score-display");
const leftBtn = document.querySelector("#btn-left");
const rightBtn = document.querySelector("#btn-right");
const downBtn = document.querySelector("#btn-down");
const rotateBtn = document.querySelector("#btn-rotate");

let miniSquares = Array.from(document.querySelectorAll(".mini-grid div"));

let TimerId;
score = 0;
let nextRandom = 0;

const colors = [
  "#4285F4",
  "#FBBC04",
  "#EA4335",
  "#34A853",
  "#FF6D01",
  "#46BDC6",
];

//DRAW BLOCKS
const iBlock = [
  [-1, 0, 1, 2],
  [0, width, width * 2, width * 3],
  [-1, 0, 1, 2],
  [0, width, width * 2, width * 3],
];

const lBlock = [
  [0, 1, width + 1, width * 2 + 1],
  [2, width, width + 1, width + 2],
  [1, width + 1, width * 2 + 1, width * 2 + 2],
  [width, width + 1, width + 2, width * 2],
];

const jBlock = [
  [0, 1, width, width * 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [0, width, width * 2, width * 2 - 1],
  [0, width, width + 1, width + 2],
];

const oBlock = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const tBlock = [
  [0, width - 1, width, width + 1],
  [0, width, width + 1, width * 2],
  [width - 1, width, width + 1, width * 2],
  [0, width, width - 1, width * 2],
];

const zBlock = [
  [-1, 0, width, width + 1],
  [0, width, width + 1, width * 2 + 1],
  [0, 1, width, width, width - 1],
  [0, width, width + 1, width * 2 + 1],
];

const blocks = [iBlock, lBlock, jBlock, oBlock, tBlock, zBlock];

let centralPosition = 4; // grid is 10 squares, because of 0 index 4 is center
let random = Math.floor(Math.random() * blocks.length);
let currentRotation = 0;
let current = blocks[random][currentRotation]; // first index is a block, second index its position

function draw() {
  current.forEach((index) => {
    squares[centralPosition + index].classList.add("block"),
      (squares[centralPosition + index].style.backgroundColor = colors[random]);
  });
}

draw();

function undraw() {
  current.forEach((index) => {
    squares[centralPosition + index].classList.remove("block"),
      (squares[centralPosition + index].style.backgroundColor = "");
  });
}

function rotateBlock() {
  const lefteage = current.some(
    (index) => (centralPosition + index) % width === 0
  );
  const righteage = current.some(
    (index) => (centralPosition + index) % width === width - 1
  );

  if (!(lefteage | righteage)) {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = blocks[random][currentRotation];
  }
  draw();
}

// ROTATE BLOCK

rotateBtn.addEventListener("click", rotateBlock);

const miniWidth = 6;
let displayIndex = 2;

const nextBlock = [
  [miniWidth - 1, miniWidth, miniWidth + 1, miniWidth + 2], //0
  [0, 1, miniWidth + 1, miniWidth * 2 + 1], //1
  [0, 1, miniWidth, miniWidth * 2], //2
  [miniWidth, miniWidth + 1, miniWidth * 2, miniWidth * 2 + 1], //3
  [miniWidth, miniWidth * 2 - 1, miniWidth * 2, miniWidth * 2 + 1], //4
  [miniWidth - 1, miniWidth, miniWidth * 2, miniWidth * 2 + 1], //5
];

function displayMini() {
  miniSquares.forEach((square) => {
    square.classList.remove("block");
    square.style.backgroundColor = "";
  });
  nextBlock[nextRandom].forEach((index) => {
    miniSquares[index + displayIndex + miniWidth].classList.add("block");
    // miniSquares[index + displayIndex].style.backgroundColor =
    //   colors[nextRandom];
  });
}

displayMini();
