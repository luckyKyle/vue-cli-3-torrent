export default {
  // 设置cookie
  set(key, value, days) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    document.cookie = key + '=' + value + ';expires=' + date
  },

  // 获取cookie
  get(key) {
    let arr = document.cookie.replace(/\s/g, '').split(';')
    for (let i = 0; i < arr.length; i++) {
      let tempArr = arr[i].split('=')
      if (tempArr[0] === key) {
        return decodeURIComponent(tempArr[1])
      }
    }
    return ''
  },

  // 删除指定cookie
  remove(key) {
    this.set(key, '1', -1)
  },

  // 获取全部的cookie列表
  getAll() {
    let pairs = document.cookie.split(';')
    let cookies = {}
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('')
      cookies[pair[0]] = unescape(pair[1])
    }
    return cookies
  },
  // 清除所有的cookie
  clear() {
    // eslint-disable-next-line
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (let i = keys.length; i--;) {
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
    }
  }
}
