//Es6
function _bind(asThis,...args) {
  const fn = this
  if (!fn instanceof Function) {
    throw new Error('请在函数上绑定')
  }
  return function (...args2) {
    return fn.call(asThis,...args,...args2)
  }
}

// Es5
function _bind2(asThis) {
  var fn = this
  var slice = Array.prototype.slice
  var args = slice.call(arguments,1)
  if (!fn instanceof Function) {
    throw new Error('请在函数上绑定')
  }
  return function () {
    var args2 = slice.call(arguments,0)
    return fn.apply(asThis,args.concat(args2))
  }
}

module.exports = _bind

/*Polyfill*/
if (Function.prototype.bind) {
  Function.prototype._bind = _bind
} else {
  Function.prototype.bind = _bind2
}

