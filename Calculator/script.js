const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');



// global 
let firstValue = 0;
var operatorValue = "";
let nextValue = false;


function numberValue(number) {
  //  replace the current value if fist value is entered
  if (nextValue) {
    calculatorDisplay.textContent = number;
    nextValue = false;
  }
  else {
    //  if  number is zero,replace it 
    const onScreenValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = onScreenValue === '0' ? number : onScreenValue + number;
  }
}
// function for the decimal
function decimal() {
  //  If an operator is pressed ,do not add decimal
  if (nextValue) return;
  // if no decimal 
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}
var calculate ={
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
      '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
        '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
          '=': (firstNumber, secondNumber) => secondNumber,
};

// the operator value
function useOperator(operator) {
  const currentNumber = Number(calculatorDisplay.textContent);
  // to prevent continus operators
if (operatorValue && nextValue){
   operatorValue= operator;
   return;
};
  // first value if the is no value
  if (!firstValue) {
    firstValue = currentNumber;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentNumber);
    calculatorDisplay.textContent =calculation;
    firstValue = calculation; 
  }
  // store the operator and the next value
  nextValue = true;
  operatorValue = operator;

}
//   add event listeners for the numbers and other operatons
inputBtn.forEach((input) => {
  if (input.classList.length === 0) {
    input.addEventListener('click', () => numberValue(input.value));
  } else if (input.classList.contains('operator')) {
    input.addEventListener('click', () => useOperator(input.value));
  }
  else if (input.classList.contains('decimal')) {
    input.addEventListener('click', () => decimal());
  }
});

// reset display on the display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  nextValue = false;
  calculatorDisplay.textContent = '0';

}

// event listener for the reset value
clearBtn.addEventListener('click', resetAll);