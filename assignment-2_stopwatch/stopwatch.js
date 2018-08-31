/*jshint esversion: 6 */
/* Init Global Vars */
const startStopBtn = document.querySelector('#start-stop');
const resetBtn = document.querySelector('#reset');
const recordBtn = document.querySelector('#record');
const recordItm = document.querySelector('#recorded-times');
const elapsedTime = document.querySelector('#elapsed-time');
let miliseconds = 00;
let seconds = 00;
let minutes = 00;
let hours = 00;
let interval = null;
let timerActive = false;
let recordedTimes = [];

/* Event Listeners */

startStopBtn.addEventListener('click', function () {
  startTimer();
});

resetBtn.addEventListener('click', function () {
  restartTimer();
});

recordBtn.addEventListener('click', function () {
  recordTime();
});

document.addEventListener('keypress', (event) => {
  const key = event.keyCode;
  if (key === 115) { startTimer(); }
  if (key === 114) { restartTimer(); }
  if (key === 116) { recordTime(); }
});


/* Event Handler Functions */

const startTimer = () => {
  if (!timerActive) {
    runTimer()
    timerActive = true;
  } else {
    pauseTimer();
    timerActive = false;
  }
}

const runTimer = () => {
  interval = setInterval(function () {
    miliseconds++;
    if (miliseconds > 60) { 
      seconds++;
      miliseconds = 00;
    }
    
    if (seconds > 60) {
      minutes++;
      seconds = 00;
    }
    
    if (minutes > 60) {
      hours++;
      minutes = 00;
    }
    elapsedTime.innerHTML = `${hours} : ${minutes} : ${seconds} : ${miliseconds}`;
  }, 100);
};

const pauseTimer = () => {
  window.clearInterval(interval);
};

const restartTimer = () => {
  window.clearInterval(interval);
  interval = null;
  miliseconds = 00;
  seconds = 00;
  minutes = 00;
  hours = 00;
  elapsedTime.innerHTML = `${hours} : ${minutes} : ${seconds} : ${miliseconds}`;
};

const recordTime = () => {
  recordedTimes.push(`${hours} : ${minutes} : ${seconds} : ${miliseconds}`)
  recordItm.insertAdjacentHTML(
    "afterbegin",
    `<li class="recorded-time">${hours} : ${minutes} : ${seconds} : ${miliseconds}</li>`
  );
};

