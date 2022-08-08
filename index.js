const screenDigits = document.querySelector("#screenDigits");
const zeroBtn = document.querySelector("#zero");
const oneBtn = document.querySelector("#one");
const twoBtn = document.querySelector("#two");
const threeBtn = document.querySelector("#three");
const fourBtn = document.querySelector("#four");
const fiveBtn = document.querySelector("#five");
const sixBtn = document.querySelector("#six");
const sevenBtn = document.querySelector("#seven");
const eightBtn = document.querySelector("#eight");
const nineBtn = document.querySelector("#nine");

const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const divideBtn = document.querySelector("#divide");
const multiplyBtn = document.querySelector("#multiply");
const equalBtn = document.querySelector("#equal");

let result;
let concat;
const calc = [];

oneBtn.addEventListener("click", e => {
  showInCalculatorScreen(e.target.textContent);
  getInputIntoArray(e.target.textContent);
});

twoBtn.addEventListener("click", e => {
  showInCalculatorScreen(e.target.textContent);
  getInputIntoArray(e.target.textContent);
});

addBtn.addEventListener("click", e => {
  showInCalculatorScreen(e.target.textContent);
  getInputIntoArray(e.target.textContent);
});

subtractBtn.addEventListener("click", e => {
  showInCalculatorScreen(e.target.textContent);
  getInputIntoArray(e.target.textContent);
});

equalBtn.addEventListener("click", e => {
  getInputIntoArray(e.target.textContent);
  evaluateCalcArray();
});

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  }
};

const getTextContent = () => screenDigits.textContent;

const showInCalculatorScreen = input => {
  if (result) {
    screenDigits.textContent = result;
  } else {
    screenDigits.textContent += input;
  }
};

const getInputIntoArray = input => {
  if (!concat && input !== "+" && input !== "=" && input !== "-") {
    concat = input;
  } else if (concat && input !== "+" && input !== "=" && input !== "-") {
    concat += input;
  } else {
    calc.push(concat);
    calc.push(`${input}`);
    concat = 0;
  }
};

const evaluateCalcArray = () => {
  if (calc.length > 4) {
    console.log("multiple operation");
    result = operate(calc[1], Number(calc[0]), Number(calc[2]));
    if (result) {
      calc.splice(0, 3);
      calc.unshift(result);
      result = operate(calc[1], Number(calc[0]), Number(calc[2]));
      showInCalculatorScreen(result);
    }
  } else {
    console.log("one operation");
    result = operate(calc[1], Number(calc[0]), Number(calc[2]));
    showInCalculatorScreen(result);
  }
};
