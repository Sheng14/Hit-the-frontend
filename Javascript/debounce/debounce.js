/**
 * @description 防抖的基本实现
 */

function debounce(fn, delay) {
    let timer = null;
    // 将debounce处理结果当作函数返回
    return function() {
         // 保留调用时传入的参数
        let args = arguments;
        // 保留调用时的this上下文
        let context = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    }
}

// 使用：
// 用debounce来包装scroll的回调
const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000)
document.addEventListener('scroll', better_scroll)