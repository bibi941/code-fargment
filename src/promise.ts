export default class Promise {
  succeed = null
  fail = null

  reject() {
    setTimeout(() => {
      this.fail()
    })
  }

  resolve() {
    setTimeout(() => {
      this.succeed()
    })
  }

  constructor(fn: object) {
    if (typeof fn !== 'function') {
      throw new Error('必须接受函数作为参数')
    }
    fn(this.resolve.bind(this),this.reject.bind(this))
  }

  then(succeed?: object,fail?: object) {
    if (!(typeof succeed == 'function' || typeof fail == 'function')) {
      throw new Error('必须接受函数作为参数')
    }
    this.succeed = succeed
    this.fail = fail
  }
}
