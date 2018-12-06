const path = require('path')
const OS = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length })
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const merge = require('webpack-merge')
const base = require('./webpack.base.conf.js')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = merge(base, {
  mode: 'production',
  entry: {
    vendor: ['vue', 'lodash-es', 'vuex', 'axios', 'vue-router', 'cube-ui']
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      loader: 'happypack/loader?id=happyBabel'
    }]
  },
  plugins: [
    new HappyPack({
      // 这个HappyPack的“名字”就叫做js，和上面module里rules的查询参数一致
      id: 'happyBabel',
      loaders: ['babel-loader?cacheDirectory'],
      // 指定进程池
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      sourceMap: false,
      uglifyJS: {
        output: {
          beautify: false, // 是否输出可读性较强的代码，即会保留空格和制表符
          comments: false // 是否保留代码中的注释
        },
        compress: {
          warnings: false, // 是否删除没有用到的代码时输出警告信息
          drop_console: true // 是否删除代码中所有的console语句
        }
      }
    }),

    // 提高webpack的tree-shaking的效率
    new WebpackDeepScopeAnalysisPlugin(),

    // 文件结构可视化，找出导致体积过大的原因
    new BundleAnalyzerPlugin()
  ]
})
