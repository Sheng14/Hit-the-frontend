/**
 * @description new的基本实现
    new 被调用后大致做了哪几件事情。

    让实例可以访问到私有属性；

    让实例可以访问构造函数原型（constructor.prototype）所在原型链上的属性；

    构造函数返回的最后结果是引用数据类型。
 */

function _new(constructor, ...args) {
    if (typeof constructor !== 'function') { // 不是函数直接出局
        return 'ctor must be a function';
    }
    let obj = Object.create(); // 创建空对象
    obj.__proto__ = constructor.prototype; // 改变空对象的this指向
    let result = constructor.apply(obj, [...args]); // 执行构造函数
    let isObject = typeof result === 'object' && result !== null;
    let isFunction = typeof result === 'function';
    return isObject || isFunction ? result : obj; // 如果是对象/函数就返回构造函数执行的结果，不然就是新生成的对象
}