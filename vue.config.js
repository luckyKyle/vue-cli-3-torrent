const path = require('path')
const DEV = process.env.NODE_ENV !== 'production'
const webpackDevConf = require('./build/webpack.dev.conf')
const webpackProdConf = require('./build/webpack.prod.conf')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
const PostCompilePlugin = require('webpack-post-compile-plugin')

const resolve = dir => path.join(__dirname, dir)

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

    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
  },
  configureWebpack: () => {
    // 根据Node变量环境返回对应的自定义配置来合并config
    return DEV ? webpackDevConf : webpackProdConf
  },
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
  }
}
