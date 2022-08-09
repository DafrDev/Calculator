const operators = ["+", "-", "÷", "x", "="];

let result;
let concat;
let digitResult = "";
let calcArray = [];
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
      showInCalculatorScreen(inputValue);
      getInputIntoArray(inputValue);
    }

    if (getOperators(inputValue)) {
      evaluateCalcArray();
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
const getTextContent = () => screenDigits.textContent;

const showInCalculatorScreen = input => {
  if (result) {
    screenDigitsArray.push(
      (screenDigitsResult.textContent = result.toString())
    );
    result = "";
  } else if (getOperators(input)) {
    screenDigitsResult.textContent = "";
    screenDigitsArray.push((screenDigits.textContent = digitResult + input));
  } else {
    digitResult = screenDigitsResult.textContent += input;
  }

  if (input === "=") {
    screenDigits.textContent = screenDigitsArray.join("");
    digitResult = "";
  }

  console.log(screenDigitsArray);
};

const getInputIntoArray = input => {
  if (!concat && !getOperators(input)) {
    concat = input;
  } else if (concat && !getOperators(input)) {
    concat += input;
  } else {
    calcArray.push(concat);
    calcArray.push(`${input}`);
    concat = "";
  }
};

const evaluateCalcArray = () => {
  if (calcArray.length === 4) {
    result = operate(calcArray[1], Number(calcArray[0]), Number(calcArray[2]));
    showInCalculatorScreen(result);
    calcArray.splice(0, 3);
    calcArray.unshift(result);
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
  calcArray = [];
  screenDigits.textContent = "";
};

// const clearLastDigit = () => {
//   console.log(calcArray);
//   calcArray.pop();
//   console.log(calcArray);
// };

selectBtn();
