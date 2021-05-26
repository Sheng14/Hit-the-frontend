class compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el); // 元素节点直接给，字符串就去找
        this.vm = vm;
        const fragment = this.node2Fragment(this.el); // 为根节点el创建文档碎片对象
        this.compile(fragment); // 编译子节点
        this.el.appendChild(fragment); // 编译完成给真正的根节点去显示编译修改过的子节点们
    }
    compile (fragment) {
        const childNodes = fragment.childNodes;
        [...childNodes].forEach((child) => {
            if (this.isElementNode(child)) {
                console.log(`元素节点：${child}`);
            } else {
                console.log(`文本节点：${child}`);
            }
            if (child.childNodes && child.childNodes.length) { // 考虑到子节点可能有很多嵌套所以递归
                this.compile(child);
            }
        })
    }
    node2Fragment (el) { // 创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild) { // 每次while都重新给一个firstChild的值
            f.appendChild(firstChild); // 当前的firstChild也会被删除
        }
        return f;
    }
    isElementNode (node) { // 判断是否是元素节点
        return node.nodeType === 1;
    }
}

class MVue { // 实现一个大类（外面new的类）
    constructor(options) { // 接收传来的el、data、method等等
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options; // 赋值
        if (this.$el) { // 判断是存在el节点就去实现编译类和observer类
            new compile(this.$el, this); // 传入节点和Vue实例
        }
    }
}