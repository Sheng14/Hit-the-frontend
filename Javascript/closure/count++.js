/**
 * @description 实现一个函数(闭包)，每次调用返回值就+1
 */

let getCount = (function () {
    let count = 0;
    return function () {
        return count++;
    }
})()
getCount()
getCount()