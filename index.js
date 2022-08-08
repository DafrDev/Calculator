const screenDigits = document.querySelector("#screenDigits");

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
    showInCalculatorScreen(e.target.textContent);
    getInputIntoArray(e.target.textContent);

    if (e.target.textContent === "=") {
      evaluateCalcArray();
    }
  });
};

let result;
let concat;
const calc = [];

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
    result = operate(calc[1], Number(calc[0]), Number(calc[2]));
    if (result) {
      calc.splice(0, 3);
      calc.unshift(result);
      result = operate(calc[1], Number(calc[0]), Number(calc[2]));
      showInCalculatorScreen(result);
    }
  } else {
    result = operate(calc[1], Number(calc[0]), Number(calc[2]));
    showInCalculatorScreen(result);
    console.log(result);
  }
};

selectBtn();
