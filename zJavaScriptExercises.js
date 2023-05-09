//Write a JS code to print numbers from 1 to 10

function printNumbers() {
    // variable i = 1, if i is less/equal 10 then increment i by one
    for(let i=1; i<=5; i++){
        console.log(i);
    }
}

//printNumbers()

//boolean***************
let value1 = true;
let value2 = false;

console.log(value1);
console.log(value2);

//Comparison operators************
// >        Greater than
// <        Less than
// >=       Great than or equal to
// <=       Less than or equal to
// ==       Equal to
// !=       Not Equal to
// ===      Scrict equal to
// !==      Strict not equal to

console.log(5 !== 5);

//Comparison operators can also be used to compare to variables***********
const number1 = 5;


const result = number1 < 9;

console.log(result)

//Javascript has three logical operator*************

//&& And Operator ( true if both operands are true)
const age = 18;
const height = 5.5;

let result1 = age >= 18 && height > 5;
console.log(result1);

//|| Or Operator ( true if either of the operands is true)
const age1 = 18;
const height1 = 5.5;

let result2 = age >= 18 || height < 5;
console.log(result1);

// ! Not Operator (true if the operand is false)
const height2 = 5.5
const result3 = height2 > 6;
console.log(!result3)

//Js Boolean expressions


console.log("I love JavaScript");
console.log('JavaScript is fun');

console.log(8);
console.log(80.5); 

let language = `JavaScript`;
console.log(language); 

var name = "Jack";
console.log(name); 

let name = `Brandon`;
console.log(name); 

name = `James`;
console.log(name); 

let name = `Punit`
let surname = `Jajodia`

name = surname
console.log(name)

const passwordNumber = 39983;
console.log(passwordNumber); 

const passportNumber = 39983;
console.log(passportNumber); 

passportNumber = 44325;
console.log(passportNumber); 

let name;
console.log(name)

const name;
console.log(name)


let name = `Brandon`;
console.log(name);

name = undefined; 
console.log(name); 

let city = `New York`;

console.log(`City: `+ city);
 
let city = `New York`;

console.log(`City:${city}`); 