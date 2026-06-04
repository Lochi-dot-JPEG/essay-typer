let timerDisplay = document.getElementById("Timer");
setInterval(TickTimer, 1000); // Tick timer every second

let ticks = 0;
let seconds_remaining = 0;

function StartTimer(minutes) {
  seconds_remaining = minutes * 60;
}

function TickTimer() {
  seconds_remaining--;
  UpdateDisplay();
}

function UpdateDisplay() {
  const seconds = String(seconds_remaining % 60).padStart(2, "0");
  const minutes = String(Math.floor(seconds_remaining / 60)).padStart(2, "0");
  timerDisplay.innerHTML = minutes + ":" + seconds;
}

StartTimer(2);
UpdateDisplay();
