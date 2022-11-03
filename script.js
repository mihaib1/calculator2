// Display elements 
let previousNumberDisplay = document.querySelector('.previous-number');
previousNumberDisplay.textContent = "";
let currentNumberDisplay = document.querySelector('.current-number');
currentNumberDisplay.textContent = "";


// previousNumber, currentNumber and operator 
let currentNumber = "";
let previousNumber = "";
let operator = "";
let result = ""

// EventListener for key press.   ----- WIP
document.addEventListener('keyup', function(event){
    handleKeys(event.key);
})

function handleKeys(keyInput) {                                     /// WIP
    if(keyInput >= 0 && keyInput <= 9 && currentNumberDisplay.textContent.length <= 11) {
        currentNumber += keyInput;
        currentNumberDisplay.textContent = currentNumber;
    }

    if(keyInput === '.' || keyInput === ',') {
        addComma();
        currentNumberDisplay.textContent = currentNumber;
    }

    if(keyInput === 'c' || keyInput === "AC") {
        clearAll();
    }

    if(keyInput === '+') {
        handleOperator('+');
    }

    if(keyInput === "-") {
       handleOperator('-');
    }

    if(keyInput === "/") {
        handleOperator("/");
    }

    if(keyInput === "*" || keyInput === "x") {
        handleOperator("*")
    }

    if(keyInput === "%") {
        handleOperator("%")
    }

    if(keyInput === "Enter" || keyInput === "=") {
        equals();
    }
}

function addComma() {
    if(Number(currentNumber) !== 0 && !currentNumber.includes('.')) {
        currentNumber += '.';
        currentNumberDisplay.textContent = currentNumber;
    }
}

function clearAll() {     
    previousNumber = '';
    currentNumber = '';
    result = '';
    operator = '';
    currentNumberDisplay.textContent = '';
    previousNumberDisplay.textContent = '';
}


function handleOperator(op) {
    if(operator === "") {
        if(result === "") {
            console.log(`result is empty, currentNumber is ${currentNumber}, previousNumber is ${previousNumber}`);
            operator = op;
            previousNumber = Number(currentNumber);
            currentNumber = ""
            previousNumberDisplay.textContent = `${previousNumber} ${operator}`;
            currentNumberDisplay.textContent = currentNumber;
        }else { 
            // caz pentru (previousNumber !== "" && result === "")
            operator = op;
            previousNumber = Number(result);
            currentNumber = "";
            previousNumberDisplay.textContent = `${previousNumber} ${operator}`;
            currentNumberDisplay.textContent = currentNumber;
        }
    }
    
    if(operator !== "" && previousNumber === "" && currentNumber !== "") {
        console.log(`operator is ${operator}, previousNumber is empty and currentNumber is ${currentNumber}`);
        previousNumber = currentNumber;
        currentNumber = "";
    }
    
    if(operator !== "" && previousNumber !== "" && currentNumber !== "") {
        console.log(`operator is ${operator}, previousNumber is ${previousNumber} and currentNumber is ${currentNumber}`);
        previousNumberDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
        calculate();
        currentNumberDisplay.textContent = result;
        previousNumber = result;
        currentNumber = "";
        operator = op;
    }
}


function calculate() {
    switch(operator) {
        case "+" : result = Number(previousNumber) + Number(currentNumber);
        break;
        
        case "-": result = Number(previousNumber) - currentNumber;
        break;

        case "*": result = Number(previousNumber) * currentNumber;
        break;

        case "/": result = Math.round( previousNumber / currentNumber);
        break;

        case "%": result = previousNumber % currentNumber;
        break;
    }
}

function equals() {
    if(operator !== "" && currentNumber !== "" && previousNumber !== "") {
        calculate();
        previousNumberDisplay.textContent = `${previousNumber} ${operator} ${currentNumber}`;
        currentNumberDisplay.textContent = result;
        previousNumber = result;
        currentNumber = "";
        operator = "";
    } 
}

button = document.querySelectorAll('button');
button.forEach(
    (btn) => {
        btn.addEventListener('click', function(e){
            handleKeys(e.path[0].value)
        })
    }
);

