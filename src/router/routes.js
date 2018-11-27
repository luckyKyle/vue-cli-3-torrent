// 路由懒加载
const _import = filename => () => import(`@/views/${filename}/${filename}.vue`)

// 路由配置表
const routes = [
  {
    path: '/',
    name: 'home',
    component: _import('Home')
  },
  {
    path: '/login',
    name: 'login',
    component: _import('Login')
  },
  {
    path: '/news',
    name: 'news',
    component: _import('News')
  },
  {
    path: '/my',
    name: 'my',
    component: _import('My'),
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
