/*https://promisesaplus.com/*/

export default class Promise {
  callBacks = [] // 存放 succeed,fail
  state = STATUS.PENDING

  constructor(fn) {
    if (!isFunction(fn)) {
      throw new Error('必须接受函数作为参数')
    }
    // fn 立即执行
    fn(this.resolve.bind(this),this.reject.bind(this))
  }

  resolveWith(x) {/*x为 succeed 或者 fail 的返回值*/
    if (this === x) { /*2.3.1*/
      this.reject(new TypeError('reject'))
    }
    if (x instanceof Promise) { /*2.3.2*/
      x.then(
        result => this.resolve(result),
        reason => this.reject(reason)
      )
    }
    if (x instanceof Object) { /*2.3.3*/
      let then
      try {
        then = x.then /*2.3.3.1*/
      } catch (e) {
        this.reject(e) /*2.3.3.2*/
      }
      if (then instanceof Function) { /*2.3.3.3*/
        try {
          then.call(x,y => this.resolveWith(y),(r) => this.reject(r))
        } catch (err) {
          this.reject(err)
        }
      } else {
        this.resolve(x) /*2.3.3.4*/
      }
    } else { /*2.3.4*/
      this.resolve(x)
    }
  }

  resolve(result) {
    if (this.state !== STATUS.PENDING) return
    this.state = STATUS.FULFILLED
    setTimeout(() => {
      this.callBacks.forEach(handle => {
        if (isFunction(handle[0])) {
          const x = handle[0].call(undefined,result)
          handle[2].resolveWith(x)
        }
      })
    })
  }

  reject(reason) {
    if (this.state !== STATUS.PENDING) return
    this.state = STATUS.REJECTED
    setTimeout(() => {
      this.callBacks.forEach(handle => {
        if (isFunction(handle[1])) {
          const x = handle[1].call(undefined,reason)
          handle[2].resolveWith(x)
        }
      })
    })
  }

  then(succeed?,fail?) {
    const handle = []
    if (isFunction(succeed)) handle[0] = succeed
    if (isFunction(fail)) handle[1] = fail
    handle[2] = new Promise(() => {})
    this.callBacks.push(handle)
    return handle[2]
  }
}

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

const isFunction = (type) => {
  return typeof type === 'function'
}
