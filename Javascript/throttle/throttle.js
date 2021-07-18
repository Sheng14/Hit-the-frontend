/**
 * @description 节流的简单实现
 */

function throttle(fn, interval) {
// last为上一次触发回调的时间
    let last = 0;
    // 将throttle处理结果当作函数返回
    return function () {
        // 保留调用时的this上下文
        let context = this;
        // 保留调用时传入的参数
        let args = arguments;
        // 记录本次触发回调的时间 +可以把结果变成数字
        let now = +new Date();
        if (now - last >= interval) {
            last = now;
            fn.apply(context, args);
        }
    }
}

// 使用
// 用throttle来包装scroll的回调
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)
document.addEventListener('scroll', better_scroll)

/** 
 * 注：+号的作用
    new Date()
    Sun Jul 18 2021 20:52:04 GMT+0800 (中国标准时间)
    +new Date()
    1626612727903
*/