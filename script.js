let display = document.querySelector(".display");
let equation = "";
let val1 = "0";
let operator;

function add(...args){
    return args.reduce((preVal, curVal) => {
        return preVal + curVal;
    });
}

function subtract(...args) {
    return args.reduce((preVal, curVal) => {
        return preVal - curVal;
    });
}

function multiply(...args) {
    return args.reduce((preVal, curVal) => {
        return preVal * curVal;
    });
}

function divide(...args) {
    return args.reduce((preVal, curVal) => {
        return preVal / curVal;
    });
}

function operate(num1,num2,operator){
    switch(operator){
        case "+":
            return add(num1,num2);
            break;

        case "-":
            return subtract(num1,num2);
            break;
        
        case "/":
            return divide(num1,num2);
            break;
        
        case "*":
            return multiply(num1,num2);
            break;
    }
}

function blink(){
    display.style.color = "white";
    window.setTimeout(() => { display.style.color = "#042543"; }, 100);
}

function displayNums(){
    const operatorReg = /^(\+|-|\*|\/|)$/;
    let lastButtonPressed = equation[equation.length - 1];


    if (!operatorReg.test(this.innerText) && lastButtonPressed === "=") {
        blink();
        display.textContent = this.innerText;
    }else if (!operatorReg.test(this.innerText) && !operatorReg.test(lastButtonPressed)) {
        if(display.textContent === "0"){
            display.textContent = this.innerText;
        }else if(display.textContent.length < 11){
            display.textContent = display.textContent + this.innerText;
        }
    }else if (!operatorReg.test(this.innerText) && operatorReg.test(lastButtonPressed)){
        val1 = display.textContent;
        operator = lastButtonPressed;

        blink();

        display.textContent = this.innerText;
    }else{
        blink();

        if (operator){
            equals();
        }
    }

    equation += this.innerText;

}

function equals(){

    const operatorReg = /^(\+|-|\*|\/|)$/;
    let lastButtonPressed = equation[equation.length - 1];
    let sum;

    blink();


    if (!operator && !operatorReg.test(lastButtonPressed)){
        display.textContent = display.textContent
    }else{
        if(operatorReg.test(lastButtonPressed)){
            sum = operate(parseInt(display.textContent), parseInt(display.textContent), lastButtonPressed);
        }else{
            sum = operate(parseInt(val1), parseInt(display.textContent), operator);
        }

        //Makes sure the sum fits the display by cutting off the number.
        const splitSum = String(sum).split('');

        while(splitSum.length > 11){
            splitSum.pop();
        }

        const joinedSum = splitSum.join('');


        display.textContent = joinedSum;
    }

    equation += "=";
    val1 = "0";
    operator = "";

    
}

function clear(){
    display.textContent = "0";
    equation = "";
    val1 = "0";
    operator = "";
}

document.querySelectorAll('button').forEach( button => {
    if (button.innerText !== "=" && button.innerText !== "C"){
        button.addEventListener('click', displayNums);
    }else if (button.innerText === "C"){
        button.addEventListener('click', clear);
    }else{
        button.addEventListener('click', equals);
    }
});