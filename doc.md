# 一、前言

本着单看不动手，3 秒就忘了的原则，我将通过手写来深入理解 Redux 原理，下面一起看看如何用 25 行代码自定义一个 Redux 吧。

# 二、Redux 简单介绍

> 本章节都来自 [Redux 中文文档](redux.org.cn) 的笔记，建议大家有时间直接阅读文档，内容更加详细。

## 2.1 使用示例

先来看看一个简单的使用示例：

```javascript
const redux = require("redux");
const { createStore } = redux;
/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counterReducter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counterReducter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() => console.log(store.getState()));

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
const ACTIONS_INCREMENT = { type: "INCREMENT" };
const ACTIONS_DECREMENT = { type: "DECREMENT" };
store.dispatch(ACTIONS_INCREMENT);
// 1
store.dispatch(ACTIONS_INCREMENT);
// 2
store.dispatch(ACTIONS_DECREMENT);
// 1
```

上述示例做了以下几件事：

- let store = createStore(counterReducter)
  新建 Redux store 来存放应用的状态

- const ACTIONS_INCREMENT = { type: 'INCREMENT' }
  新建 action，用于描述修改状态的动作

- counterReducter 函数
  纯函数，描述了 action 如何把 state 转变成下一个 state

- store.dispatch(action)
  执行 store.dispatch ，更新 state

- store.subscribe(callback)
  订阅 store，当 dispatch 执行时，将遍历执行订阅函数的回调函数，以通知订阅者

---

通过上述示例我们可以了解到 Redux 的几个概念：

- Store：存放应用状态
- State：状态
- Action：描述修改状态的动作
- Reducer：描述 Action 对应的更新状态的动作
- Dispatch：通过 Action，找到 Reducer，更新 State

# 三、手写 Redux

上述示例用到了以下方法：

- createStore，参数是 reducer，返回 store；
  - store.dispatch，参数是 action，作用是更新 state；
  - store.getState，无参数，返回 state；
  - store.subscribe，参数是当 state 有更新时，需要执行的回调函数。

下文将实现 createStore 方法：

## 3.1 createStore

```javascript
function createStore(reducer) {
  // 创建一个 store 对象
  let state; // 状态对象
  let listeners = []; // 监听器

  // 订阅器
  function subscribe(callback) {
    listeners.push(callback); // 每订阅一个，就为监听器添加一个回调函数
  }

  // 更新 state
  function dispatch(action) {
    state = reducer(state, action); // 更新 state
    listeners.forEach(i => {
      // 通知所有订阅者
      i();
    });
  }

  // 获取 state
  function getState() {
    return state;
  }

  // 返回 store 对象
  return {
    subscribe,
    dispatch,
    getState
  };
}
```

# 四、总结 Redux 原理

通过上文，得到以下总结：

- 发布订阅模式

Redux 通过发布订阅模式，通知每一个订阅者 state 的更新。

- 单一数据源

整个应用的  [全局 state](http://cn.redux.js.org/understanding/thinking-in-redux/glossary#state)  被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个  [store](http://cn.redux.js.org/understanding/thinking-in-redux/glossary#store)  中。

- State 是只读的

唯一改变 state 的方法就是触发  [action](http://cn.redux.js.org/understanding/thinking-in-redux/glossary)，action 是一个用于描述已发生事件的普通对象。

- 使用纯函数来执行修改

为了描述 action 如何改变 state tree，你需要编写纯的  [reducers](http://cn.redux.js.org/understanding/thinking-in-redux/glossary#reducer)。

---

本文源码：

- [learn-web-demo-redux](https://github.com/jiaozitang/learn-web-demo/tree/redux)

希望能对你有所帮助，感谢阅读～

别忘了点个赞鼓励一下我哦，笔芯 ❤️

# 参考资料

- [手写一个 Redux，深入理解其原理](https://juejin.cn/post/6845166891682512909)
- [Redux 三大原则](http://cn.redux.js.org/understanding/thinking-in-redux/three-principles)
