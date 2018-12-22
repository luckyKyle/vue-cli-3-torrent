/***************************
 * 处理Object相关的一些常规方法
 ***************************/

/**
 * 对象深度对比判断相等
 * @param a Object
 * @param b Object
 * @return Boolean
 * Example:  equals({ a: [2, { e: 3 }], b: [4], c: 'foo' }, { a: [2, { e: 3 }], b: [4], c: 'foo' }) -> true
 */
export const equals = (a, b) => {
  if (a === b) return true
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
    return a === b
  }
  if (a === null || a === undefined || b === null || b === undefined) {
    return false
  }
  if (a.prototype !== b.prototype) return false
  let keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  return keys.every(k => equals(a[k], b[k]))
}

/**
 *  对象深拷贝，改变引用指向
 * @param obj 需要拷贝的对象
 * @return
 */
export const deepClone = obj => {
  if (!obj && typeof obj !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    // 只对对象自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        targetObj[key] = deepClone(obj[key])
      } else {
        targetObj[key] = obj[key]
      }
    }
  }
  return targetObj
}
