// console.log(arguments); //argument passes inside wrapper function
// console.log(require('module').wrapper); // node internally use a wrapper function

//module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

//exports
// const calc2 = require('./test-module-2');
// console.log(calc2.add(2, 5));

//destructring
const { add, multiply, divide } = require('./test-module-2');
console.log(multiply(2, 5));


//caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
