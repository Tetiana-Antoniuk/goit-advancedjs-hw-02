import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const selector = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');
let timerId;

selector.value = new Date();

startButton.setAttribute('disabled', '');

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      return;
    }

    startButton.removeAttribute('disabled');
  },
};

flatpickr(selector, options);

startButton.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = setInterval(updateTimerDisplay, 1000);
  updateTimerDisplay();
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerDisplay() {
  const currentDate = new Date();
  const delta = selectedDate - currentDate;

  if (delta <= 0) {
    clearInterval(timerId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(delta);

  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}
