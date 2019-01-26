import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMeta from 'vue-meta'
import VueLazyLoad from 'vue-lazyload'

import fastclick from 'fastclick'
import lodash from 'lodash-es'
import axios from './api/axios'

import './mock'

import './common/stylus/index.styl'
import './common/js/rem'
import './router/permission'
import './components/register'

import Notification from './createApp/Notification'

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

Vue.use(Notification)

// 单独设置页面的title和meta信息
Vue.use(VueMeta)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
})

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$lodash = lodash

fastclick.attach(document.body)

// 开发环境开启vConsole
if (process.env.NODE_ENV === 'production') {
  const VConsole = require('vconsole')
  const vConsole = new VConsole()
  console.log(vConsole.version)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
