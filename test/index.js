const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const deepClone = require('../src/index')
chai.use(sinonChai)
const assert = chai.assert

describe('deepClone',() => {
  it('是一个函数 ',() => {
    assert.isFunction(deepClone)
  })
  it('可以复制基本类型',() => {
    // number
    const n1 = 1
    const n2 = deepClone(n1)
    assert(n1 === n2)
    // string
    const s1 = 'bibi'
    const s2 = deepClone(s1)
    assert(s1 === s2)
    // bool
    const b1 = false
    const b2 = deepClone(b1)
    assert(b1 === b2)
    // null
    const empty = null
    const empty2 = deepClone(empty)
    assert(empty === empty2)
    // undefined
    const u1 = undefined
    const u2 = deepClone(u1)
    assert(u1 === u2)
  })
  describe('对象',() => {
    it('能够复制普通对象',() => {
      const a1 = { name: 'bibi',age: 18,child: { name: 's-bibi' } }
      const a2 = deepClone(a1)
      assert(a1 !== a2)
      assert(a1.name === a2.name)
      assert(a1.age === a2.age)
      assert(a1.child !== a2.child)
      assert(a1.child.name === a2.child.name)
    })
    it('能够复制数组 ',() => {
      const a1 = [[11,12],[22,23]]
      const a2 = deepClone(a1)
      assert(a1 !== a2)
      assert(a1[0] !== a2[0])
      assert(a1[1] !== a2[1])
      assert.deepEqual(a1,a2)
    })
    it('能够复制函数',() => {
      const fn1 = (a,b) => {
        return a + b
      }
      fn1.attr = { name: 'bibi',age: 18 }
      const fn2 = deepClone(fn1)
      assert(fn1 !== fn2)
      assert(fn1.attr !== fn2.attr)
      assert(fn1.attr.name === fn2.attr.name)
      assert(fn1.attr.age === fn2.attr.age)
      assert(fn1(1,2) === fn2(2,1))
    })
  })
})
