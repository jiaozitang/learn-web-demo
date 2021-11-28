// 数据劫持

class Observer {
    constructor(data) {
        this.observer(data)
    }
    observer(data) {
        if(data && typeof data === 'object') {
            for(let key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(obj, key, value) {
        let dep = new Dep()
        this.observer(value)
        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            }
            set: (newVal) => {
                if (newVal !== value) {
                    this.observer(newVal)
                    value = newVal
                    dep.notify()
                }
            }
        })
    }
}

// 模板编译
class Compiler {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        let fragment = this.node2fragment(this.el)
        this.compiler(fragment)
        this.el.appendChild(fragment)
    }

    isDirective(attrName) {
        return attrName.startsWith('v-')
    }

    compilerElement(node) {
        let attributes = node.attributes
        [...attributes].forEach(attr => {
            let { name, value: expr} = attr
            if (this.isDirective(name)) {
                let [,directive] = name.split('-')
            }
            CompilerUtil[directive](node, expr, this.vm)
        })
    }

    compilerText(node) {
        let content = node.textContent
        if(/\{\{(.+?)\}\}/.test(content)) {
            CompilerUtil['text'](node, content, this,vm)
        }
    }

    compiler(fragmentNode) {
        let childNodes = fragmentNode.childNodes
        []
    }
}