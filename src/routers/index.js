import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
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
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/views/My/index.vue'], resolve)
  }]
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    if (localStorage.getItem('username')) { // 判断是否登录
      next()
    } else { // 没登录则跳转到登录界面
      next({
        path: '/Register',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
