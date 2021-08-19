/**
 * @description 递归+拓展运算符
 */

function flat(arr) {
    let result = [];
    for(let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result.push(...flat(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
let arr = [1,2,3,[4,5,6,[7,8,9,[10,11],12],13],14];
flat(arr);