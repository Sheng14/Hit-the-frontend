/**
 * @description 调用toString方法，将数组转为字符串，然后再用split分割还原为数组
 */

function flat(arr) {
    return arr.toString().split(',');
}
let arr = [1,2,3,[4,5,6,[7,8,9,[10,11],12],13],14];
flat(arr); // 缺点是结果数组中的元素都是字符串了，不是数字类型