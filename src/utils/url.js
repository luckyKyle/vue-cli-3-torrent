/***************************
处理URL相关的一些常规方法
***************************/

/**
 * 返回当前 URL。
 * “使用window.location.href获取当前 URL。”
 * @return 布尔值
 * Example:currentUrl() -> 'https://google.com'
 */
export const currentURL = () => window.location.href

/**
 * 返回一个包含当前 URL 参数的对象。
 * @param url String 默认为当前的url
 * @returns Object
 * Example: getURLParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
 */
export const getUrlParams = (url = window.location.href) =>
  url.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => {
    a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)
    return a
  }, {})

/**
 * 从URL中解析参数，相对getUrlParams更省时间
 * @param {String} url
 * @returns Object
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * url 重定向
 * @param url String
 * @param asLink Boolean     每个key值前缀拼接
 * 传递第二个参数以模拟链接单击 (true -默认值) 或 HTTP 重定向 (false).
 * Example:redirect('https://google.com')
 */
export const redirect = (url, asLink = true) => (asLink ? (window.location.href = url) : window.location.replace(url))

/**
 * 将一个对象转换为url的参数拼接
 * @param obj Object
 * @param key String     每个key值前缀拼接
 * @param encode Boolean 转义解码
 * @return String
 * Example: objParseQuery({ a: 1, b: '123' })=>&a=1&b=123
 * Example: objParseQuery({ a: 1, b: '123' },'pre_')=>&pre_a=1&pre_b=123
 */
export const objParseQuery = (obj, key = '', encode = null) => {
  if (!obj || obj === null) return ''
  let paramStr = ''
  let t = typeof obj
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += `&${key}=${encode === null || encode ? encodeURIComponent(obj) : obj}`
  } else {
    for (var i in obj) {
      let k = key === null ? i : key + (obj instanceof Array ? `[${i}]` : `${i}`)
      paramStr += objParseQuery(obj[i], k, encode)
    }
  }
  return paramStr
}
