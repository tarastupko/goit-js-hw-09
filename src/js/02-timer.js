import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix'; 

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  clickToClose: true ,
});



Notiflix.Notify.info('Choose a date in the future');
const start=document.querySelector('button[data-start]');
const input=document.getElementById('datetime-picker');

  const time = {

  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  now: Date.now(),

  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
      if (selectedDates[0].getTime() < this.now) {
          start.disabled = true;
        Notiflix.Notify.failure('Please choose a date in the future');
      } else {
          start.disabled = false;
        Notiflix.Notify.success('Date selected press start!');
    }
  },
};

const fp = flatpickr("#datetime-picker", options);
start.disabled = true;

class Timer {
  constructor({onTick}) {
      this.intervalID = null;
      this.isActive = false;
      this.tick = null;
      this.onTick = onTick;
  }

  timerStart() {
    let date = new Date(input.value);
  
    if (this.isActive) {
        return;
    }

      this.isActive = true;

    this.intervalID = setInterval(() => {
      let currentTime = Date.now();

        start.disabled = true;
        this.tick = date - currentTime;
      if (this.tick > 0) {
        const convert = this.convertMs(this.tick)
        console.log(convert);
        this.onTick(convert);
      } else {
        Notiflix.Notify.info('Time is up');
        clearInterval(this.intervalID);
          this.isActive = false;
      }
    }, 1000);
  }
    
  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.pad(Math.floor(ms / day));
  // Remaining hours
  const hours = this.pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

pad(number) {
    return String(number).padStart(2, '0');
}

}

function updateClock({ days, hours, minutes, seconds }) {
  time.days.textContent = days;
  time.hours.textContent = hours;
  time.minutes.textContent = minutes;
  time.seconds.textContent = seconds;
}

const timer = new Timer({
  onTick: updateClock,
});


start.addEventListener('click', () => timer.timerStart());


