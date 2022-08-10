const operators = ["+", "-", "÷", "x", "="];

let result;
let concat;
let digitResult = "";
let inputArray = [];
const screenDigitsArray = [];

const screenDigits = document.querySelector("#screenDigits");
const screenDigitsResult = document.querySelector("#screenDigitsResult");

const allButtons = Array.from(
  document.querySelector(".calculator-keys-body").children
);

const removeUnusedButtons = () => {
  return allButtons.filter(
    btn => btn.className !== "btn noCursor" && btn.id !== "model"
  );
};

const usedButtons = removeUnusedButtons();

const selectBtn = () => {
  usedButtons.forEach(btn => {
    document.querySelector(`#${btn.id}`);
    addBtnEvent(btn);
  });
};

const addBtnEvent = btn => {
  btn.addEventListener("click", e => {
    const inputValue = e.target.textContent;

    if (inputValue !== "AC" && inputValue !== "C") {
      getInputIntoArray(inputValue);
    }

    if (getOperators(inputValue)) {
      evaluateInputArray();
    }

    if (inputValue === "AC") {
      clearCalculator();
      result = "";
    }

    if (inputValue === "C") {
      console.log("clear");
      // clearLastDigit();
    }
  });
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "x") {
    return multiply(a, b);
  } else if (operator === "÷") {
    return divide(a, b);
  }
};

let inputDigit = "";
const showInCalculatorScreen = input => {
  if (getOperators(input)) {
    screenDigits.textContent = inputDigit + " " + input;
    console.log(inputDigit);
  } else {
    inputDigit = input;
    screenDigitsResult.textContent = inputDigit;
  }
};

const getInputIntoArray = input => {
  if (result && inputArray[1] === "=") {
    inputArray.splice(0, 2);
    concat = result;
  }
  if (!concat && !getOperators(input)) {
    concat = input;
    showInCalculatorScreen(concat);
  } else if (concat && !getOperators(input)) {
    concat += input;
    showInCalculatorScreen(concat);
  } else {
    showInCalculatorScreen(input);
    inputArray.push(concat);
    inputArray.push(`${input}`);
    concat = "";
  }

  console.log(inputArray);
};

const evaluateInputArray = () => {
  if (inputArray.length === 4) {
    result = operate(
      inputArray[1],
      Number(inputArray[0]),
      Number(inputArray[2])
    );
    showInCalculatorScreen(result);
    inputArray.splice(0, 3);
    inputArray.unshift(result);
  }
};

const getOperators = input => {
  let operatorValue;
  operators.forEach(op => {
    if (input === op) {
      operatorValue = true;
    }
  });

  return operatorValue;
};

const clearCalculator = () => {
  inputArray = [];
  screenDigits.textContent = "";
};

// const clearLastDigit = () => {
//   console.log(inputArray);
//   inputArray.pop();
//   console.log(inputArray);
// };

selectBtn();
