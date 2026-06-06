let timerDisplay = document.getElementById("Timer");
setInterval(TickTimer, 1000); // Tick timer every second

let ticks = 0;
let seconds_remaining = 0;

function StartTimer(minutes) {
  seconds_remaining = minutes * 60;

  textAreaElement.removeAttribute("disabled");
  last_text = "";
  UpdateDisplay();
}

function TickTimer() {
  if (Paused) {
    return;
  }
  seconds_remaining--;
  if (seconds_remaining < 0) {
    seconds_remaining = 0;
  }
  UpdateDisplay();
}

function UpdateDisplay() {
  if (seconds_remaining == 0) {
    timerDisplay.innerHTML = "Finished!";
    StopTyping();

    return;
  }
  const seconds = String(seconds_remaining % 60).padStart(2, "0");
  const minutes = String(Math.floor(seconds_remaining / 60)).padStart(2, "0");
  timerDisplay.innerHTML = minutes + ":" + seconds;
}
function StopTyping() {
  RenderMarkdown(false);
  textAreaElement.setAttribute("disabled", "");
  continueButton.innerText = "Continue";
}

UpdateDisplay();
