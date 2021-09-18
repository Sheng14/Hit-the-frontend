/**
 * @description 手写一个map
 */

Array.prototype.map = function (callback) {
    let res = [];
    let arr = this;
    for(let i = 0; i < arr.length; i++) {
        res.push(callback(arr[i], i, arr)) // 注意传递什么参数就行！！
    }
    return res;
}
// 测试
[1,2,3].map((item) => {
	return item + 1;
}) // [2, 3, 4]


// ------ 更加优秀版------
Array.prototype._map = function (fn, thisArr) {
    if (this == undefined) {
      throw new TypeError('this is null or not undefined');
    }
    if (Object.prototype.toString.call(fn) !== '[object Function]') {
      throw new TypeError(fn + 'is not a function');
    }
    let res = [] 
    let mapArr = this // [1, 2, 3]
    for (let i = 0; i < mapArr.length; i++) {
        res[i] = fn.call(thisArr, mapArr[i], i, mapArr)
    }
    return res
}
let arr = [1, 2, 3]
let mapRes = arr._map((val, index, item) => {
  return val + 1
})
console.log(mapRes)// [2,3,4]