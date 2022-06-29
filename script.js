let display = document.querySelector(".display");

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

function displayNums(){
    const operatorReg = /^(\+|-|\*|\/|)$/;
    let lastButtonPressed = display.textContent[display.textContent.length - 1];

    if (display.textContent === "" && this.innerText === "-" || display.textContent === "" && !operatorReg.test(this.innerText)) {
        display.textContent = display.textContent + this.innerText;
    } else if (display.textContent !== "" && !operatorReg.test(lastButtonPressed) && operatorReg.test(this.innerText) || !operatorReg.test(this.innerText)){
        display.textContent = display.textContent + this.innerText;
    }
}

function equals(){
    const operatorReg = /(\+|-|\*|\/|\D)/;
    let equationArr = display.textContent.split(operatorReg);

    //If equation only has the negative operator, remove and replace with 0
    if (equationArr[0] === "" && equationArr[equationArr.length - 1] === "") {
        equationArr = [0];
    }

    //If equation starts with a negative number adjust the first number to reflect that
    if (equationArr[0] === ""){
        equationArr[2] = parseInt(equationArr[1] + equationArr[2]);
        equationArr.shift();
        equationArr.shift();
    }

    //If equation ends in an operator, remove it
    if (equationArr[equationArr.length - 1] === "") {
        equationArr.pop();
        equationArr.pop();
    }

    //Make all numbers non-strings
    equationArr = equationArr.map(ele => {
        if(!operatorReg.test(ele)){
            return parseInt(ele);
        }else{
            return ele
        }
    });

    const numArr = equationArr.filter(ele => typeof ele === 'number');
    const opArr = equationArr.filter(ele => typeof ele !== 'number');

    display.textContent = numArr.reduce((prev, cur, index) => {   
          return operate(prev, cur, opArr[index-1]);
    });
    
}

function clear(){
    display.textContent = "";
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