/*jshint esversion: 6 */
/* Init Global Vars */
const cells = document.querySelectorAll(".cell");
const timer = document.querySelector("#timer");
const winner = document.querySelector("#winner");
const resetBtn = document.querySelector("#reset-btn");
const valArr = ["🍜", "💩", "🤷‍", "👺", "🤬", "🍜", "🤷‍", "👺", "🤬"];
let selectedItems = [];
let seconds = 0;
let matchCounter = 0;
let timerStarted = false;
let interval = null;

resetBtn.addEventListener("click", function () {
  window.location.reload(true);
});

/* Randomize Array */
const shuffle = array => {
  let ctr = array.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = array[ctr];
    array[ctr] = array[index];
    array[index] = temp;
  }
  return array;
};

const shuffledArr = shuffle(valArr);

/* Timer Function */

const beginTimer = () => {
  if (timerStarted == false) {
    interval = setInterval(function () {
      seconds++;
    }, 1000)
    timerStarted = true;
  }
};

const youWon = () => {
  window.clearInterval(interval);
  winner.innerHTML = `Congratulations! You won in ${seconds} seconds!`;
  document.querySelector(".modal").style.display = "block";
};

/* Create Event Listener Function on all cells */
const cellClicked = (self, callback) => {
  selectedItems.push(self.id);
  selectedItems[0] === selectedItems[1] ? (selectedItems = 0) : callback(self);
};

/* Create function to assess selection */
const checkSelected = self => {
  let cellPlcr = self.querySelector(".cell-plcr");
  let cellImg = self.querySelector(".cell-img");
  let firstGuess = document.querySelector(`#${selectedItems[0]}`);
  let secondGuess = document.querySelector(`#${selectedItems[1]}`);

  beginTimer();
  
  cellPlcr.style.display = "none";
  cellImg.style.display = "block";
  self.style.backgroundColor = "#3CE000";

  if (selectedItems.length === 2) {
    if (firstGuess.innerHTML === secondGuess.innerHTML) {
      firstGuess.classList.add("matched");
      secondGuess.classList.add("matched");
      selectedItems = [];
      matchCounter++;
    } else {
      setTimeout(cellsReset.bind(cellPlcr, cellImg, self), 500);
    }

    if (firstGuess.innerHTML === secondGuess.innerHTML && matchCounter === 4) {
      youWon();
    }
  }
};

/* Create Reset Function */
const cellsReset = (plcr, img, self) => {
  selectedItems = [];
  for (let cell of cells) {
    if (!cell.classList.contains("matched")) {
      cell.querySelector(".cell-plcr").style.display = "block";
      cell.querySelector(".cell-img").style.display = "none";
      cell.style.backgroundColor = "#5218FA";
    }
  }
};

/* Randomize and distribute card values */
for (let idx in cells) {
  let cur = cells[idx];
  cur.insertAdjacentHTML(
    "beforeend",
    '<div class="cell-img">' + shuffledArr[idx] + "</div>"
  );
  cur.addEventListener("click", function () {
    cellClicked(this, checkSelected);
  });
}
