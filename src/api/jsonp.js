import Vue from 'vue'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)

const vm = new Vue()

// 回调函数名称
const callbackName = 'cb'

export default (url, data) => {
  data = Object.assign({}, { callbackName })
  return vm.$jsonp(url, data)
}
