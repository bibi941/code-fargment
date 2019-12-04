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
      // 数组
      if (source instanceof Array) {
        result = []
        // 函数
      } else if (source instanceof Function) {
        result = function () {
          return source.call(this,...arguments)
        }
        // 普通对象
      } else {
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
