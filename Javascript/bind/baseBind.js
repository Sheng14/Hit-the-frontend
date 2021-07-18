/**
 * @description 基础bind的基本实现
 */

Function.prototype.myBind = function(context, ...args) {
    context.func = this;
    return function() {
        context.func(...args);
        delete context.func;
    } // bind应该是返回一个函数等待被执行
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

showName.bind(me, 'others')(); // 记得再调用一次

showName.myBind(me, 'others')(); // 记得再调用一次

/*
测试结果：

{name: "Lee"}
VM167:16 others
VM167:17 Lee


VM167:15 {name: "Lee", func: ƒ}
VM167:16 others
VM167:17 Lee
*/
