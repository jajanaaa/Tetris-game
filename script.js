// const scoreDisplay = document.querySelector("#score");
// const startBtn = document.querySelector("#btn-start");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
// Selecting elements
const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll(".grid div")); //Array with 200 divs (index 0-199)
const width = 10; // 10 squares is width of the grid
let TimerId;

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
let current = blocks[1][0]; // first index is a block, second index its position
// Draw first position of first block
function draw() {
  current.forEach((index) =>
    squares[centralPosition + index].classList.add("block")
  );
}

function undraw() {
  current.forEach((index) =>
    squares[centralPosition + index].classList.remove("block")
  );
}

// Make the block go down
draw();

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

function freeze() {
  if (
    current.some((index) =>
      squares[centralPosition + index + width].classList.contains("bottom")
    )
  ) {
    clearInterval(timerId);
    current.forEach((index) =>
      squares[centralPosition + index].classList.add("bottom")
    );
    centralPosition = 4; // grid is 10 squares, because of 0 index 4 is center
    random = Math.floor(Math.random() * blocks.length);
    current = blocks[0][0];
    draw();
    timerId = setInterval(function moveDown() {
      undraw();
      centralPosition += width;
      draw();
      freeze();
    }, 500);
  }
}

// function freeze (){
//     if (current.some((index).classList.contains("block")) {
// console.log("lol")
//     });
// }
// startBtn.addEventListener("click", function () {
//   clearInterval(timerId);
// });

// clearInterval(interval name)

//FREZE
// function freeze() {
//   if (
//     current.some((index) =>
//       squares[centralPosition + index + width].classList.contains("taken")
//     )
//   ) {
//     current.forEach((index) =>
//       squares[centralPosition + index].classList.add("taken")
//     );
//   }
// }

// const array = [1, 2, 3, 4, 5];

// // checks whether an element is even
// itemsArray.some;
left.addEventListener("click", function () {
  undraw();
  const lefteage = current.some(
    (index) => (centralPosition + index) % width === 0
  );
  console.log(lefteage);
  if (!lefteage) {
    centralPosition -= 1;
  }
  draw();
});

//   [0, 1, 11, 21],

right.addEventListener("click", function () {
  undraw();
  centralPosition += 1;
  draw();
});
