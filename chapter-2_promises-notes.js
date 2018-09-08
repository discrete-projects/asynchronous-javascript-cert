let promise = new Promise ((resolve, reject) => {
    let isSuccessful = true;
    if (isSuccessful) {
        resolve('Success!');
    } else {
        reject(Error('Failure'));
    }
})

/* The new Promise() constructor is called to create a new promise. The constructor takes in a callback function with the arguments resolve and reject 

Promises are "double-pronged" meaning they do two things simultanousely */

let promise = new Promise ((resolve, reject) => {
    /* Do a thing */
});

/* Resolve() 
The resolve() function is used to change the status of the promise from pending to fulfilled. The value that is passed inside the resolve() function becomes the fulfillment value of the promise. 
*/

resolve('Success!');

/* or */

let resolvedPromise = Promise.resolve('already resolved');

/* Reject()
The reject() function is used to change the status of the promise from pending to rejected. The value that is passed inside the reject() function is called future resolve() and reject() calls no longer have any effect */

reject(Error('Failure'));

/* or */

let rejectedPromise = Promise.reject('already rejected');

/* Using Promises with Then() and Catch()
The then() and catch() methods are used to handle the results of Promises once they have finished pending. 
*/

then()

/* The then() method is used to handle resolved Promises */

catch()

/* The catch() method is used to handle rejected promises. Both of the methods used callback functions. The callback functions should each have one argument representing the promise result. 
*/

let promise = new Promise((resolve, reject) {
    let isSuccessful = true;
    if (isSuccessful) {
        resolve('success!')
    } else {
        reject(Error('failure.'))
    }
}, 5000);

/* Promises status changes frome pending to resolved after 5 seconds */

promise.then( val => {

    console.log(val);

}).catch( val => {

    console.log(val);

})


/* Using Promises with Then(onSuccess, onFailure)
The then() method can be called with a sucess callback and a failure callback as an alternative to using the then() and catch methods. Notice how the then() method is used with a success and failure callback to handle promise results */

promise.then( (val) => {
    console.log(val);
}, (val) => {
    console.log(val);
})



/* Promise Constructor */
let myPromise = new Promise( (resolve, reject) => {
    setTimeout( () => {
        /* Create random number */
        let val = Math.random();
        /* Create conditional */
        if (val > .5) {
            resolve(val)
        } else {
            reject(val)
        }
    })
})


/* Create .then .catch fufillment */
myPromise.then( (val) => {
    console.log(`Success : ${val}`)
}).catch( (err) => {
    console.log(`Error : ${err}`)
})

/* Transforming values 
   Promise reuslts can be transformed by calling the resturn statement iwht the then() callback. This will cause the then() method to return a new Promise with the transformed result.

   Notice how a new Promise is created with a transformed result using the return statement within the then() callback.
*/

let promise =  Promise.resolve('Hello');

let promise2 = promise.then( (result) => {
    console.log(result)
    return `${result} world`
})

promise2.then( (result) => {
    console.log(result)
})


/* Sequencing Asynchronous Operations */
let number = getRandomNumber();
let name = getNameFromNumber(number);
let age = getAgeFromName(name);

//getRandomNumber() returns a promise containing a random number
getRandomNumber().then( result => {  
    console.log(result) // 42
    return getNameFromNumber(result); //returns a promise containing a string representing a name

}).then( result2 => {
    console.log(result2) //"Bob"
    return getAgeFromName(result2);  //returns a promise containing a number representing an age

}).then( result3 => {
    console.log(result3) //21

}).catch( error => {
    console.log(error)
});

/* Chaining Promises */

let promise = Promise.resolve('hello')
let secondPromise = promise.then( val => {
    return val + val;
});

secondPromise.then( (val) => {
    return val
}).then((val) => {
    return val + '!';
}).then((val) => {
    return val.toUpperCase();
}).then((val) => {
    console.log(val)
})

/* Promise.all() method is used to process multiple Promises at the same time. The method takes in an array of Promises and then waits for them all to resolve. Once they hva e all finished, an aray of results can be obtained by using the then() method. If any of the Promises reject, then the Promise.all() method will return the first rejected Promise.
*/


let promise1 = Promise.resolve('hello');
let promise2 = Promise.resolve({age:2, height:188});
let promise3 = 42;

Promise.all([promise1, promise2, promise3]).then( result => {
    console.log(result)
}).catch( error => {
    console.log(error)
})


/* Promise.race()
The Promise.race() method takes in an array of promises and takes the reuslt of the promise that rejects or resolves the fastest. Like normal promises, the then() and catch() methods are used to retrieve the results of the fastest promise. The Promose.race()) method can be used to choose th euqickest source when there are two similiar sources of the same data
*/

let promise1 = new Promise( (resolve,reject) => {
    setTimeout(() => {
        resolve("finished in two seconds");
    },2000) //returns a resolved promise after 2 seconds
});

let promise2 = new Promise( (resolve,reject) => {
    setTimeout(() => {
        resolve("finished in five seconds");
    },5000) //returns a resolved promise after 5 seconds
});


Promise.race([promise1,promise2]).then(function(result) { 

    console.log(result) // logs "finished in two seconds" because promise1 resolved first

}).catch(function(error){

    console.log(error)  

});

/* Promise.race() can also be used to TIMEOUT promises by limiting the amount of time they have to resolve. */



var promiseResolveTenSeconds = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve("finished in ten seconds");
    },10000) //returns a resolved promise after 10 seconds
});

let promiseRejectFiveSeconds = new Promise((resolve,reject) => {
    setTimeout( () => {
        reject("error: promise took longer than 5 seconds to resolve");
    },5000) //returns a rejected promise after 5 seconds
});


Promise.race([promiseResolveTenSeconds,promiseRejectFiveSeconds]).then(function(result) { 

    console.log(result) // never occurs because promiseRejectFiveSeconds rejected

}).catch( error => {

    console.log(error) // logs "error: promise took longer than 5 seconds to resolve"

});