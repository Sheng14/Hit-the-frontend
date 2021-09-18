/**
 * @description 手写reduce
 */

 Array.prototype._reduce = function (fn, init) {
    if (this == undefined) {
      throw new TypeError('this is null or not undefined');
    }
   if (Object.prototype.toString.call(fn) !== '[object Function]') {
      throw new TypeError(fn + 'is not a function');
    }
    let reduceArr = this
    let index = arguments.length === 1 ? 1 : 0 // 求索引。如果没有传初始值，那么index就是1，因为没有传初始值，prev就是初始值，下标是0，那么自然curr下标就是1
    let prev = arguments.length === 1 ? reduceArr[0] : init // 求初始值。如果没有传入初始值，那么初始值就是数组的第一项，否则就是传入的初始值init
    for (let i = index; i < reduceArr.length; i++) {
        prev = fn(prev, reduceArr[i], i, reduceArr)  // 迭代累加
    }
    return prev
}
let arr = [1, 2, 3]
let reduceRes = arr._reduce((prev, curr) => {
  return prev + curr
})
console.log('reduceRes', reduceRes)// 6
let reduceResParams = arr._reduce((prev, curr) => {
  return prev + curr
}, 2)
console.log('reduceResParams', reduceResParams)// 8