/**
 * @description 闭包实现单例模式
 */

class obj {
    login() {
        console.log('login');
    }
}

obj.getInstance = (function () {
    let instance;
    return function () {
        if (!instance) { // 还没有实例化过这个对象才走这个实例化
            instance = new obj();
        }
        return instance; // 最后都是返回
    }
})()