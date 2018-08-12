import Vue from 'vue'
import App from './App.vue'
import router from '@/routers'
import store from '@/store'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import lodash from 'lodash'
import axios from '@/api/axios'
// 引入 Style 加载基础样式
import { Toast, Popup } from 'cube-ui'

import './common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(Toast)
Vue.use(Popup)
// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
})

Vue.prototype.$http = axios
Vue.prototype._ = lodash

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
