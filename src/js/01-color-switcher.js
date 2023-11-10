const startButton = document.querySelector('button[data-start]')
const stopButton = document.querySelector('button[data-stop]')
const body = document.querySelector("body");

startButton.addEventListener("click", handlerClickStart);
stopButton.addEventListener("click", handlerClickStop);

stopButton.setAttribute("disabled", "")

let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function handlerClickStart() {
  stopButton.removeAttribute("disabled", "")
   interval = setInterval(() => {
    const randomColor = getRandomHexColor()
     body.setAttribute("style", `background-color:${randomColor}`)
   }, 1000)
  if (interval) {
  startButton.setAttribute("disabled", "")
}
}

function handlerClickStop() {
  clearInterval(interval)
  stopButton.setAttribute("disabled", "");
  startButton.removeAttribute("disabled", "")
}

