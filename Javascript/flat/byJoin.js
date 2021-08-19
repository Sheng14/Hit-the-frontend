/**
 * @description join方法可以将数组转换为字符串
 */

function flat(arr) {
    return arr.join(',').split(',');
}

let arr = [1,2,3,[4,5,6,[7,8,9,[10,11],12],13],14];
flat(arr); // 缺点是结果数组中的元素都是字符串了，不是数字类型