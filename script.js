const display = document.querySelector(".display");
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
    if (!operatorReg.test(this.innerText) && lastButtonPressed === "=" || !operatorReg.test(this.innerText) && equation === "") {
        
        //If decimal is pressed add a 0 and disable decimal button
        if (this.innerText === ".") {
            display.textContent = "0" + this.innerText;
            document.querySelector('#decimal button').removeEventListener('click', displayNums);
        }else{
            display.textContent = this.innerText;
        }
    }
    //When user presses a number, adds the number to the display until a non-number key is pressed.
    //Doesn't allow for numbers that are bigger than the display screen (11 digits long)
    else if (!operatorReg.test(this.innerText) && !operatorReg.test(lastButtonPressed) && display.textContent.length < 11) {
        display.textContent = display.textContent + this.innerText;

        //If decimal is pressed disable button
        if (this.innerText === ".") {
            document.querySelector('#decimal button').removeEventListener('click', displayNums);
        }
    }
    //Stores first number user typed out as well as the operator
    //Clears display and replaces it with next number being typed out.
    else if (!operatorReg.test(this.innerText) && operatorReg.test(lastButtonPressed)){
        val1 = display.textContent;
        operator = lastButtonPressed;

        //If decimal is pressed add a 0 and disable decimal button
        if (this.innerText === ".") {
            display.textContent = "0" + this.innerText;
            document.querySelector('#decimal button').removeEventListener('click', displayNums);
        } else {
            display.textContent = this.innerText;
        }
    }
    //When user presses an operator button    
    else{
        //Reenable decimal button for next number
        document.querySelector('#decimal button').addEventListener('click', displayNums);

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
            sum = operate(parseFloat(display.textContent), parseFloat(display.textContent), lastButtonPressed);
        }else{
            sum = operate(parseFloat(val1), parseFloat(display.textContent), operator);
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

    document.querySelector('#decimal button').addEventListener('click', displayNums);

    
}

function clear(){
    display.textContent = "0";
    equation = "";
    val1 = "0";
    operator = "";
}

function backspace(){
    const operatorReg = /^(\+|-|\*|\/|)$/;
    let lastButtonPressed = equation[equation.length - 1];

    let equationArr = equation.split('');
    equationArr.pop();

    let displayArr = display.textContent.split('');
    displayArr.pop('');


    blink();

    if (operatorReg.test(lastButtonPressed)){
        equation = equationArr.join('');
        operator = "";
    }else{

        if (lastButtonPressed === ".") {
            document.querySelector('#decimal button').addEventListener('click', displayNums);
        }
        display.textContent = displayArr.join('') ? displayArr.join('') : '0';
        equation = equationArr.join('');
    }


}

document.querySelectorAll('button').forEach( button => {

    if (button.innerText === "C") {
        button.addEventListener('click', clear);
    }else if (button.innerText === "CE") {
        button.addEventListener('click', backspace);
    }else if (button.innerText === "=") {
        button.addEventListener('click', equals);
    }else{
        button.addEventListener('click', displayNums);
    }


});