/**
 * @description 基础Apply的实现
 */

Function.prototype.myApply = function(context, args) {
    context.func = this;
    context.func(...args); // 记得传入的数组需要解构
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

showName.apply(me, ['others']);

showName.myApply(me, ['others']);

/**
测试结果：

{name: "Lee"}
VM290:14 others
VM290:15 Lee
VM290:13 {name: "Lee", func: ƒ}



VM290:14 others
VM290:15 Lee
 */