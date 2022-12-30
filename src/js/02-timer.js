import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dayElSpan = document.querySelector('[data-days]');
const hoursElSpan = document.querySelector('[data-hours]');
const minutesElSpan = document.querySelector('[data-minutes]');
const secondsElSpan = document.querySelector('[data-seconds]');
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
btnStart.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      btnStart.disabled = true;
      contentTimeLasted();

      return alert('Please choose a date in the future');
    }
    btnStart.disabled = false;
  },
};
flatpickr('#datetime-picker', options);

const setTimeFlat = new flatpickr('#datetime-picker', options);

// Функції

function startTimer() {
  const intervalId = setInterval(() => {
    const differenceTime = setTimeFlat.selectedDates[0].getTime() - Date.now();
    if (differenceTime <= 500) {
      clearInterval(intervalId);
      return;
    }

    const timeObj = convertMs(differenceTime);
    console.log(timeObj);
    contentTimeLasted(timeObj, addLeadingZero);
  }, 1000);
}

function contentTimeLasted({
  days = '00',
  hours = '00',
  minutes = '00',
  seconds = '00',
} = {}) {
  dayElSpan.textContent = days;
  hoursElSpan.textContent = hours;
  minutesElSpan.textContent = minutes;
  secondsElSpan.textContent = seconds;
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
