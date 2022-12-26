const inputNumberDelay = document.querySelector(`input[name='delay']`);
const inputNumberStep = document.querySelector(`input[name='step']`);
const inputNumberAmount = document.querySelector(`input[name='amount']`);
const buttonCreateProm = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

buttonCreateProm.addEventListener('click', createWhenSubmit);

function createWhenSubmit(e) {
  e.preventDefault();
  const onePromDelay = +inputNumberDelay.value;
  const stepProm = +inputNumberStep.value;
  const amountProm = +inputNumberAmount.value;
  for (let i = 1; i <= amountProm; i += 1) {
    let delay = onePromDelay + i * stepProm;
    createPromise(i, delay),
      then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  form.reset();
}
