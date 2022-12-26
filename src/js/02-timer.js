import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dayElSpan = document.querySelector('[data-days]');
const hoursElSpan = document.querySelector('[data-hours]');
const minutesElSpan = document.querySelector('[data-minutes]');
const secondsElSpan = document.querySelector('[data-seconds]');
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
btnStart.addEventListener('click', startTimer);

let setTime = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    setTime = selectedDates[0].getTime();
    if (setTime < Date.now()) {
      btnStart.disabled = true;
      dayElSpan.textContent = '00';
      hoursElSpan.textContent = '00';
      minutesElSpan.textContent = '00';
      secondsElSpan.textContent = '00';
      return window.alert('Please choose a date in the future');
    }
    btnStart.disabled = false;
  },
};
flatpickr('#datetime-picker', options);

// Функції

function startTimer() {
  const intervalId = setInterval(() => {
    const differenceTime = setTime - Date.now();
    if (differenceTime <= 500) {
      clearInterval(intervalId);
      return;
    }

    timeObj = convertMs(differenceTime);
    contentTimeLasted(addLeadingZero, timeObj);
  }, 1000);
}

function contentTimeLasted() {
  dayElSpan.textContent = timeObj.days;
  hoursElSpan.textContent = timeObj.hours;
  minutesElSpan.textContent = timeObj.minutes;
  secondsElSpan.textContent = timeObj.seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
