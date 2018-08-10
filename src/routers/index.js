import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'home',
    component: resolve => require(['@/views/Home/index.vue'], resolve)
  },
  {
    path: '/news',
    name: 'news',
    component: resolve => require(['@/views/News/index.vue'], resolve)
  },
  {
    path: '/stockCircle',
    name: 'stockCircle',
    component: resolve => require(['@/views/StockCircle/index.vue'], resolve)
  },
  {
    path: '/my',
    name: 'my',
    component: resolve => require(['@/views/My/index.vue'], resolve)
  }]
})
