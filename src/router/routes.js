// 路由懒加载
const _import = filename => () => import(`@/views/${filename}/${filename}.vue`)

// 路由配置表
const routes = [
  {
    path: '/',
    name: 'home',
    component: _import('home')
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login')
  },
  {
    path: '/news',
    name: 'news',
    component: _import('news')
  },
  {
    path: '/my',
    name: 'my',
    component: _import('my'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default routes
