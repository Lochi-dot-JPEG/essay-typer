let timepick = document.getElementById("timepick");

let newSession = document.getElementById("newSession");
let typingMenu = document.getElementById("typingMenu");
typingMenu.style.display = "none";
newSession.style.display = "inherit";

let p10 = document.getElementById("p10");
let p1 = document.getElementById("p1");
let m10 = document.getElementById("m10");
let m1 = document.getElementById("m1");
p10.setAttribute("onclick", "ChangeTime(10)");
p1.setAttribute("onClick", "ChangeTime(1)");
m10.setAttribute("onclick", "ChangeTime(-10)");
m1.setAttribute("onClick", "ChangeTime(-1)");

let start = document.getElementById("start");
start.setAttribute("onClick", "Start()");

let picked_time = 1;

RenderTime();

function ChangeTime(change) {
  picked_time += change;
  if (picked_time < 1) {
    picked_time = 1;
  }
  RenderTime();
}
function RenderTime() {
  timepick.innerHTML = picked_time + "min";
}

function Start() {
  StartTimer(picked_time);
  typingMenu.style.display = "inherit";
  newSession.style.display = "none";
}
