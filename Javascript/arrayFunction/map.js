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