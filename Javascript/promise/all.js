/**
 * @description 手写promise.all方法
 * @author 参考：https://juejin.cn/post/6962019510526148615以及https://www.sogou.com/link?url=hedJjaC291OfPyaFZYFLI4KQWvqt63NBkv5ouqTGdbwBGQBaZ_yYVA..
 */
// 使用场景：当用户想要得到的是多个异步结果合并到一起时应该使用all
// 如果值为空数组：返回的Promise会进入fullfilled的状态,那么会执行resolve的回调，返回的参数为一个空数组

// 初版
function all(arr) {
    return new Promise((resolve, reject) => {
        let len = arr.length;
        let count = 0;
        let result = [];
        for(let i = 0; i < len; i++) {
            arr[i].then((res) => {
                result.push(res);
                count++;
                if (count === len) {
                    resolve(result);
                }
            }).catch((err) => {
                reject(err);
            })
        }
    })
}

// 高手版（按顺序）
function all(arr) {
    return new Promise((resolve, reject) => {
        const PromiseResult = [];
        let iteratorIndex = 0; // 第几个promise了，主要用于在结果中占据正确位置
        let fullCount = 0; // 已完成数量
        for(let item of arr) {
            let resultIndex = iteratorIndex;
            iteratorIndex++; // 拿到结果位置
            Promise.resolve(item).then((res) => {
                fullCount++; // 完成数量+1
                PromiseResult[resultIndex] = res; // 在正确位置赋值
                if (fullCount === iteratorIndex) { // 完成
                    resolve(PromiseResult);
                }
            }).catch((err) => {
                reject(err);
            })
        }
    })
}

// --------------------------测试---------------------

//p1:0.5s后转化为fullfilled状态
let p1 = new Promise((res,rej) => {
    setTimeout(()=>{
      res("p1调用成功")
    },500)
  })
  
//p2: 直接转化为res状态
let p2 = new Promise((res,rej) => {
    res("p2调用成功")
})
  
//p3: 1s后转化为rejected状态
let p3 = new Promise((res,rej) => {
    setTimeout(()=>{
      rej("p3失败了...")
    },1000)
})


all([p1, p2]).then((res) => {
    console.log(res);
})
all([p1, p3]).then((res) => {
    console.log(res);
}).catch((rej) => {
    console.log(rej);
})

// ---------------------结果----------------------
/*
__proto__: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: undefined
VM126:43 (2) ["p2调用成功", "p1调用成功"]0: "p2调用成功"1: "p1调用成功"length: 2__proto__: Array(0)
VM126:48 p3失败了...
*/