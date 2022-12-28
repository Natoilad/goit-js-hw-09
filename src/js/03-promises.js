import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputNumberDelay = document.querySelector(`input[name='delay']`);
const inputNumberStep = document.querySelector(`input[name='step']`);
const inputNumberAmount = document.querySelector(`input[name='amount']`);
const buttonCreateProm = document.querySelector('button');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

buttonCreateProm.addEventListener('click', createWhenSubmit);

function createWhenSubmit(e) {
  e.preventDefault();
  // const form = e.currentTarget;
  const onePromDelay = +inputNumberDelay.value;
  const stepProm = +inputNumberStep.value;
  const amountProm = +inputNumberAmount.value;

  for (let i = 1; i <= amountProm; i += 1) {
    let delay = onePromDelay + i * stepProm;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  form.reset();
}
