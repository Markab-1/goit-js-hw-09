import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnRef = document.querySelector('button[data-start]');
const timeValue = document.querySelectorAll('.value');
startBtnRef.addEventListener('click', () => {
    timer.start();
});

startBtnRef.disabled = true;
const notiflixOptions = {
    timeout: 6000, 
    clickToClose: true,
    fontSize: '20px',
    position: 'center-top',
    width: '500px',                    
}

let futureTime = 0;
let currentTime = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        currentTime = Date.now();
        futureTime = selectedDates[0].getTime();
        currentTime = Date.now();
        if (futureTime <= currentTime ) {
            Notiflix.Notify.warning(
                "Please choose a date in the future",
                notiflixOptions,
            );
            startBtnRef.disabled = true;
            return;
        }
        startBtnRef.disabled = false;
    },
};

flatpickr('#datetime-picker', options);

const timer = {
    intervalId: null,

    start() {
        startBtnRef.disabled = true;
        currentTime = Date.now();
        if (futureTime <= currentTime) {
             Notiflix.Notify.warning(
                "The date is already in the past. Please choose a date in the future.",
                notiflixOptions,
            );
            return;
        }
        this.intervalId = setInterval(() => {
        currentTime = Date.now();
        const deltaTime = futureTime - currentTime;
            const time = convertMs(deltaTime);
            updateTimer(time.days, time.hours, time.minutes, time.seconds);
        }, 1000);
    },
    
    stop(){
        clearInterval(this.intervalId);
        startBtnRef.disabled = false;
    },    
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

function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
}

function updateTimer(days, hours, minutes, seconds) {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        timer.stop();
    }
    timeValue[0].textContent = addLeadingZero(days);
    timeValue[1].textContent = addLeadingZero(hours);
    timeValue[2].textContent = addLeadingZero(minutes);
    timeValue[3].textContent = addLeadingZero(seconds);
}