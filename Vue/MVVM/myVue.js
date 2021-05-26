const compileUtil = { // 辅助编译
    getVal (expr, vm) { // 不断的.下去直到拿到真正的值
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal];
        }, vm.$data)
    },
    text (node, expr, vm) {
        let value;
        if (expr.indexOf('{{') !== -1) { // 处理{{}}
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                return this.getVal(args[1], vm);
            })
        } else {
            value = this.getVal(expr, vm); // 处理v-text
        }
        this.updater.textUpdater(node, value); // 在上面不同情况拿到值后直接更新视图即可
    },
    html (node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.htmlUpdater(node, value);
    },
    model (node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.modelUpdater(node, value);
    },
    on (node, expr, vm, eventName) {
        let fn = vm.$options.methods && vm.$options.methods[expr]; // 拿到对应的方法
        node.addEventListener(eventName, fn.bind(vm), false); // 添加方法记得绑定到当前vue实例
    },
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        htmlUpdater(node, value) {
            node.innerHTML = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}
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
            if (this.isElementNode(child)) { // 元素节点
                this.compileElment(child);
            } else { // 文本节点
                this.compileText(child);
            }
            if (child.childNodes && child.childNodes.length) { // 考虑到子节点可能有很多嵌套所以递归
                this.compile(child);
            }
        })
    }
    compileText (node) { // 文本节点处理
        const content = node.textContent; // 拿到对应的文本内容
        if ((/\{\{(.+?)\}\}/).test(content)) { // 文本内容是否匹配{{}}
            compileUtil['text'](node, content, this.vm); // 是就走text方法
        }
    }
    compileElment(node) { // 元素节点处理
        const attributes = node.attributes;
        [...attributes].forEach((attr) => { // 遍历元素们以键值对方式呈现
            const {name, value} = attr;
            if (this.isDirective(name)) { // v-text v-on:click 以V-开头不断分割得到操作名和紧跟着的vlaue
                const [, directive] = name.split('-'); // text on:click
                const [directiveName, eventName] = directive.split(':') // text on与click
                compileUtil[directiveName](node, value, this.vm, eventName); // 调用操作方法
                node.removeAttribute('v-' + directive)
            } else if (this.isEventName(name)) { // 以@开头
                const [, eventName] = name.split('@');
                compileUtil['on'](node, value, this.vm, eventName);
            }
        })
    }
    isEventName (attrName) { // 判断是否以@开头
        return attrName.startsWith('@')
    }
    isDirective (attrName) { // 【判断是否以v-开头
        return attrName.startsWith('v-');
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
            new observer(this.$data);
            new compile(this.$el, this); // 传入节点和Vue实例
        }
    }
}