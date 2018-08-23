import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import * as storage from '@/utils/storage'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/Login'], resolve)
    },
    {
      path: '/news',
      name: 'news',
      component: resolve => require(['@/views/News'], resolve)
    },
    {
      path: '/my',
      name: 'my',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/views/My'], resolve)
    }
  ]
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  let userinfo = storage.get('userinfo')
  // 判断是否需要登录权限
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 判断是否登录
    if (userinfo) {
      next()
    } else {
      // 没登录则跳转到登录界面
      NProgress.start()
      console.log(to.fullPath)
      next({
        path: '/Login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

router.afterEach(transition => {
  NProgress.done()
})

export default router
