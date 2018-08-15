const path = require('path')
const DEV = process.env.NODE_ENV !== 'production'
const webpackDevConf = require('./build/webpack.dev.conf')
const webpackProdConf = require('./build/webpack.prod.conf')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    // 修改插件
    config
      .plugin('transform-modules')
      .use(TransformModulesPlugin)

    config.resolve.alias
      .set('cube-ui', 'cube-ui/lib')
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('base', resolve('src/common'))
      .set('utils', resolve('src/ts/utils'))
  },
  configureWebpack(config) {
    // 根据Node变量环境返回对应的自定义配置来合并config
    return DEV ? webpackDevConf : webpackProdConf
  },
  // css相关配置
  css: {
    // css预设器配置项
    loaderOptions: {
      stylus: {
        'resolve url': true
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
    proxy: null, // 设置代理
    before: app => {
      // `app` 是一个 express 实例
    }
  }
}
