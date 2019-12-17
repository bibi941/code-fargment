const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

export default class Promise {
  callBacks = [] // 存放 succeed,fail
  state = STATUS.PENDING

  resolve(result) {
    if (this.state !== STATUS.PENDING) return
    this.state = STATUS.FULFILLED

    setTimeout(() => {
      this.callBacks.forEach(handle => {
        if (typeof handle[0] === 'function') {
          handle[0].call(undefined,result)
        }
      })
    })
  }

  reject(reason) {
    if (this.state !== STATUS.PENDING) return
    this.state = STATUS.REJECTED

    setTimeout(() => {
      this.callBacks.forEach(handle => {
        if (typeof handle[1] === 'function') {
          handle[1].call(undefined,reason)
        }
      })

    })
  }

  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('必须接受函数作为参数')
    }
    // fn 立即执行
    fn(this.resolve.bind(this),this.reject.bind(this))
  }

  then(succeed?,fail?) {
    const handle = []
    if (typeof succeed === 'function') handle[0] = succeed
    if (typeof fail === 'function') handle[1] = fail
    this.callBacks.push(handle)
  }
}
