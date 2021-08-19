/**
 * @description 利用reduce方法进行拍平
 */

function flat(arr) {
    return arr.reduce((result, current) => { // 上一个值 当前值
        return result.concat(Array.isArray(current) ? flat(current) : current);
    },[]); // 记得给初始值[]
}
let arr = [1,2,3,[4,5,6,[7,8,9,[10,11],12],13],14];
flat(arr);