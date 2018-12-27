import router from './index'
import storage from '@/utils/storage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  const userinfo = storage.get('userinfo')

  // 判断是否需要登录权限
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 判断是否登录
    if (userinfo) {
      console.log('userinfo==>', userinfo)
      next()
    } else {
      // 没登录则跳转到登录界面
      NProgress.start()
      console.log('当前路由==>', to.fullPath)
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
  // store.commit('SET_LOADING', false)
  next()
})

router.afterEach(() => {
  NProgress.done()
})
