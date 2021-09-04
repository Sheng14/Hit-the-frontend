/**
 * @description 手写promise.allSettled
 * @author 参考：https://blog.csdn.net/weixin_34474777/article/details/112338013
 */

// 使用场景：彼此不依赖，其中任何一个被 reject ，对其它都没有影响；期望知道每个 promise 的执行结果


function allSettled(arr) {
    return new Promise((resolve, reject) => {
        const result = [];
        let count = arr.length;
        for(let i = 0; i < arr.length; i++) {
            arr[i].then((res) => {
                result[i] = {status: 'fulfilled', value: res};
            }).catch((err) => {
                result[i] = {status: 'rejected', reason: err};
            }).finally(() => {
                if (!--count) resolve(result);
            })
        }
    })
}




// ----------------------------测试----------------------

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise2, promise1];

allSettled(promises).then((res) => {
    console.log(res);
})

// --------------------结果----------------------
/*
(2) [{…}, {…}]
0: {status: "rejected", reason: "foo"}
1: {status: "fulfilled", value: 3}
length: 2
__proto__: Array(0)
*/