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
    
    if (totalInput[0] == "") {
        return;
    }

    if (totalInput[2] != "") {
        equal();
    }

    if (!nextNumber) {
        currentIndex++;
    }

    totalInput[currentIndex] = obj.target.textContent;

    dotButton.addEventListener("click", addNumeral, {once: true});
    nextNumber = true;
}

function equal() {

    nextNumber = false;
    currentIndex = 0;
    dotButton.addEventListener("click", addNumeral, {once: true});
    
    let result = operate(totalInput[0], totalInput[2], totalInput[1]);

    screen.textContent = adjustLength(result);
    totalInput[0] = (result == "Impossibile")? "" : result;
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
    dotButton.addEventListener("click", addNumeral, {once: true});
}

function delApprox(n, t) {

    let fracPartLength = n.split(".")[1].length; 

    return parseFloat(n).toFixed(fracPartLength - t).toString();
}

function adjustLength(n) {

    n = n.toString();
    diff = n.length - 16;

    if (diff > 0) {

        while (diff > 0 && n.includes(".")) {

            n = delApprox(n, 1);
            diff--;

            if (!n.includes(".")) {
                diff--;
            }
        }

        if (diff > 0) {

            let mantissa = delApprox(("0." + n.slice(1)), 5).slice(2);
            
            let mantissaLength = mantissa.length;

            while (mantissa.charAt(mantissa.length - 1) == "0") {
                
                mantissa = mantissa.slice(0, mantissa.length - 1);
                diff--;
            }
            //da spostare a dopo e togliere quella variabile

            let arr = [n.charAt(0) + "." + mantissa,
                (mantissaLength + 5).toString()]
            ;
            
            let expLength = arr[1].length;

            diff--;
            
            while (diff > 0) {

                arr[0] = delApprox(arr[0], 1);
                arr[1] = +arr[1] + 1;

                if (arr[1].length > expLength) {

                    expLength = arr[1].length - expLength;

                    arr[0] = delApprox(arr[0], expLength);

                    expLength = arr[1].length;
                }
                
                diff--;
            }

            n = arr[0] + "e" + arr[1];
        }
    }
    return n;

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const totalInput = ["", "", ""];
let currentIndex = 0;
let nextNumber = false;
const screen = document.querySelector("#screen");
const dotButton = document.querySelector("#dot");

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
        case "Clear":   obj.addEventListener("click", clear)
            break;
        case ".":   obj.addEventListener("click", addNumeral, {once: true})
            break;
        default:    obj.addEventListener("click", addNumeral);
            break;
    }
});