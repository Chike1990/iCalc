const displayArea = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');
const equalsButton = document.querySelector('.button.equals');
const clearButton = document.querySelector('.button.func.ac');
const pmButton = document.querySelector('.button.func.pm');
const percentButton = document.querySelector('.button.func.percentage');
const dotButton = document.querySelector('.button.dot');

let previousNumber = "";
let operator = null;
let currentNumber = "";

function updateDisplayArea (){
    displayArea.innerHTML = currentNumber;
}

function appendNumberToCurrentNumber (number){
    if(number === "." && currentNumber.includes(".")) return;
    currentNumber = currentNumber.toString() + number.toString();
    updateDisplayArea();
}

function chooseOperator(selectedOperator){
    if(currentNumber === "") return;
    if(previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;
    previousNumber = currentNumber;
    currentNumber = "";
}

function calculate(){
    let calculation;

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    if(isNaN(previous) || isNaN(current)) return;

    switch(operator){
        case "+":
            calculation = previous + current;
            break;
        case "*":
            calculation = previous * current;
            break;
        case "-":
            calculation = previous - current;
            break;
        case "/":
            calculation = previous / current
            break;
        default:
            return;
    }
    currentNumber = calculation;
    operator = null;
    previousNumber = "";
    updateDisplayArea();
}

function clear(){
    currentNumber = "";
    previousNumber = "";
    operator = null;
    updateDisplayArea();
}

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        console.log("clicked")
        appendNumberToCurrentNumber(button.innerText);
    });
});

operatorButtons.forEach(operator => {
    operator.addEventListener('click', () =>{
        chooseOperator(operator.innerText); });
    })

equalsButton.addEventListener('click',()=>{
    calculate();
});

clearButton.addEventListener('click',()=>{
    clear();
})

percentButton.addEventListener('click', button=>{
    if(currentNumber !== "") {
        currentNumber = parseFloat(currentNumber) / 100;
        updateDisplayArea();
    }
})

dotButton.addEventListener('click', button =>{
    appendNumberToCurrentNumber(".")
})

pmButton.addEventListener('click', button => {
    if (currentNumber !== '') {
        currentNumber = currentNumber * -1;
        updateDisplayArea();
    }
});