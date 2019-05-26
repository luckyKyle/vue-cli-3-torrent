const path = require('path')
const isDev = process.env.NODE_ENV !== 'production'
const webpackDevConf = require('./build/webpack.dev.conf')
const webpackProdConf = require('./build/webpack.prod.conf')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
const PostCompilePlugin = require('webpack-post-compile-plugin')

const resolve = dir => path.join(__dirname, dir)

const cdn = [
  'https://unpkg.com/vue@2.6.9/dist/vue.min.js',
  'https://unpkg.com/vue-router@3.0.2/dist/vue-router.min.js',
  'https://unpkg.com/vuex@3.1.0/dist/vuex.min.js',
  'https://unpkg.com/element-ui@2.6.1/lib/index.js',
  'https://unpkg.com/axios@0.18.0/dist/axios.min.js',
  'https://unpkg.com/js-cookie@2.2.0/src/js.cookie.js',
  'https://unpkg.com/decimal.js/10.1.1/decimal.min.js',
  'https://unpkg.com/fastclick/1.0.6/fastclick.min.js',
  'https://cdn.bootcss.com/lodash.js/4.17.11/lodash.min.js'
]

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'element-ui': 'ELEMENT',
  axios: 'axios',
  'js-cookie': 'Cookies',
  'decimal.js': 'Decimal',
  fastclick: 'Fastclick',
  lodash: 'Lodash'
}

let proxy = {}
const prefixs = ['banner']
const target = 'http://localhost:3000'
const changeOrigin = true
prefixs.forEach(key => {
  proxy[key] = { target, changeOrigin }
})

module.exports = {
  outputDir: 'dist',
  productionSourceMap: false,
  // css相关配置
  css: {
    // css预设器配置项
    loaderOptions: {
      stylus: {
        'resolve url': true,
        // 这里 新增 import 配置项，指向自定义主题文件
        import: [path.resolve(__dirname, './src/common/stylus/base/theme')]
      }
    }
  },
  // dev-server 服务代理配置
  devServer: {
    open: false, // 配置自启浏览器
    host: '0.0.0.0',
    port: 8088,
    https: false,
    hotOnly: false,
    proxy // 设置代理
  },
  chainWebpack: config => {
    // 修改插件
    const conf = config.toConfig()
    // 自定义cube-ui样式
    config.plugin('post-compile').use(PostCompilePlugin, [
      {
        config: {
          module: {
            rules: [...conf.module.rules]
          }
        }
      }
    ])

    config.plugin('transform-modules').use(TransformModulesPlugin)

    config.resolve.alias.set('@', resolve('src')).set('common', resolve('src/common'))

    // 开启cdn
    if (!isDev) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
      config.externals(externals)
    }
  },
  configureWebpack: () => {
    // 根据Node变量环境返回对应的自定义配置来合并config
    return isDev ? webpackDevConf : webpackProdConf
  }
}
