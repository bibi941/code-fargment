## 虚拟 dom
```js
//虚拟 dom

{
  class VNode {
    constructor(tag, children, text) {
      this.tag = tag;
      this.text = text;
      this.children = children;
    }

    render() {
      if (this.tag === "#text") {
        return document.createTextNode(this.text);
      }
      let el = document.createElement(this.tag);
      this.children.forEach(vChild => {
        el.appendChild(vChild.render());
      });
      return el;
    }
  }

  function v(tag, children, text) {
    if (typeof children === "string") {
      text = children;
      children = [];
    }
    return new VNode(tag, children, text);
  }

  let vNodes = v("div", [
    v("p", [v("span", [v("#text", "xiedaimala.com")])]),
    v("span", [v("#text", "jirengu.com")])
  ]);

  function patchElement(parent, newVNode, oldVNode, index = 0) {
    if (!oldVNode) {
      parent.appendChild(newVNode.render());
    } else if (!newVNode) {
      parent.removeChild(parent.childNodes[index]);
    } else if (newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text) {
      parent.replaceChild(newVNode.render(), parent.childNodes[index]);
    } else {
      for (
        let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
        patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i);
      }
    }
  }

  let vNodes1 = v("div", [
    v("p", [v("span", [v("#text", "美国)])]),
  v("span", [v("#text", "拉斯维加斯")])
]);

  let vNodes2 = v("div", [
    v("p", [v("span", [v("#text", "美国)])]),
  v("span", [v("#text", "圣安地列斯"), v("#text", "佛罗里达")])
]);
}



```

## my_call

```js
Function.prototype.myCall = function (context) {
  var context = context || window
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1)
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}
```
## my_apply
```js
Function.prototype.myApply = function (context) {
  var context = context || window
  context.fn = this

  var result
  // 需要判断是否存储第二个参数
  // 如果存在，就将第二个参数展开
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}
```

## my_bind

```js
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

## my_debonce(防抖)

```js
 function debounce(fn, delay){
     let timerId = null
     return function(){
         const context = this
         if(timerId){window.clearTimeout(timerId)}
         timerId = setTimeout(()=>{
             fn.apply(context, arguments)
             timerId = null
         },delay)
     }
 }
 const debounced = debounce(()=>console.log('hi'))
```

## my_throttle(节流)

```js
 function throttle(fn, delay){
     let canUse = true
     return function(){
         if(canUse){
             fn.apply(this, arguments)
             canUse = false
             setTimeout(()=>canUse = true, delay)
         }
     }
 }

 const throttled = throttle(()=>console.log('hi'))
 throttled()
```

## my_deepClone(深拷贝)

```js
function deepClone(obj){
    function isObj(obj){
        return(typeof obj === 'object' || typeof obj === 'function') && typeof obj !== null
    }

    if(!isObj(obj)){
        throw new Error('not Object')
    }

    let isArray = Array.isArray(obj)
    let newObj = isArray ? [...obj] : {...obj}

    Reflect.ownKeys(newObj).forEach((key)=>{
        newObj[key] = isObj(obj[key]) ? deepClone(obj[key]) : obj[key]
    })

    return newObj
}

```