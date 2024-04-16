let startTime;
let timer;
let running = false;
let laps = [];
let lapNumber = 1;
let pausedTime = 0;

function startPause() {
  if (!running) {
    startTimer();
  } else {
    pauseTimer();
  }
}

function startTimer() {
  let currentTime = Date.now();
  if (pausedTime !== 0) {
    startTime += currentTime - pausedTime;
    pausedTime = 0;
  } else {
    startTime = currentTime - (laps.length > 0 ? laps[laps.length - 1] : 0);
  }
  timer = setInterval(updateTime, 100);
  document.querySelector('.controls button:first-child').textContent = 'Pause';
  running = true;
}

function pauseTimer() {
  clearInterval(timer);
  document.querySelector('.controls button:first-child').textContent = 'Start';
  pausedTime = Date.now();
  running = false;
}

function lapReset() {
  if (running) {
    let lapTime = Date.now() - startTime;
    laps.push(lapTime);
    displayLap(lapTime);
  } else {
    resetTimer();
  }
}

function resetTimer() {
  clearInterval(timer);
  document.querySelector('.stopwatch').textContent = '00:00:00';
  document.querySelector('.controls button:first-child').textContent = 'Start';
  document.querySelector('.lap-times').innerHTML = '';
  running = false;
  laps = [];
  lapNumber = 1;
  pausedTime = 0;
}

function updateTime() {
  let currentTime = Date.now();
  let elapsedTime = currentTime - startTime;
  document.querySelector('.stopwatch').textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num, size = 2) {
  return num.toString().padStart(size, '0');
}

function displayLap(lapTime) {
  let lapTimeFormatted = formatTime(lapTime);
  let lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapNumber}: ${lapTimeFormatted}`;
  document.querySelector('.lap-times').appendChild(lapItem);
  lapNumber++;
}
