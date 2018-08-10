import Vue from 'vue'
import App from './App.vue'
import router from '@/routers'
import store from '@/store'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'

import './common/stylus/index.styl'

Vue.config.productionTip = false

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
})

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
