import Vue from 'vue'
import App from './App.vue'
import router from '@/routers'
import store from '@/store'
import VueMeta from 'vue-meta'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import lodash from 'lodash'
import axios from '@/api/axios'
// 引入 Style 加载基础样式

import './common/stylus/index.styl'

import { Dialog, Toast, DatePicker } from 'cube-ui'

Vue.use(Dialog)
Vue.use(Toast)
Vue.use(DatePicker)

Vue.use(VueMeta)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
})

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype._ = lodash

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')