[https://juejin.cn/post/6844904067525935118](https://juejin.cn/post/6844904067525935118)

[https://www.cnblogs.com/wzfwaf/p/10553160.html](https://www.cnblogs.com/wzfwaf/p/10553160.html)

MVVM：

Model 模型 后端传的数据

View 所看到页面

ViewModel

双向数据绑定指的是：

1. 将模型转为视图，就是把后端传递的数据，转成所看到的页面，实现的方式是数据绑定
2. 将视图转为模型，就是把看到的页面转为后端的数据，实现的方式是DOM事件监听

在MVVM框架下视图和模型是不能直接通信的，它们通过view model 通信，viewmodel 通常要实现一个observer观察者

- 当数据发生变化，viewmodel 能够监听到数据的这种变化，然后通知视图自动更新
- 当用户操作视图时，viewmodel也能监听到视图的变化，然后通知数据做改动，

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c0b34415-cafa-4a4c-940f-962c83946bd4/Untitled.png)

Object.defineProperty 在一个对象上定义一个新属性或者修改一个已经存在的属性

DocumentFragment 文档碎片，比直接操作DOM性能更高

发布订阅模式，当一个对象的状态发生改变时，所有依赖于他的对象都会得到通知并自动更新，解决了主体对象和观察者之间功能的耦合。

通过数组关系，订阅就是放入函数，发布就是让数组里的函数执行

# 实现自己的MVVM
- 实现一个数据劫持，Observer，能够对数据对象的所有属性进行监听，如有变动可以拿到最新值并通知订阅者

- 实现一个模板编译，Compiler，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数

- 实现一个Watcher，作为连接observer和compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定相应的回调函数，从而更新视图

