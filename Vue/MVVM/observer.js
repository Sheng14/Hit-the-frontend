class watcher {
    constructor (vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldVal = this.getOldVal(); // 保存旧值
    }
    getOldVal () {
        Dep.target = this; // 将当前观察者挂载到Dep上再去触发get（在这个时候是因为实例化是在编译类的时候）
        const oldVal = compileUtil.getVal(this.expr, this.vm); // 获取值就会触发get，触发get刚好就可以给dep加上观察者
        Dep.target = null; // 挂载完毕需要注销，防止重复挂载 (数据一更新就会挂载)
        return oldVal;
    }
    update () {
        const newVal = compileUtil.getVal(this.expr, this.vm); // 获取新值
        if (newVal !== this.oldVal) this.cb(newVal); // 更新，回去调更新函数
    }
}
class Dep {
    constructor () {
        this.subs = []; // 留着存储观察者们
    }
    addSub (watcher) { // 添加观察者
        this.subs.push(watcher);
    }
    notify () { // 通知观察者更新
        this.subs.forEach((w) => {
            w.update();
        })
    }
}
class observer {
    constructor (data) {
        this.observe(data);
    }
    observe(data) { // 对数据做一个遍历去调用监听方法
        if (data && typeof data === 'object') {
            Object.keys(data).forEach((key) => {
                this.defineReactive(data, key, data[key]); // 住：data = data[key]
            })
        }
    }
    defineReactive(obj, key, value) { // 劫持和监听数据
        this.observe(value); // 首先需要递归遍历当前数据（因为可能多嵌套）
        const dep = new Dep(); // 实例化dep
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get() {
                Dep.target && dep.addSub(Dep.target); // 确保存在观察者才添加
                return value;
            },
            set: (newVal) => {
                this.observe(newVal); // 更新对象时再监听一遍防止新对象没有被监听到
                if (newVal !== value) {
                    value = newVal;
                }
                dep.notify(); // 通知观察者更新
            }
        })
    }
}