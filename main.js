
let totalAmount = document.querySelector('#main-amount');
let enterPrice = document.querySelector('#price-input');
let increasePrice = document.querySelector('#incre-btn');
let decreasePrice = document.querySelector('#decre-btn');
let reasonExpence = document.querySelector('#reason-input');

let verifiedBtn = document.querySelector('#verified-btn');

let expenseContainer = document.querySelector('#expense-container');

const dataArray = [];

function addTheValueInLs(value){
    let MainValue = parseInt(value);

    console.log(MainValue);

    if(MainValue === NaN){
        return localStorage.setItem("Total-Amount", JSON.stringify(0));
    }

    else{
        return localStorage.setItem("Total-Amount", JSON.stringify(MainValue));
    }
}

function displayTheTotalAmount(){
    let mainValue = JSON.parse(localStorage.getItem("Total-Amount"));

    if(mainValue === null){
        totalAmount.innerHTML = 0;
    }

    else{
        totalAmount.innerHTML = mainValue;
    }
}

function addDataToLs(valueArray){
    return localStorage.setItem("Value-Array", JSON.stringify(valueArray));
}

function getTheDataFromLS(){
    return JSON.parse(localStorage.getItem("Value-Array")) || [];
}

function removeTheData(e){
    // console.log(e);
    // console.log(e.target.childNodes);

    const selected = e.target;
    console.log(selected);

    const Value = e.target.childNodes;
    console.log(Value);

    const pahara = Value[0].innerHTML;
    // console.log(pahara);

    const amountValue = Value[1];
    console.log(amountValue);

    const date = Value[2];
    console.log(date);

    const integer = parseInt(amountValue);


    const dataObject = getTheDataFromLS();

    let updatData = [];

    dataObject.forEach(current => {
        if(current.myReason !== pahara && integer !== current.myAmount && integer !== current.myDate){
            updatData.push(current);
        }
    })

    // console.log(updatData);
    addDataToLs(updatData);
    selected.remove();
}

expenseContainer.addEventListener('dblclick', (e) => {
    removeTheData(e);
})

function displayTheDataLS(){

    const newObj = getTheDataFromLS();
    // console.log(typeof newObj);


    newObj.forEach(curr => {
        let expenseDiv = document.createElement('div');

        let expencePahara = document.createElement('p');
        expencePahara.classList.add("expense__phara");

        let expenseAmount = document.createElement('p');
        expenseAmount.classList.add("expense__Amount");

        let expenseDate = document.createElement('p');
        expenseDate.classList.add("expense__Date");

        expencePahara.innerHTML = curr.myReason;
        expenseAmount.innerHTML = curr.myAmount;

        expenseDate.innerHTML = curr.myDate;


        expenseDiv.append(expencePahara);
        expenseDiv.append(expenseAmount);
        expenseDiv.append(expenseDate);

        if(curr.myColor === "green"){
            expenseDiv.classList.add("expenseProf__div");
        }

        else{
            expenseDiv.classList.add("expenseLoss__div");
        }

        expenseContainer.append(expenseDiv);
    })

}

function addInTheExpenseProf(Amount){

    const newDate = new Date(Date.now()).toLocaleString({ 
        timeZone: "Asia/india"
    });

    let reason = reasonExpence.value;

    reasonExpence.value = "";
    
    let expenseDiv = document.createElement('div');

    let expencePahara = document.createElement('p');
    expencePahara.classList.add("expense__phara");

    let expenseAmount = document.createElement('p');
    expenseAmount.classList.add("expense__Amount");

    let expenseDate = document.createElement('p');
    expenseDate.innerHTML = newDate;
    expenseDate.classList.add("expense__Date");


    expencePahara.innerHTML = reason;
    expenseAmount.innerHTML = Amount;

    let myObj = {
        myReason: reason,
        myAmount: Amount,
        myColor: "green",
        myDate: newDate,
    };

    let Object = getTheDataFromLS();

    Object.push(myObj);
    addDataToLs(Object);

    expenseDiv.append(expencePahara);
    expenseDiv.append(expenseAmount);
    expenseDiv.append(expenseDate);


    expenseDiv.classList.add("expenseProf__div");

    expenseContainer.append(expenseDiv);


    // expenseDiv.style. = color;
}

function addInTheExpenseLoss(Amount){

    const newDate = new Date(Date.now()).toLocaleString({ 
        timeZone: "Asia/india"
    });
    
    console.log(typeof newDate);

    let reason = reasonExpence.value;

    reasonExpence.value = "";
    
    let expenseDiv = document.createElement('div');

    let expencePahara = document.createElement('p');
    expencePahara.classList.add("expense__phara");

    let expenseAmount = document.createElement('p');
    expenseAmount.classList.add("expense__Amount");

    let expenseDate = document.createElement('p');
    expenseDate.innerHTML = newDate;
    expenseDate.classList.add("expense__Date");


    expencePahara.innerHTML = reason;
    expenseAmount.innerHTML = Amount;

    let myObj = {
        myReason: reason,
        myAmount: Amount,
        myColor: "red",
        myDate: newDate,
    };

    let Object = getTheDataFromLS();

    Object.push(myObj);
    addDataToLs(Object);

    expenseDiv.append(expencePahara);
    expenseDiv.append(expenseAmount);
    expenseDiv.append(expenseDate);

    expenseDiv.classList.add("expenseLoss__div");
    expenseContainer.append(expenseDiv);

}

increasePrice.addEventListener('click', () => {

    let Amount = enterPrice.value;
    let getPrice = enterPrice.value;
    let newPrice = parseInt(getPrice);

    let OldAmount = totalAmount.innerHTML;
    let oldValue = parseInt(OldAmount);

    
    addTheValueInLs(oldValue);

    enterPrice.value = "";

    if(getPrice.length !== 0){
        oldValue = oldValue + newPrice;
        
        totalAmount.innerHTML = oldValue;
    
        addTheValueInLs(oldValue);
        addInTheExpenseProf(Amount);
    }

})

decreasePrice.addEventListener('click', () => {

    let Amount = enterPrice.value;
    let getPrice = enterPrice.value;

    let OldAmount = totalAmount.innerHTML;
    let oldValue = parseInt(OldAmount);
    
    addTheValueInLs(oldValue);

    let newPrice = parseInt(getPrice);
    enterPrice.value = "";

    if(getPrice.length !== 0){
        oldValue = oldValue - newPrice;
        
        totalAmount.innerHTML = oldValue;
        
        addTheValueInLs(oldValue);
        addInTheExpenseLoss(Amount);
    }

})

console.log('outside the main', totalAmount.innerHTML);
displayTheTotalAmount();
addTheValueInLs(totalAmount.innerHTML);
displayTheDataLS();

// const newDate = new Date(Date.now()).toLocaleString("en-US",{
//     timeZone: "Asia/Jakarta"  
// });

// console.log(typeof newDate);

// console.log(newDate.getDate());
// console.log(typeof newDate.getMonth());
// console.log(newDate.getFullYear());
