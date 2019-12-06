const assert = require('./config')
const _bind = require('../src/bind')

describe('bind',() => {
  it('是一个函数',() => {
    assert.isFunction(_bind)
  })

  it('可以传入参数',() => {
    function fn(p1,p2) {
      return [this,p1,p2]
    }

    const fn1 = fn._bind({ name: 'bibi' },1,2)
    assert(fn1()[0].name === 'bibi')
    assert(fn1()[1] === 1)
    assert(fn1()[2] === 2)
  })

  it('支持科里化',() => {
    function fn(p1,p2,p3) {
      return [this,p1,p2,p3]
    }

    const fn1 = fn._bind({ name: 'bibi' },1)
    assert(fn1(2,3)[0].name === 'bibi')
    assert(fn1(2,3)[1] === 1)
    assert(fn1(2,3)[2] === 2)
    assert(fn1(2,3)[3] === 3)
  })

  it('支持new',() => {
    function fn(a,b) {
      this.a = a
      this.b = b
    }

    const fn1 = fn._bind(undefined,1,2)
    const obj = new fn1()
    assert(obj.a === 1)
    assert(obj.b === 2)
  })
  it('支持new,并且实例上有继承的原型函数',() => {
    function fn(a,b) {
      this.a = a
      this.b = b
    }

    fn.prototype.say = () => { }
    const fn1 = fn._bind(undefined,1,2)
    const obj = new fn1()
    assert(obj.a === 1)
    assert(obj.b === 2)
    assert.isFunction(obj.say)
  })
})
