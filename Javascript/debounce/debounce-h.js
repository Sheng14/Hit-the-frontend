/**
 * @description 防抖的高级实现
    抽取成公共函数的。

    在抽取成公共函数的同时，还需要考虑更复杂的情况：

    参数和返回值如何传递？

    防抖化之后的函数是否可以立即执行？

    防抖化的函数是否可以手动取消？
 */

const debounce = (fn, wait) => {
    let timer = null;
    let args;
    function debounced (...arg) {
        args = arg;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        // 以Promise的形式返回函数执行结果        
        return new Promise((res, rej) => {
            timer = setTimeout(async() => {
                try {
                    let result = await fn.apply(this, args);
                    res(result);
                } catch(e) {
                    rej(e);
                }
            }, wait);
        })
    }
  // 允许取消    
    function cancel () {
        clearTimeout(timer);
        timer = null;
    }
  // 允许立即执行    
    function flush () {
        cancel();
        return fn.apply(this, args);
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}