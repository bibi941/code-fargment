export default class _Promise {
  constructor(fn: object) {
    if (typeof fn !== 'function') {
      throw new Error('必须接受函数作为参数')
    }
    fn(() => {},() => {})
  }

  then() {}

}
