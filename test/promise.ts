import * as chai from 'chai'
import Promise from '../src/promise'

const assert = chai.assert

describe('Promise',() => {
  it('是一个类',() => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })
  it('new Promise(fn) 没有接受函数作为参数就会报错',() => {
    assert.throw(() => {
      // @ts-ignore
      new Promise()
    })
  })
  it('new Promise(fn) 实例有 then 方法',() => {
    const promise = new Promise(() => {})
    assert.isFunction(promise.then)
  })
  it('new Promise(fn) 中的 fn立即执行',() => {
    let isCall = false
    const promise = new Promise(() => {
      isCall = true
    })
    assert.isTrue(isCall)
  })
  it('new Promise(fn) 函数接受两个参数,resolve/reject',() => {
    const promise = new Promise((resolve,reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
    })
  })
  it('promise.then(success)中的 success 会在 resolve 被调用的时候执行',(down) => {
    let isCall = false
    const promise = new Promise((resolve,reject) => {
      assert(isCall === false)
      resolve()
      setTimeout(() => {
        assert(isCall === true)
        down()
      })
    })
    promise.then(() => {
      isCall = true
    })
  })
})
