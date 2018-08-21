/***************************
处理URL相关的一些常规方法
***************************/

/**
 * Usage: 返回当前 URL。
 * “使用window.location.href获取当前 URL。”
 * @return 布尔值
 * Example:currentUrl() -> 'https://google.com'
 */
export const currentURL = () => window.location.href

/**
 * Usage: 返回一个包含当前 URL 参数的对象。
 * “使用match()与适当的正则表达式来获取所有键值对, Array.reduce()可将它们映射并合并到单个对象中。将location.search作为要应用于当前url的参数传递.”
 * Example: getURLParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
 */
export const getURLParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))/g).reduce(
    (a, v) => {
      a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)
      return a
    }, {}
  )

/**
 * Usage: 返回一个包含当前 URL 参数的对象。
 * “使用window.location.href或window.location.replace()重定向到url。传递第二个参数以模拟链接单击 (true -默认值) 或 HTTP 重定向 (false).”
 * Example:redirect('https://google.com')
 */
export const redirect = (url, asLink = true) => asLink ? (window.location.href = url) : (window.location.replace(url))

/**
 * Usage:  将一个对象转换为url的参数拼接
 */
export const objParseQuery = (param, key, encode) => {
  if (param === null) return ''
  let paramStr = ''
  let t = typeof (param)
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (let i in param) {
      let k = key === null ? i : key + (param instanceof Array ? `[${i}]` : `.${i}`)
      paramStr += objParseQuery(param[i], k, encode)
    }
  }
  return paramStr
}
