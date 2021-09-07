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

    if (noInputAllowed) {
        return;
    }

    if (obj.target.textContent == "." && totalInput[currentIndex].includes(".")) {
        return;
    }

    if (totalInput[currentIndex].length == 16) {
        if (totalInput[currentIndex].charAt(0) == "0" && totalInput[currentIndex].charAt(1) != ".") {
            totalInput[currentIndex] = totalInput[currentIndex].slice(1);
        } else {
            return;
        }
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

    nextNumber = true;
    noInputAllowed = false;
}

function equal() {

    nextNumber = false;
    noInputAllowed = true;
    currentIndex = 0;
    
    let result = operate(totalInput[0], totalInput[2], totalInput[1]);

    screen.textContent = adjustLength(result);
    totalInput[0] = (result == "Impossibile")? "" : result.toString();
    totalInput[1] = "";
    totalInput[2] = "";
}

function clear() {

    totalInput[0] = "";
    totalInput[1] = "";
    totalInput[2] = "";
    currentIndex = 0;
    nextNumber = false;
    noInputAllowed = false;
    screen.textContent = "";
}

function delApprox(n, t) {

    let fracPartLength = n.split(".")[1].length; 

    return parseFloat(n).toFixed(fracPartLength - t).toString();
}

function removeLastZeroesDot(string) {

    while (string.charAt(string.length -1) == "0") {

        string = string.slice(0, string.length - 1);

    }

    if (string.charAt(string.length -1) == ".") {
            
        string = string.slice(0, string.length - 1);
    }

    return string;
}

function adjustLength(n) {

    n = n.toString();
    diff = n.length - 16;

    if (diff > 0) {

        while (diff > 0 && n.includes(".")) {

            n = delApprox(n, 1);
            diff--;
            /*
            if (!n.includes(".")) {
                diff--;
            }
            */
        }

        if (diff > 0) {

            let mantissa = delApprox(("0." + n.slice(1)), 5).slice(2);
            
            let arr = [n.charAt(0) + "." + mantissa,
                (mantissa.length + 5).toString()]
            ;

            diff--;
            
            while (diff > 0) {

                arr[0] = delApprox(arr[0], 1);

                diff--;
            }
            
            arr[0] = removeLastZeroesDot(arr[0]);

            n = arr[0] + "e" + arr[1];

        } else {

            n = removeLastZeroesDot(n);
        }
    }
    return n;

}

function backspace() {

    if (totalInput[currentIndex] != "") {

        totalInput[currentIndex] = totalInput[currentIndex].slice(0, totalInput[currentIndex].length - 1);
        screen.textContent = totalInput[currentIndex];
    }
}

function keyboardSupport(obj) {

    let keyCode = obj.keyCode;
    let isShift = obj.shiftKey; 

    if (keyCode > 47 && keyCode < 58) {

        if (keyCode != 55 || !isShift) {

            addNumeral(
                {
                    target: {
                        textContent: (keyCode - 48),
                    },
                }
            );

        } else {

            chooseOperation(
                {
                    target: {
                        textContent: "/",
                    },
                }
            );
        }

    } else if (keyCode > 95 && keyCode < 106) {

        addNumeral(
            {
                target: {
                    textContent: (keyCode - 96),
                },
            }
        );

    } else {

        switch (keyCode) {
            case 46:
                clear();
                break;
            case 13:
                equal();
                break;
            case 110:
            case 190:
                addNumeral(
                    {
                        target: {
                            textContent: ".",
                        },
                    }
                );
                break;
            case 109:
            case 189:
                chooseOperation(
                    {
                        target: {
                            textContent: "-",
                        },
                    }
                );
                break;
            case 111:
                chooseOperation(
                    {
                        target: {
                            textContent: "/",
                        },
                    }
                );
                break;
            case 187:
                if (!isShift) {

                    chooseOperation(
                        {
                            target: {
                                textContent: "+",
                            },
                        }
                    );
                    break;
                };
            case 106:
                chooseOperation(
                    {
                        target: {
                            textContent: "*",
                        },
                    }
                );
                break;
            case 107:
                chooseOperation(
                    {
                        target: {
                            textContent: "+",
                        },
                    }
                );
                break;
            case 8:
                backspace();
                break;
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const totalInput = ["", "", ""];
let currentIndex = 0;
let nextNumber = false;
let noInputAllowed = false;
const screen = document.querySelector("#screen");

const buttons = document.querySelectorAll("button");

buttons.forEach(obj => {
    switch (obj.textContent) {
        case "+":
        case "-":
        case "*":
        case "/":
            obj.addEventListener("click", chooseOperation);
            break;
        case "=":
            obj.addEventListener("click", equal);
            break;
        case "Clear":
            obj.addEventListener("click", clear)
            break;
        default:
            obj.addEventListener("click", addNumeral);
            break;
    }
});

document.documentElement.addEventListener("keydown", keyboardSupport);