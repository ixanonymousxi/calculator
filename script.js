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

    if (display.textContent === "" && !operatorReg.test(this.innerText)) {
        display.textContent = display.textContent + this.innerText;
    } else if (display.textContent !== "" && !operatorReg.test(lastButtonPressed) && operatorReg.test(this.innerText) || !operatorReg.test(this.innerText)){
        display.textContent = display.textContent + this.innerText;
    }
}

function equals(){
    const operatorReg = /(\+|-|\*|\/|\D)/;
    let equationArr = display.textContent.split(operatorReg);

    //What's happening if the equation starts from a negative 
    //then the operator array gets a NaN as it's first index
    //gotta figure out a way to account for starting with negative numbers


    //console.log(equationArr);
    equationArr = equationArr.map(ele => {
        if(!operatorReg.test(ele)){
            return parseInt(ele);
        }else{
            return ele
        }
    });


    const numArr = equationArr.filter(ele => !operatorReg.test(ele));
    const opArr = equationArr.filter(ele => operatorReg.test(ele));

    //console.log(numArr);
    //console.log(opArr);

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