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









// pe HandleKeys() -> if(pressedKey === operator(+, -, / etc) && result !== "") {previousNumber = result -> se continua operatiile}
//                      if(pressedKey !== operator) -> result = "", previousNumber = ""



// *****PROBLEMA***** atunci cand am facut un calcul, DUPA CE APAS ENTER, DACA VREAU SA INCEP UN ALT CALCUL, NU POT. 
// Ar trebui ca in mom in care am apasat ENTER, sa imi afiseze rezultatul, operatia veche si sa imi reseteze toate numerele ca sa pot incepe de la capat cu operatiile.
// Rezolvare problema -> Ne va trebui un IF, astfel:
// Daca utilizatorul a apasat pe OPERATOR, se va folosi rezultatul de la ultimul calcul, DAR daca utilizatorul a apasat pe un numar, se va reseta totul.



/*

Unde punem functia? 
Rasp: Va trebui apelata imediat dupa ce am facut calculul, ADICA PE HandleKeys. 
Functia calculate() deja sterge currentNumber, stocheaza rezultatul si il muta in previousNumber (dar nu-l sterge din memorie)
La apasarea unui buton de tip NUMAR, va trebui sa stergem si previousNumber din memorie, urmand sa se faca un nou calcul
La apasarea unui buton de tip OPERATOR, va trebui sa folosim rezultatul deja stocat in previousNumber si sa facem un nou calcul.


*/


/*
    La apasarea operatorului 

    -> Daca nu avem previousNumber, currentNumber se va muta in previousNumber -> currentNumber devine 0 -> apoi asteptam input-ul de la utilizator 

    ASTA SE INTAMPLA LA CLICK PE OPERATOR (?)

    -> Daca avem previousNumber, se va face calculul (in functie de operatorul CARE DEJA EXISTA IN MEMORIE), apoi rezultatul se va trece pe currentNumber
    Daca apasam un operator, rezultatul trece in previousNumber si currentNumber va fi input-ul de la user
    Daca apasam pe un numar, currentNumber = 0, previousNumber = 0;


    -> Cand avem currentNumber si previousNumber (automat exista si operator), FIE CA APASAM EGAL, FIE CA APASAM PE UN OPERATOR, SE VA FACE CALCULUL, apoi rezultatul va fi stocat in memorie
    -> Dupa efectuarea operatiei, se va stoca noul operator in memorie, rezultatul trece in previousNumber si currentNumber devine 0 pana la input.
    -> Afisajul se va modifica doar la input-ul utilizatorului 
*/