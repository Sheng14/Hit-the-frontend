/**
 * @description 直接用flat现成方法
 */

function flat(arr) {
    return arr.flat(Infinity);
}

let arr = [1,2,3,[4,5,6,[7,8,9,[10,11],12],13],14];
flat(arr);