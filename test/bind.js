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
})
