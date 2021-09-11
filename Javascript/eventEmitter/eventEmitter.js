/**
 * @description 写一个eventEmitter类
 * 1、on(event,fn)：监听event事件，事件触发时调用fn函数；
 * 2、once(event,fn)：为指定事件注册一个单次监听器，单次监听器最多只触发一次，触发后立即解除监听器；
 * 3、emit(event,arg1,arg2,arg3...)：触发event事件，并把参数arg1,arg2,arg3....传给事件处理函数
 * 4、off(event,fn)：停止监听某个事件。
 * @author 参考：https://www.jianshu.com/p/2b1d60335ecf
 */

class EventEmitter {
    constructor () {
        this._event = {};
    }
    on(event, callback) {
        let callbacks = this._events[event] || [];
        this._event[event] = callbacks.push(callback); // 各种操作后都需要赋值给原事件数组，不然改了跟没改一样
        return this;
    }
    off(event,callback){
        let callbacks = this._events[event]
        this._events[event] =  callbacks && callbacks.filter(function(fn){
               return fn !== callback;
        })
        return this;
    }
    emit(eventName,...args) {
         const callbacks = this._events[eventName]
         callbacks.map(cb => {
              cb(...args)
         })
         return this;
    }
    once(event,callback){
        let wrap = (...args) => {
            callback.apply(this, args)
            this.off(event, wrap)
        }
        this.on(event, wrap )
        return this;
    }
}

class EventEmitter {
    constructor () {
        this._events = {};
    }
    on (event, callback) {
        let callbacks =  this._events[event] || []; // 拿到对象里原本有的事件对应回调函数们没有就给个空数组
        this._events[event] = callbacks.push(callback); // 往数组添加新的事件回调
        return this;
    }
    off(event, callback) {
        let callbacks = this._events[event]; // 拿到这个事件对应的回调函数们
        this._event[event] = callbacks && callbacks.filter(function(fn) { // 回调函数们存在则遍历去掉其中属于当前回调的函数
            return fn !== callback;
        })
        return this;
    }
    emit(eventName, ...args) {
        let callbacks = this._events[eventName]; // 拿到事件名对应的回调函数们
        callbacks.map((cb) => { // 执行所有回调函数
            cb(...args);
        })
        return this;
    }
}