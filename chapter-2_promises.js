/*jshint esversion: 6 */

/* SCRATCH NOTES FROM CHAPTER 2 */

const promise = new Promise(function (resolve, reject) {
    let isSuccessful = true;
    if (isSuccessful) {
        resolve('Success!')
    } else {
        reject(Error('Failure.'))
    }
});


/* 
    The new Promise() constructor is called to create a new promise. The constructor takes in a callback function with the arguments resolve and reject.

    Resolve()
    The resolve() function is used to change the status of the promise from pending to fulfilled. The value that is passed inside the resolve() function becomes the fulfillment value of the promise.

    Once the resolve() function is called, future resolve() and reject() calls no longer have any effect.

    Reject()
    The reject() function is used to change the status of the promise from pending to rejected. The value that is passed inside the reject() function becomes the rejection value of the promise.

    Once the reject() function is called, future resolve() and reject() calls no longer have any effect.

    The resolve function can take in any object as an argument, but one common practice is to pass in a Error object because it provides a more detailed error report. 
*/


var promise = new Promise(function (resolve, reject) {
    //do stuff
    var isSuccessful = true;
    setTimeout(function () { //asynchronously process after 5 seconds
        if (isSuccessful) { //if everything is successful
            resolve('success!');
        } else { //if something went wrong
            reject(Error("failure."))
        }
    }, 5000);
});


/*
Using Promises with Then() and Catch()
The then() and catch() methods are used to handle the results of Promises once they have finished pending. The then() method is used to handle resolved Promises while the catch() method is used to handle rejected Promises. Both of the methods use callback functions. The callback functions should each have one argument representing the Promise result.

Notice how the then() and catch() methods use callbacks to handle Promise results:

Promise status changes from pending to resolved after 5 seconds
*/


promise.then(function (val) { //val represents the fulfillment value
    console.log(val); //logs "success!" since promise resolved
}).catch(function (val) { //val represents the rejection value
    console.log(val); //doesn't occur since promise never rejected
});

/*
Chaining Transforms
Several transforms can be chained together using multiple then() method calls.

Notice how promise results are transformed using multiple then() methods calls:
*/

var promise = Promise.resolve([1,2,3,4]);

promise.then(function(result) { 
    console.log(result) //logs [1,2,3,4] 
    return result.map(x => x * x); //squares each value in the array

}).then(function(result2){
    console.log(result2) //logs [1,4,9,16]
    return result2.filter( x => x > 10); //filters out elements that are not larger than 10

}).then(function(result3){
    console.log(result3) //logs [16]
    return result3.toString() + "!!"; //converts result3 to a string and adds "!!"

}).then(function(result4){
    console.log(result4) //logs "16!!"
    return result4;  //returns a promise with "16!!" as the fulfillment value

}).catch(function(error){
    console.log(error)
});


let promise = Promise.resolve('Hello');
let secondPromise = promise.then((val) => {
  return val + val;
});

secondPromise.then((val) => {
  return val;

}).then((val) => {
  return val + '!'

}).then((val) => {
  return val.toUpperCase();

}).then((val) => {
  console.log(val);
})


/* PROMISE ALL 
Takes an array of promises
*/
let promise1 = Promise.resolve('hello'); 
let promise2 = Promise.resolve({age:2,height:188}) 
let promise3 = 42; //normal values work with Promise.all() too


Promise.all([promise1,promise2,promise3]).then(function(result) { 
    console.log(result) //logs the array ["hello",{age:2,height:188},42]

}).catch(function(error){
    console.log(error) 
});


/* PROMISE RACE 
Promise.Race()
The Promise.race() method takes in an array of promises and takes the result of the promise that rejects or resolves the fastest. Like normal promises, the then() and catch() methods are used to retrieve the results of the fastest promise.

The Promise.race() method can be used to choose the quickest source when there are two similar sources of the same data.
The Promise.race() method can also be used to limit the amount of time promises have to resolve by including a promise that is forced to reject after a given amount of time.
*/

let promise1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve("finished in two seconds");
    },2000) //returns a resolved promise after 2 seconds
});

let promise2 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve("finished in five seconds");
    },5000) //returns a resolved promise after 5 seconds
});


Promise.race([promise1,promise2]).then(function(result) { 
    console.log(result) // logs "finished in two seconds" because promise1 resolved first

}).catch(function(error){
    console.log(error)  

});



let promiseOne = Promise.resolve('Hello');
let promiseTwo = Promise.resolve({age:2, height:188});
let promiseThree = Promise.reject('failure');

Promise.all([promiseOne, promiseTwo, promiseThree]).then( result => {
    console.log(result);

}).catch( error => {
    console.log(error);

})



let promiseRaceOne = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Finished in two seconds');
    }, 2000);
});

let promiseRaceTwo = new Promise((resolve, reject) => {
    setTimeout( () => {
        resolve('Finished in five seconds');
    }, 5000)
});

Promise.race([promiseRaceOne, promiseRaceTwo]).then( result => {
    console.log(result);

}).catch( error => {
    console.log(error);
});