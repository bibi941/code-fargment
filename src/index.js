let cache = []

function findCache(source) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === source) {
      return cache[i][1]
    }
  }
  return undefined
}

function deepClone(source) {
  // 复制对象
  if (source instanceof Object) {
    let cacheResult = findCache(source)
    // 环检测-有缓存
    if (cacheResult) {
      return cacheResult
    } else { // 无缓存
      let result
      if (source instanceof Array) {// 数组
        result = []
      } else if (source instanceof Function) {// 函数
        result = function () {
          return source.call(this,...arguments)
        }
      } else if (source instanceof RegExp) {// 正则表达式
        result = new RegExp(source.source,source.flags)
      } else if (source instanceof Date) {//日期
        result = new Date(source)
      } else { // 普通对象
        result = {}
      }
      cache.push([source,result])
      for (let key in source) {
        result[key] = deepClone(source[key])
      }
      return result
    }
  }
  // 复制基本数据结构
  return source
}

module.exports = deepClone
