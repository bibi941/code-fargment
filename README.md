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
Function.prototype.myCall = function(context) {
  var context = context || window;
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this;
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1);
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args);
  // 删除 fn
  delete context.fn;
  return result;
};
```

## my_apply

```js
Function.prototype.myApply = function(context) {
  var context = context || window;
  context.fn = this;

  var result;
  // 需要判断是否存储第二个参数
  // 如果存在，就将第二个参数展开
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
};
```

## my_bind

```js
Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  var _this = this;
  var args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};
```

## my_debonce(防抖)

```js
function debounce(fn, delay) {
  let timerId = null;
  return function() {
    const context = this;
    if (timerId) {
      window.clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(context, arguments);
      timerId = null;
    }, delay);
  };
}
const debounced = debounce(() => console.log("hi"));

```

## my_throttle(节流)

```js
function throttle(fn, delay) {
  let canUse = true;
  return function() {
    if (canUse) {
      fn.apply(this, arguments);
      canUse = false;
      setTimeout(() => (canUse = true), delay);
    }
  };
}

const throttled = throttle(() => console.log("hi"));
throttled();
```

## my_deepClone(深拷贝)

```js
function deepClone(obj) {
  function isObj(obj) {
    return ( (typeof obj === "object" || typeof obj === "function") && typeof obj !== null );
  }

  if (!isObj(obj)) {
    throw new Error("not Object");
  }

  let isArray = Array.isArray(obj);
  let newObj = isArray ? [...obj] : { ...obj };

  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObj(obj[key]) ? deepClone(obj[key]) : obj[key];
  });

  return newObj;
}
```

## my_flat(数组扁平化)

```js
function flatten(origin) {
  while (origin.some(item => Array.isArray(item))) {
    origin = [].concat(...origin);
  }
  return origin;
}
```

## (事件委托)

```js
 function delegate(element, eventType, selector, fn) {
     element.addEventListener(eventType, e => {
       let el = e.target
       while (!el.matches(selector)) {
         if (element === el) {
           el = null
           break
         }
         el = el.parentNode
       }
       el && fn.call(el, e, el)
     })
     return element
   }
```

## 快排:

```js
function quickSort(arr) {
  const pivot = arr.shift();
  const left = [];
  const right = [];
  if (arr.length < 2) {
    return arr;
  }
  arr.forEach(element => {
    element < pivot ? left.push(element) : right.push(element);
  });
  return quickSort(left).concat([pivot], quickSort(right));
}
test const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
```

## 冒泡

```js
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        
                var temp = arr[j+1];        
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
```

## 选择

```js
function selectionSort(arr) {
    var minIndex, temp;
    for (var i = 0; i < arr.length; - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
```

## 插入

```js
function insertionSort(arr) {
  for(let i = 1; i < arr.length; i++) {
    for(let j = 0; j < i; j++) {
      if(arr[i] < arr[j]) {
        arr.splice(j, 0, arr[i])
        arr.splice(i+1, 1)
        break
      }
      console.log(arr)
    }
  }
}
```

## 桶排序

```js
function bucketSort(arr) {
  if (Object.prototype.toString.call(arr).toLowerCase() !== '[object array]') {
    console.error('Function bucketSort got incorrect argument')
    return
  }
  // 声明一个空桶, 将数据压入桶中
  const bucket = []
  arr.forEach((one) => {
    if (bucket[one] !== undefined) {
      bucket[one]++
    } else {
      bucket[one] = 1
    }
  });
  // 声明一个新数组, 当做排序后的数组
  const newArr = []
  bucket.forEach((one, index) => {
    if (one !== undefined) {
      for (let i = 0; i < one; i++) {
        newArr.push(index)
      }
    }
  })
  
  return newArr
}
```
## 一个无序数组中两个数之和等于给定的值sum
```js
let array = [12, 9, 3, 7, 5, 6, 11, 2, 12, 32, 45];

var twoSum = function(arr, target) {
  var a = {}
  for (var i = 0; i < arr.length; i++) {
    var tmp = target - arr[i]
    if (a[tmp]) {
      return [a[tmp], i]
    }
    a[arr[i]] = i
  }
}
console.log(twoSum(array,8))
```
