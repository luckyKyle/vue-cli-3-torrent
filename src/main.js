import Vue from 'vue'
import App from './App.vue'
import router from '@/routers'
import store from '@/store'

import VueMeta from 'vue-meta'
import VConsole from 'vconsole'
import VueLazyLoad from 'vue-lazyload'
import VueLazyComponent from '@xunlei/vue-lazy-component'

import fastclick from 'fastclick'
import lodash from 'lodash'
import axios from '@/api/axios'
import mock from '@/mock'

import 'nprogress/nprogress.css'
import './common/stylus/index.styl'

// 引入 Style 加载基础样式
import {
  // eslint-disable-next-line
  Style,
  Slide,
  Loading,
  Button,
  Dialog,
  Toast,
  Scroll,
  DatePicker
} from 'cube-ui'

Vue.use(Scroll)
Vue.use(Loading)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(DatePicker)
Vue.use(Slide)

// 单独设置页面的title和meta信息
Vue.use(VueMeta)

// 模版懒加载 可做骨架屏
Vue.use(VueLazyComponent)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
})

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$mock = mock
Vue.prototype._ = lodash

fastclick.attach(document.body)

// 开发环境开启vConsole
if (process.env.NODE_ENV === 'production') {
  const vConsole = new VConsole()
  console.log(vConsole.version)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
