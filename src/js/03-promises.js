import Notiflix from 'notiflix'; 
import "flatpickr/dist/flatpickr.min.css";

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  clickToClose: true ,
});




const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const submit = document.querySelector('button[type="submit"]');


let delayValue = 0;
let stepValue = 0;
let amountValue = 0;
let delaySum = 0;

submit.disabled = false;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  
  submit.disabled = true;
  delayValue = +delay.value;
  stepValue = +step.value;
  amountValue = +amount.value;
  delaySum = delayValue;
  

  for (let i = 1; i <= amountValue; i += 1) {
    
    
  createPromise(i, delaySum)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    if (i === amountValue) {
      submit.disabled = false;
  }
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    if (i === amountValue) {
      submit.disabled = false;
  }
  
  });
    delaySum += stepValue;
  }




}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
        return new Promise((resolve, reject) => {
setTimeout(() => {
        if (shouldResolve) {
          resolve({position, delay})
      } else {
          reject({position, delay})
      }
}, delaySum);
      })
  
}