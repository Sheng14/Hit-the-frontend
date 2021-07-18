/**
 * @description 基础版bind的实现
 *  call 是可以被所有的函数继承的，所以 call 方法应该被定义在 Function.prototype 上
    call 方法做了两件事：
    改变 this 的指向，将 this 绑到第一个入参指定的的对象上去；
    根据输入的参数，执行函数
 */

Function.prototype.myCall = function(context, ...args) { // 参数是一个个传入所以需要...来转化成数组
    context.func = this; // this在这里就是指向了function，也就是例子中的showName
    context.func(...args);
    delete context.func;
}

// 测试代码
let me = {
    name: 'Lee'
}

function showName(name) {
    console.log(this);
    console.log(name);
    console.log(this.name);
}

showName.call(me, 'others');

showName.myCall(me, 'others');

/*
测试结果：

{name: "Lee"}name: "Lee"__proto__: Object
VM126:14 others
VM126:15 Lee

VM126:13 {name: "Lee", func: ƒ}name: "Lee"__proto__: constructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()
VM126:14 others
VM126:15 Lee
*/