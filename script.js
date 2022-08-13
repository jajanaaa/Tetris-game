const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector("#btn-start");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const rotate = document.querySelector("#rotate");
// Selecting elements
const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll(".grid div")); //Array with 200 divs (index 0-199)
const width = 10; // 10 squares is width of the grid
let TimerId;
score = 0;
let ifgameOver = false;
// Drawing blocks
const iblock = [
  [-1, 0, 1, 2],
  [0, width, width * 2, width * 3],
  [-1, 0, 1, 2],
  [0, width, width * 2, width * 3],
];

const lblock = [
  [0, 1, width + 1, width * 2 + 1],
  [2, width, width + 1, width + 2],
  [0, width, width * 2, width * 2 + 1],
  [0, 1, 2, width],
];

const jblock = [
  [0, 1, width, width * 2],
  [0, 1, 2, width + 2],
  [1, width + 1, width * 2, width * 2 + 1],
  [0, width, width + 1, width + 2],
];

const oblock = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const tblock = [
  [0, width - 1, width, width + 1],
  [0, width, width + 1, width * 2],
  [-1, 0, 1, width],
  [0, width, width - 1, width * 2],
];

const zblock = [
  [-1, 0, width, width + 1],
  [0, width, width + 1, width * 2 + 1],
  [0, 1, width, width, width - 1],
  [0, width, width + 1, width * 2 + 1],
];

const blocks = [iblock, lblock, jblock, oblock, tblock, zblock];

let centralPosition = 4; // grid is 10 squares, because of 0 index 4 is center
let random = Math.floor(Math.random() * blocks.length);
let currentRotation = 0;
let current = blocks[random][currentRotation]; // first index is a block, second index its position
// Draw first position of first block
function draw() {
  current.forEach((index) =>
    squares[centralPosition + index].classList.add("block")
  );
}

// draw();

function undraw() {
  current.forEach((index) =>
    squares[centralPosition + index].classList.remove("block")
  );
}

// Make the block go down
// draw();

// let timerId = setInterval(function moveDown() {
//   undraw();
//   centralPosition += width;
//   draw();
//   freeze();
// }, 500);

// function freeze() {
//   if (
//     current.some((index) =>
//       squares[centralPosition + index + width].classList.contains("taken")
//     )
//   ) {
//     clearInterval(timerId);
//   }
// }
// We need to add 10 divs after container and check + width(10) because next coming div has to stop not once there is a div with a class of bottom but on top of that div

left.addEventListener("click", function () {
  undraw();
  const lefteage = current.some(
    (index) => (centralPosition + index) % width === 0
  );
  console.log(lefteage);
  if (!lefteage) {
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
});

right.addEventListener("click", function () {
  undraw();
  const righteage = current.some(
    (index) => (centralPosition + index) % width === width - 1
  );
  if (!righteage) {
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
});

// ROTATE BLOCK

rotate.addEventListener("click", function () {
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
});

function moveDown() {
  undraw();
  centralPosition += width;
  draw();
  freeze();
}

startBtn.addEventListener("click", function () {
  if (TimerId) {
    clearInterval(TimerId);
    TimerId = null;
    //The result of the setTimeout() always returns a Number. This number represents the ID value of the timer that is set. Use this value with the clearTimeout() method to cancel the timer.
    startBtn.innerText = "Start";
  } else {
    draw();
    TimerId = setInterval(moveDown, 500);
    startBtn.innerText = "Pause";
  }
  if (ifgameOver) {
    window.location.reload();
  }
});

// TimerId = setInterval(moveDown, 500);

//add functionality to the button
// startBtn.addEventListener('click', () => {
//   if (timerId) {
//     clearInterval(timerId)
//     timerId = null
//   } else {
//     draw()
//     timerId = setInterval(moveDown, 1000)
//     nextRandom = Math.floor(Math.random()*theTetrominoes.length)
//     displayShape()
//   }
// })

// let timerId = setInterval(function moveDown() {
//   undraw();
//   centralPosition += width;
//   draw();
//   freeze();
// }, 500);
function gameOver() {
  if (
    current.some((index) =>
      squares[centralPosition + index].classList.contains("bottom")
    )
  ) {
    ifgameOver = true;
    alert("GAME OVER!");
    clearInterval(TimerId);
    startBtn.innerText = "TRY AGAIN";
  }
}

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
    centralPosition = 4; // grid is 10 squares, because of 0 index 4 is center
    random = Math.floor(Math.random() * blocks.length);
    current = blocks[random][currentRotation];
    draw();
    // speed = 100;
    TimerId = setInterval(moveDown, 500);

    // TimerId = setInterval(function () {
    //   undraw();
    //   centralPosition += width;
    //   draw();
    //   freeze();
    // }, 500);
    addScore();
    gameOver();
  }
  // gameOver();
}

// GEME OVER
// function gameOver() {
//   if (
//     current.some((index) =>
//       squares[centralPosition + index].classList.contains("bottom")
//     )
//   ) {
//     clearInterval(TimerId);
//   }
// }
// console.log(current[squares[14]].classList.contains("bottom"));

// const bottom = document.querySelector("#bottom");
function control(e) {
  if (e.keyCode === 40) {
    moveDown();
  }
}
document.addEventListener("keydown", control);

bottom.addEventListener("click", moveDown);

// Make last row dissaper
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
      console.log("row is full");
      score += 10;
      scoreDisplay.innerHTML = score;
      row.forEach((index) => squares[index].classList.remove("bottom"));
      row.forEach((index) => squares[index].classList.remove("block"));
      const squaresRemoved = squares.splice(i, width);
      console.log(squaresRemoved);
      squares = squaresRemoved.concat(squares);
      squares.forEach((cell) => grid.appendChild(cell));
    }
  }
}

// MOVE ELEMENTS ON BUTTONS AND KEYS
// SEE PREVIOUS ELEMENT
// GAME OVER
// ELEMENTS LOCATION
