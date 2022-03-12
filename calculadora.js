onload = () => {
  //document.querySelector('#bt-8').onclick = function() {return digit(9)};
  document.querySelector('#bt-0').onclick = () => digit(0);
  document.querySelector('#bt-1').onclick = () => digit(1);
  document.querySelector('#bt-2').onclick = () => digit(2);
  document.querySelector('#bt-3').onclick = () => digit(3);
  document.querySelector('#bt-4').onclick = () => digit(4);
  document.querySelector('#bt-5').onclick = () => digit(5);
  document.querySelector('#bt-6').onclick = () => digit(6);
  document.querySelector('#bt-7').onclick = () => digit(7);
  document.querySelector('#bt-8').onclick = () => digit(8);
  document.querySelector('#bt-9').onclick = () => digit(9);
  document.querySelector('#bt-comma').onclick = comma;
  document.querySelector('#bt-ac').onclick = clean;
  document.querySelector('#bt-divide').onclick = () => operator('/');
  document.querySelector('#bt-times').onclick = () => operator('*');
  document.querySelector('#bt-minus').onclick = () => operator('-');
  document.querySelector('#bt-plus').onclick = () => operator('+');
  document.querySelector('#bt-equals').onclick = calculate;
  document.querySelector('#bt-back').onclick = back;
};
//Variables to store the value, operator and state of the calculator
let sValue = '0';// value shown on display
let isNewNumber = true;// indicates whether the next digit will be a new number
let previusValue = 0; //accumulated value for an operation
let pendingOperation = null; // accumulated operation

//Display update
const updateDisplay = () => {
  let [wholePart, DecimalPart] = sValue.split(',');
  let v = '';
  c = 0;
  for (let i = wholePart.length - 1; i >= 0; i--) {
    if (++c > 3) {
      v = '.' + v;
      c = 1;    
    }
    v = wholePart[i] + v;
    //removing the dot before the minus sign
    if (v.indexOf('-') == 0){
      v = v.replace('-.', '-');
    } 
  }
  v = v + (DecimalPart ? ',' + DecimalPart : '');
  document.querySelector('#display').innerText = v;
};

//Handling the click on the digit button
const digit = (n) => {
  if(isNewNumber) {
    sValue = '' + n;
    isNewNumber = false;
  } 
  else sValue += n;
  updateDisplay();
};

//Decimal point button click handling
const comma = () => {
  if (isNewNumber) {
    sValue = '0,';
    isNewNumber = false;
  }
  else if (sValue.indexOf(',') == -1) {
    sValue += ',';
  }
  updateDisplay();
};

//AC button click treatment (All Clear)
const clean = () => {
  isNewNumber = true;
  previusValue = 0;
  sValue = '0';
  pendingOperation = null;
  updateDisplay();
};

//Convert string to number
const currentValue = () => parseFloat(sValue.replace(',', '.'));

//Handling operator buttons click
const operator = (op) => {
  calculate();
  previusValue = currentValue();
  pendingOperation = op;
  isNewNumber = true;
}
//Treatment of clicking on the equals button
const calculate = () => {
  if(pendingOperation != null) {
    switch(pendingOperation) {
      case '+' : result = previusValue + currentValue(); break;
      case '-' : result = previusValue - currentValue(); break;
      case '*' : result = previusValue * currentValue(); break;
      case '/' : result = previusValue / currentValue(); break;
    }
    sValue = result.toString().replace('.', ',');
  }
  isNewNumber = true;
  pendingOperation = null;
  previusValue = 0;
  updateDisplay();
}

//Back button click handling
const back = () => {
  if (sValue.length - 1 > 1) {
    let backValue = sValue.substring(0, sValue.length - 1);
    sValue = backValue;
  }
  else {
    sValue = '0';
  }
  updateDisplay();
}