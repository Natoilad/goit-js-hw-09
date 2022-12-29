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

function statusBtn(ok, off) {
  btnStop.disabled = ok;
  btnStart.disabled = off;
}

function startChangeBgColor() {
  statusBtn(false, true);
  timerIdInterval = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 1000);
}

function stopChangeBgColor() {
  statusBtn(true, false);
  clearInterval(timerIdInterval);
}
