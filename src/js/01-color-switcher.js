// Кнопки
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
btnStop.disabled = true;
const bodyEl = document.querySelector('body');

// Слухачі

btnStart.addEventListener('click', startChangeBgColor);
btnStop.addEventListener('click', stopChangeBgColor);

let timerIdInterval = null;

// Функції

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangeBgColor() {
  btnStop.disabled = false;
  btnStart.disabled = true;
  timerIdInterval = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 1000);
}

function stopChangeBgColor() {
  btnStop.disabled = true;
  btnStart.disabled = false;
  clearInterval(timerIdInterval);
}
