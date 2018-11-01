/***************************
处理Storage相关的一些常规方法
****************************/
export default {
  /**
   * 存入Storage
   * @param key 设置指定key值
   * @param val 设置指定value值
   * Example: setStorage('key', { a1: '111', a2: 222 })-> key:{ a1: '111', a2: 222 }
   */
  set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  /**
   * 获取Storage
   * @param key 指定key值
   * @returns  {any}
   * Example: getStorage('key')-> { a1: '111', a2: 222 }
   */
  get(key) {
    let storageVal = localStorage.getItem(key)
    storageVal = storageVal === 'undefined' ? '' : JSON.parse(storageVal)
    return storageVal
  },
  /**
   * 判断是否有对应key值的storage， 如果没有返回指定的key值则可以自定义默认值，不设置则返回布尔值
   * @param key 指定key值
   * @param defaultVal
   * @returns Boolean
   * Example: hasStorage('key')-> true
   * Example: hasStorage('key',{ a1: '111', a2: 222 })-> key:{ a1: '111', a2: 222 }
   */
  has(key, defaultVal) {
    if (!defaultVal) {
      return !Object.is(this.get(key), null)
    }
    this.set(key, defaultVal)
    return this.get(key) ? this.set(key) : defaultVal
  },
  /**
   *  移除指定Storage
   * @param key 移除指定key值
   * Example: removeStorage('key')
   */
  remove(key) {
    window.localStorage.removeItem(key)
  },
  /**
   * 清空所有Storage数据
   * Example: clearStorage()
   */
  clear() {
    window.localStorage.clear()
  }
}
