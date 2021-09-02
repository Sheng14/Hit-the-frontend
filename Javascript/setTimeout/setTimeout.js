/**
 * @description setTimeout执行情况修改
 */

// 原题
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
} // 一秒后全部输出5


// 利用let修改
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
} // 一秒后输出0 1 2 3 4


// 利用setTimeout的第三个参数传递参数，同时注意func需要接受这个传递过来的参数而且输出的是这个参数
for (var i = 0; i < 5; i++) {
    setTimeout(function(j) {
        console.log(j);
    }, 1000, i);
}


// 立即执行函数（闭包） 注意也是需要传递参数接收参数输出这个参数！！！
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);
        }, 1000)
    })(i)
}