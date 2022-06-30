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

    blink();

    //Starts a new equation 
    //when the user has hit equals or when the screen displays initial zero
    //Clears display and then replaces with new number pressed by the user.
    if (!operatorReg.test(this.innerText) && lastButtonPressed === "=" || !operatorReg.test(this.innerText) && display.textContent === "0") {
        display.textContent = this.innerText;
    }
    //When user presses a number, adds the number to the display until a non-number key is pressed.
    //Doesn't allow for numbers that are bigger than the display screen (11 digits long)
    else if (!operatorReg.test(this.innerText) && !operatorReg.test(lastButtonPressed) && display.textContent.length < 11) {
        display.textContent = display.textContent + this.innerText;
    }
    //Stores first number user typed out as well as the operator
    //Clears display and replaces it with next number being typed out.
    else if (!operatorReg.test(this.innerText) && operatorReg.test(lastButtonPressed)){
        val1 = display.textContent;
        operator = lastButtonPressed;

        display.textContent = this.innerText;
    }
    //When user presses an operator button    
    else{
        //If previous operator has already been pressed, 
        //then display the result before moving on to next operator.
        if(operator){
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

    //If user hits equals before choosing an operator then display current number
    if (!operator && !operatorReg.test(lastButtonPressed)){
        display.textContent = display.textContent
    }else{
        //If user hasn't typed out a second number, uses the first number for both values
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