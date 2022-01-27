const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
};

const TIMESTEP = 1000;
let intervalId = null;

refs.startBtn.addEventListener("click", startChangeColor);
refs.stopBtn.addEventListener("click",stopChangeColor);

function startChangeColor(event) {
    event.target.disabled = true;
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, TIMESTEP);
}

function stopChangeColor(event){
    refs.startBtn.disabled = false;
    clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}