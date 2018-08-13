export default {
  // 设置cookie
  set(name, value, days) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    document.cookie = name + '=' + value + ';expires=' + date
  },

  // 获取cookie
  get(name) {
    let arr = document.cookie.replace(/\s/g, '').split(';')
    for (let i = 0; i < arr.length; i++) {
      let tempArr = arr[i].split('=')
      if (tempArr[0] === name) {
        return decodeURIComponent(tempArr[1])
      }
    }
    return ''
  },

  // 删除cookie
  remove(name) {
    this.set(name, '1', -1)
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
  }
}
