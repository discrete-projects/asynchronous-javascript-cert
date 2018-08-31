function doMath(x,y){
    return square(x) - square(y);
}

function square(num){
   console.log(Error().stack);
   return multiply(num,num);
}

function multiply(x,y){
    return x * y;
}

doMath();
doMath();