import Notiflix from 'notiflix';
const formRef = document.querySelector(".form");

const imputData = {
  delay: 0,
  step: 0,
  amount: 0,
}

const notiflixOptions = {
    timeout: 100000, 
    clickToClose: true,
    fontSize: '16px',                   
}

formRef.addEventListener("submit", onFormSubmit);
formRef.addEventListener("input", onFormInput);

function onFormSubmit(event) {
  event.preventDefault();
  console.log(imputData);
  event.target.reset();
  
  for (let i = 1; i <= imputData.amount; i += 1){
    createPromise(i, imputData.delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    imputData.delay += imputData.step;
    console.log("delay: ", imputData.delay);
  }
}

function onFormInput(event) {
  imputData[event.target.name] = Number(event.target.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, notiflixOptions,));
  } else {
    reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, notiflixOptions,));
      }
    }, delay);
  });
  }
