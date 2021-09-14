/**
 * @description 实现一个add函数 满足add(1,2,3)与add(1)(2)(3)结果相同
 * 其实就是为了写一个柯理化（也就是部分求值）目标是把接受多个参数的函数变成接受一个参数的函数，并返回一个新的函数；
 * 方法是用一个闭包，返回一个函数，这个函数每次执行都会改写储存参数的数组，当函数的参数够了之后，便会执行
 */
function curry(fn, args=[]) {
    let len = fn.length; // 函数需要参数的真正长度
    return function() {
        let subArgs = args.slice(0);  
        for(let i = 0; i < arguments.length; i++) { // 拿到当前函数的参数
            subArgs.push(arguments[i]);
        }
        if (subArgs.length >= len) { // 参数长度满足函数要求，执行函数
            return fn.apply(this, subArgs);
        } else { // 不满足就继续柯理化
            return curry.call(this, fn, subArgs);
        }
    }
}
let add = curry((a, b, c) => a + b + c);
console.log(add(1,2,3));
console.log(add(1)(2,3));
console.log(add(1)(2)(3));