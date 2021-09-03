function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, y, op) {
    
    x = parseFloat(x);
    y = parseFloat(y);

    switch (op) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            if (y != 0) {
                return divide(x, y);
            } else {
                return "Impossibile";
            }
    }
}

function addNumeral(obj) {
    
    if (nextNumber) {
        currentIndex++;
        nextNumber = false;
    }



    totalInput[currentIndex] = (totalInput[currentIndex] == "Impossibile") ? "" :
        totalInput[currentIndex]
        + obj.target.textContent
    ;

    screen.textContent = totalInput[currentIndex];
}

function chooseOperation(obj) {
    
    if (totalInput[2] != "") {
        equal();
    }

    if (!nextNumber) {
        currentIndex++;
    }

    totalInput[currentIndex] = obj.target.textContent;

    nextNumber = true;
}

function equal() {

    nextNumber = false;
    currentIndex = 0;
    
    let result = operate(totalInput[0], totalInput[2], totalInput[1]);

    screen.textContent = result;
    totalInput[0] = "" + (result == "Impossibile")? "" : result;
    totalInput[1] = "";
    totalInput[2] = "";
}

function clear() {

    totalInput[0] = "";
    totalInput[1] = "";
    totalInput[2] = "";
    currentIndex = 0;
    nextNumber = false;
    screen.textContent = "";
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const totalInput = ["", "", ""];
let currentIndex = 0;
let nextNumber = false;
const screen = document.querySelector("#screen");

const buttons = document.querySelectorAll("button");

buttons.forEach(obj => {
    switch (obj.textContent) {
        case "+":
        case "-":
        case "*":
        case "/":   obj.addEventListener("click", chooseOperation);
            break;
        case "=":   obj.addEventListener("click", equal);
            break;
        case ".":
            break;
        case "Clear":   obj.addEventListener("click", clear)
            break;
        default:    obj.addEventListener("click", addNumeral);
            break;
    }
});