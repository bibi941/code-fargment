function deepClone(source) {
  // 对象
  if (source instanceof Object) {
    // 数组
    if (source instanceof Array) {
      const result = []
      for (let key in source) {
        result[key] = deepClone(source[key])
      }
      return result
      // 函数
    } else if (source instanceof Function) {
      const result = function () {
        return source.call(this,...arguments)
      }
      for (let key in source) {
        result[key] = deepClone(source[key])
      }
      return result
    } else {
      const result = {}
      for (let key in source) {
        result[key] = deepClone(source[key])
      }
      return result
    }
  }
  // 基本数据结构
  return source
}

module.exports = deepClone
