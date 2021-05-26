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
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get() {
                return value;
            },
            set: (newVal) => {
                this.observe(newVal); // 更新对象时再监听一遍防止新对象没有被监听到
                if (newVal !== value) {
                    value = newVal;
                }
            }
        })
    }
}