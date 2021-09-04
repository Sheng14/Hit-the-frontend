/**
 * @description 手写promise.race方法
 * @author 参考：https://juejin.cn/post/6962019510526148615
 */

// 使用场景：当我们想要控制某一个异步操作的时间时，就可以用定时器和race来进行实现
// 使用值为空数组：返回的Promise会一直保持在pending状态

function race(arr) {
    return new Promise((resolve, reject) => {
        for(let i = 0; i < arr.length; i++) {
            arr[i].then((res) => {
                resolve(res);
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

//p4: 2s后转化为rejected状态
let p4 = new Promise((res,rej) => {
    setTimeout(()=>{
      rej("p4失败了...")
    },2000)
})

race([p1, p2]).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})

race([p3, p4]).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})

// -----------------------结果--------------------
/*
p2调用成功
Promise {<pending>}
VM200:50 p3失败了...
*/