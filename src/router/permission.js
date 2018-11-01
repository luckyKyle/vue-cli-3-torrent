import router from './index'
import storage from '@/utils/storage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
  next()
})

router.afterEach(transition => {
  NProgress.done()
})
