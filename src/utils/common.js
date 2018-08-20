/***************************
 * 常规工具方法
 ***************************/

/**
 * Usage:复制到黏贴版
 * @param {传入字符串对应} str
 * Example: copyToClipboard('success!')
 */
export const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

/**
 * Usage: 定时器防抖动
 * @param {回调函数} fn
 * @param {延时时长} ms
 * Example:  window.addEventListener( 'resize', debounce(() => { console.log(window.innerWidth) console.log(window.innerHeight) }, 250) )
 */
export const debounce = (fn, delay = 0) => {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * Usage: 将指定函数转换成promise函数式
 * @param {} func
 * @return Object  {}
 * Example: const delay = promisify((d, cb) => setTimeout(cb, d))
            delay(2000).then(() => console.log('Hi!'))  -> Promise resolves after 2s
 */
export const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  )
