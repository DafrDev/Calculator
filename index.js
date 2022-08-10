const operators = ["+", "-", "/", "*", "="];

let result;
let inputString = "";
let digitResult = "";
let inputArray = [];
let floatPoint = false;

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

    if (inputString.length < 9) {
      if (
        inputValue !== "AC" &&
        inputValue !== "." &&
        !getOperators(inputValue)
      ) {
        getInputIntoArray(inputValue);
      }

      if (!floatPoint && inputValue === ".") {
        getInputIntoArray(inputValue);
      }
    }

    if (inputString.length) {
      if (getOperators(inputValue)) {
        getInputIntoArray(inputValue);
        evaluateInputArray();
      }
    }

    if (inputValue === "AC") {
      clearCalculator();
      result = "";
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
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  }
};

let inputDigit = "";
let operatorInput = "";
let lastInput = "";
const showInCalculatorScreen = input => {
  if (getOperators(input)) {
    screenDigits.textContent = `${inputDigit} ${input}`;
  } else {
    inputDigit = input;
    screenDigitsResult.textContent = inputDigit;
  }
};

const getInputIntoArray = input => {
  if (input !== "C") {
    lastInput = input;
  } else {
    clearLastDigit();
    lastInput = "";
  }

  if (lastInput === ".") {
    floatPoint = true;
  }

  if (result && inputArray[1] === "=") {
    inputArray.splice(0, 2);
    inputString = result;
  }

  if (!inputString && !getOperators(input)) {
    inputString = lastInput;

    showInCalculatorScreen(inputString);
  } else if (inputString && !getOperators(input)) {
    inputString += lastInput;
    showInCalculatorScreen(inputString);
  } else {
    operatorInput = lastInput;
    showInCalculatorScreen(operatorInput);
    inputArray.push(inputString);
    inputArray.push(`${operatorInput}`);
    inputString = "";
    floatPoint = false;
  }
};

const evaluateInputArray = () => {
  if (inputArray.length === 4) {
    result = operate(
      inputArray[1],
      Number(inputArray[0]),
      Number(inputArray[2])
    );

    if (typeof result && !Number.isNaN(result) && !Number.isInteger(result)) {
      result = result.toFixed(1);
    }
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
  inputDigit = "";
  inputString = "";
  floatPoint = false;
  screenDigits.textContent = "";
  screenDigitsResult.textContent = "";
};

const clearLastDigit = () => {
  inputString = inputString.slice(0, -1);
};

selectBtn();
