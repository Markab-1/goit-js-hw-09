import Notiflix from 'notiflix';
const formRef = document.querySelector(".form");

const inputData = {
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
  console.log(inputData);
  event.target.reset();
  
  for (let i = 1; i <= inputData.amount; i += 1){
    createPromise(i, inputData.delay)
  .then(result => {
   return result;
  })
  .catch(result=> {
   return result;
  });
    inputData.delay += inputData.step;
    console.log("delay: ", inputData.delay);
  }
}

function onFormInput(event) {
  inputData[event.target.name] = Number(event.target.value);
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
