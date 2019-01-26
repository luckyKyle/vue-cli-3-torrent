/***************************
 * 常规工具方法
 ***************************/
import Vue from 'vue'

const vm = new Vue()

/**
 * 将字符串复制到黏贴版
 * @param  str 需要复制的文字
 * Example: copyToClipboard('success!')
 */
export const copyToClipboard = (str = '') => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

/**
 * 定时器防抖动
 * @param  fn 回调函数
 * @param  delay  延时时长
 * Example:  window.addEventListener( 'resize', debounce(() => { console.log(window.innerWidth) console.log(window.innerHeight) }, 250) )
 */
export const debounce = (fn, delay = 0) => {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * 将指定函数转换成promise函数式
 * @param func
 * @return Object
 * Example: const delay = promisify((d, cb) => setTimeout(cb, d))
            delay(2000).then(() => console.log('Hi!'))  -> Promise resolves after 2s
 */
export const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  )

/**
 * 去除try catch方法
 * @param func
 * @return promise
 * Example: const [err, data] = await awaitWrap(fetchData())
 */
export const awaitWrap = promise =>
  promise.then(data => [null, data]).catch(err => [err, null])

/**
 * 弹出错误
 * @param txt 错误文案
 * Example: toastError('获取失败！')
 * TODO  该方法为cube-ui的二次封装方法
 */
export const toastError = txt => {
  vm.$createToast({ type: 'error', txt }).show()
}
