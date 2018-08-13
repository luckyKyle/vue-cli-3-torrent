/***************************
处理DOM相关的一些常规方法
***************************/

/**
 * Usage: 如果页的底部可见, 则返回true , 否则为false 。
 * “使用scrollY、 scrollHeight和clientHeight来确定页面底部是否可见。”
 * @return 布尔值
 * Example:bottomVisible() -> true
 */
export const bottomVisible = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight

/**
 * Usage: 返回当前页的滚动位置。
 * “如果已定义, 则使用pageXOffset和pageYOffset , 否则scrollLeft和scrollTop。可以省略el以使用window的默认值.”
 * @param {需要传入的元素，默认window} el
 * @return 布尔值
 * Example:getScrollPosition() -> {x: 0, y: 200}
 */
export const getScrollPosition = (el = window) => ({ x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft, y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop })

/**
 * Usage: 平滑滚动到页面顶部。
 * “使用document.documentElement.scrollTop或document.body.scrollTop从顶部获取距离。从顶部的距离的一小部分滚动。使用window.requestAnimationFrame()对滚动进行动画处理。”
 * Example:scrollToTop()
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
