function sum (a,b){
    if(process.env.DEBUG=='dev')
        console.log(sum);
    return a+b;
}
var result = sum(1,2);
var result2 = result * 2;