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
const scoreDisplay = document.querySelector("#display-score");
const leftBtn = document.querySelector("#btn-left");
const rightBtn = document.querySelector("#btn-right");
const downBtn = document.querySelector("#btn-down");
const rotateBtn = document.querySelector("#btn-rotate");

let miniSquares = Array.from(document.querySelectorAll(".mini-grid div"));

let TimerId;
let score = 0;
let nextRandom = 0;
let ifGameOver = false;
let textGameOver = document.querySelector("#game-over");
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
  [-1, 0, 1, 2], //0
  [0, width, width * 2, width * 3], //1
  [-1, 0, 1, 2], //2
  [0, width, width * 2, width * 3], //3
];

const lBlock = [
  [0, 1, width + 1, width * 2 + 1], //0
  [2, width, width + 1, width + 2], //1
  [1, width + 1, width * 2 + 1, width * 2 + 2], //2
  [width, width + 1, width + 2, width * 2], //3
];

const jBlock = [
  [0, 1, width, width * 2], //0
  [width, width + 1, width + 2, width * 2 + 2], //1
  [0, width, width * 2, width * 2 - 1], //2
  [0, width, width + 1, width + 2], //3
];

const oBlock = [
  [0, 1, width, width + 1], //0
  [0, 1, width, width + 1], //1
  [0, 1, width, width + 1], //2
  [0, 1, width, width + 1], //3
];

const tBlock = [
  [0, width - 1, width, width + 1], //0
  [0, width, width + 1, width * 2], //1
  [width - 1, width, width + 1, width * 2], //2
  [0, width, width - 1, width * 2], //3
];

const zBlock = [
  [-1, 0, width, width + 1], //0
  [0, width, width + 1, width * 2 + 1], //1
  [0, 1, width, width, width - 1], //2
  [0, width, width + 1, width * 2 + 1], //3
];

const blocks = [iBlock, lBlock, jBlock, oBlock, tBlock, zBlock]; //5

let centralPosition = 4; // grid is 10 squares, because of 0 index 4 is center, add 4 to index to move block to the center of the grid
let random = Math.floor(Math.random() * blocks.length);
let currentRotation = 0;
let current = blocks[random][currentRotation]; // first index is a block, second index its position

// COLOR SELECTED SQUARES TO DISPLAY A BLOCK
function draw() {
  current.forEach((index) => {
    squares[centralPosition + index].classList.add("block"),
      (squares[centralPosition + index].style.backgroundColor = colors[random]);
  });
} //For each randomly selected block and its rotation we add class "block" and background color to each of its squares
function undraw() {
  current.forEach((index) => {
    squares[centralPosition + index].classList.remove("block"),
      (squares[centralPosition + index].style.backgroundColor = "");
  });
} // To move a block down we first need to undraw it and draw it again in a next line

// MOVE DOWN FUNCTION
function moveDown() {
  undraw();
  centralPosition += width;
  draw();
  freeze();
}

// MOVE LEFT FUNCTION
function moveLeft() {
  const leftEdge = current.some(
    (index) => (centralPosition + index) % width === 0
  );
  undraw();
  if (!leftEdge) {
    centralPosition -= 1;
  }
  if (
    current.some((index) =>
      squares[centralPosition + index].classList.contains("bottom")
    )
  ) {
    centralPosition += 1;
  }
  draw();
}

// MOVE RIGHT FUNCTION
function moveRight() {
  undraw();
  const rightEdge = current.some(
    (index) => (centralPosition + index) % width === width - 1
  );
  if (!rightEdge) {
    centralPosition += 1;
  }
  if (
    current.some((index) =>
      squares[centralPosition + index].classList.contains("bottom")
    )
  ) {
    centralPosition -= 1;
  }
  draw();
}
// ROTATE FUNCTION
function rotateBlock() {
  const leftEdge = current.some(
    (index) => (centralPosition + index) % width === 0
  );
  const rightEdge = current.some(
    (index) => (centralPosition + index) % width === width - 1
  );

  if (!(leftEdge | rightEdge)) {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = blocks[random][currentRotation];
  }
  draw();
}

// FREEZE FUNCTION
function freeze() {
  if (
    current.some((index) =>
      squares[centralPosition + index + width].classList.contains("bottom")
    )
  ) {
    clearInterval(TimerId);
    current.forEach((index) =>
      squares[centralPosition + index].classList.add("bottom")
    );
    centralPosition = 4;
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * blocks.length);
    current = blocks[random][currentRotation];
    addScore();
    draw();
    displayMini();
    TimerId = setInterval(moveDown, 500);
    gameOver();
  }
}

// DISPLAY MINI GRID
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
    miniSquares[index + displayIndex + miniWidth].style.backgroundColor =
      colors[nextRandom];
  });
}

// START BTN
startBtn.addEventListener("click", function () {
  if (TimerId) {
    clearInterval(TimerId);
    TimerId = null;
    //The result of the setTimeout() always returns a Number. This number represents the ID value of the timer that is set. Use this value with the clearTimeout() method to cancel the timer.
    startBtn.innerText = "START";
  } else {
    draw();
    displayMini();
    TimerId = setInterval(moveDown, 500);
    startBtn.innerText = "PAUSE";
  }
  if (ifGameOver) {
    window.location.reload();
  }
});

// ADD SCORE
function addScore() {
  for (let i = 0; i < 199; i += width) {
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];

    if (row.every((index) => squares[index].classList.contains("bottom"))) {
      score += 10;
      scoreDisplay.innerHTML = score;
      row.forEach((index) => {
        squares[index].classList.remove("bottom");
        squares[index].classList.remove("block");
        squares[index].style.backgroundColor = "";
      });
      const squaresRemoved = squares.splice(i, width);
      squares = squaresRemoved.concat(squares);
      squares.forEach((cell) => grid.appendChild(cell));
    }
  }
}

//GAME OVER FUNCTION
function gameOver() {
  if (
    current.some((index) =>
      squares[centralPosition + index + width].classList.contains("bottom")
    )
  ) {
    ifGameOver = true;
    textGameOver.innerText = "GAME OVER";
    startBtn.innerText = "AGAIN";
    clearInterval(TimerId);
    TimerId = null;
  }
}

// KEY PRESS AND BUTTONS EVENTS
function control(e) {
  if (e.keyCode === 37) {
    // Left arrow
    moveLeft();
  }
  if (e.keyCode === 39) {
    // Right arrow
    moveRight();
  }
  if (e.keyCode === 38) {
    // Arrow up
    rotateBlock();
  }
  if (e.keyCode === 40) {
    // Arrow down
    moveDown();
  }
}
document.addEventListener("keydown", control);

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);
rotateBtn.addEventListener("click", rotateBlock);
downBtn.addEventListener("click", moveDown);
