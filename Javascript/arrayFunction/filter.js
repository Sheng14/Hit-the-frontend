/**
 * @description 手写一个filter
 */

Array.prototype._filter = function (fn, thisArr) {
    if (this == undefined) {
     throw new TypeError('this is null or not undefined');
    }
    if (Object.prototype.toString.call(fn) !== '[object Function]') {
     throw new TypeError(fn + 'is not a function');
    }
    let filterArr = this
    let filterRes = []
    for (let i = 0; i < filterArr.length; i++) {
        if (fn.call(thisArr, filterArr[i], i, filterArr)) {
            filterRes.push(filterArr[i])
        }
    }
    return filterRes
}
let arr = [1, 2, 3]
let filRes = arr._filter((val, index, item) => {
 return val > 1
})
console.log(filRes)// [2,3]