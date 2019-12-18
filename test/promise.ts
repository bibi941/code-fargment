import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

const assert = chai.assert
import Promise from '../src/promise'
import instantiate = WebAssembly.instantiate

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
    let isCall = sinon.fake()
    const promise = new Promise(isCall)
    assert.isTrue(isCall.called)
  })
  it('new Promise(fn) 函数接受两个参数,resolve/reject',(done) => {
    new Promise((resolve,reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()

    })
  })
  describe('2.2-then方法',() => {
    it('2.2.1-succeed和fail都是可选的参数,如果不是函数,都忽略',() => {
      const promise = new Promise((resolve) => {
        resolve()
      })
      // @ts-ignore
      promise.then(null,'123')
    })
    it('2.2.2-此函数必须在promise 完成(fulfilled)后被调用,并把promise 的result作为它的第一个参数',down => {
      let isCall = sinon.fake()
      const promise = new Promise((resolve,reject) => {
        assert.isFalse(isCall.called)
        resolve(2333)
        resolve(9999)
        setTimeout(() => {
          assert(promise.state === 'fulfilled')
          assert.isTrue(isCall.calledOnce)
          assert(isCall.calledWith(2333))
          down()
        })
      })
      promise.then(isCall)
    })
    it('2.2.3-此函数必须在promise rejected后被调用,并把promise 的reason作为它的第一个参数',down => {
      let isCall = sinon.fake()
      const promise = new Promise((resolve,reject) => {
        assert.isFalse(isCall.called)
        reject(2333)
        reject(9999)
        setTimeout(() => {
          assert(promise.state === 'rejected')
          assert.isTrue(isCall.calledOnce)
          assert(isCall.calledWith(2333))
          down()
        })
      })
      promise.then(null,isCall)
    })
    it('2.2.4-成功-在我的代码执行完之前，不得调用 onFulfilled和onRejected',(done) => {
      let isCall = sinon.fake()
      const promise = new Promise((resolve,reject) => {
        resolve()
        setTimeout(() => {
          assert.isTrue(isCall.called)
          done()
        })
      })
      promise.then(isCall)
      assert.isFalse(isCall.called)
    })
    it('2.2.4-失败-在我的代码执行完之前，不得调用 onFulfilled和onRejected',(done) => {
      let isCall = sinon.fake()
      const promise = new Promise((resolve,reject) => {
        reject()
        setTimeout(() => {
          assert.isTrue(isCall.called)
          done()
        })
      })
      promise.then(null,isCall)
      assert.isFalse(isCall.called)
    })
    it('2.2.5-with no this value(then中函数的 this 无值)(',() => {
      const promise = new Promise((resolve) => {})
      promise.then(function () {
        'use strict'
        assert(this === undefined)
      })
    })
    it('2.2.6-成功-then可以在同一个promise里被多次调用',(done) => {
      const fnLists = [sinon.fake(),sinon.fake(),sinon.fake()]
      const promise = new Promise((resolve) => {
        resolve()
      })
      promise.then(fnLists[0])
      promise.then(fnLists[1])
      promise.then(fnLists[2])
      setTimeout(() => {
        assert(fnLists[0].called)
        assert(fnLists[1].called)
        assert(fnLists[2].called)
        assert(fnLists[1].calledAfter(fnLists[0]))
        assert(fnLists[2].calledAfter(fnLists[1]))
        done()
      })
    })
    it('2.2.6-失败-then可以在同一个promise里被多次调用',(done) => {
      const fnLists = [sinon.fake(),sinon.fake(),sinon.fake()]
      const promise = new Promise((resolve,reject) => {
        reject()
      })
      promise.then(null,fnLists[0])
      promise.then(null,fnLists[1])
      promise.then(null,fnLists[2])
      setTimeout(() => {
        assert(fnLists[0].called)
        assert(fnLists[1].called)
        assert(fnLists[2].called)
        assert(fnLists[1].calledAfter(fnLists[0]))
        assert(fnLists[2].calledAfter(fnLists[1]))
        done()
      })
    })

    describe('2.2.7',() => {
      it('2.2.7.0-then必须返回一个promise',() => {
        const promise = new Promise(() => {})
        const promise1 = promise.then(() => {})
        assert(promise1 instanceof Promise)
      })
      it('2.2.7.1- 如果onFulfilled或onRejected返回一个值x(基本数据结构), 运 [[Resolve]](promise2, x),测试 then 链',() => {
        const promise1 = new Promise(() => {})
        const promise2 = promise1.then(() => 'ok',() => {})
        promise2.then(result => assert(result === 'ok'))
      })
      it('2.2.7.1 - x 是一个 promise',() => {

      })
      it('2.2.7.2 -如果onFulfilled或onRejected抛出一个异常e,promise2 必须被拒绝（rejected）并把e当作原因',() => {
        const promise1 = new Promise(() => {})
        const promise2 = promise1.then(() => {},() => 'no')
        promise2.then(() => {},reason => assert(reason === 'no'))
      })
    })
  })

})
