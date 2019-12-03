function deepClone(source) {
  if (source instanceof Object) {
    const result = {}
    for (let key in source) {
      result[key] = deepClone(source[key])
    }
    return result
  }
  return source
}

module.exports = deepClone
