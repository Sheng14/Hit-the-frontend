/**
 * @description 手写forEach
    arr.forEach(function(currentValue, currentIndex, arr) {}, thisArg)
    //currentValue  必需。当前元素
    //currentIndex  可选。当前元素的索引
    //arr           可选。当前元素所属的数组对象。
    //thisArg       可选参数。当执行回调函数时，用作 this 的值。
 */


Array.prototype._forEach = function (fn, thisArg) {
    if (typeof fn !== 'function') throw "参数必须为函数";
    if(!Array.isArray(this)) throw "只能对数组使用forEach方法";
    let arr = this; // 拿到数组
    for(let i = 0; i < arr.length; i++) {
        fn.call(thisArg, arr[i], i, arr); // 如果不传thisArg，call这里就是undefined了，应该就没有改变this的指向（还是指向数组）
    }
}

// 测试
let arr = [1,2,3,4,5];
arr._forEach((item, index) => {
   // console.log(this);
    console.log(item, index);
})

// test thisArg

function Counter() {
    this.sum = 0;
    this.count = 0;
}
// 因为 thisArg 参数（this）传给了 forEach()，每次调用时，它都被传给 callback 函数，作为它的 this 值。
Counter.prototype.add = function (array) {
    array._forEach(function (entry) {
        this.sum += entry;
        ++this.count;
    }, this);
      // ^---- Note
};

const obj = new Counter();
obj.add([2, 5, 9]);

console.log(obj.count); // 3 === (1 + 1 + 1)
console.log(obj.sum);  // 16 === (2 + 5 + 9)