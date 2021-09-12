/**
 * @description call的进化版本（多了对fn重复判断、this无传递处理...）
 */

Function.prototype.myCall = function (context) {
    const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    context = context || window // 若没有传入this, 默认绑定window对象
    context.fn = this // 将函数挂载到对象的fn属性上
    const args = [...arguments].slice(1) // 处理传入的参数
    const result = context.fn(...args) // 通过对象的属性调用该方法
    delete context.fn // 删除该属性
    return result // 直接执行fn然后不保存到result不返回result也可以
}

// 测试
function test(arg1, arg2) {
    console.log(arg1, arg2)
    console.log(this.a, this.b)
  }
  
  test.myCall(
    {
      a: 'a',
      b: 'b',
    },
    1,
    2
  )