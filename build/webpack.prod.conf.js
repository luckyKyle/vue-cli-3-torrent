const path = require('path')
const webpack = require('webpack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OS = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length })
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const merge = require('webpack-merge')
const base = require('./webpack.base.conf.js')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = merge(base, {
  entry: {
    vendor: ['vue', 'lodash-es', 'vuex', 'axios', 'vue-router', 'cube-ui']
  },
  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   filename: '[name].js',
  //   library: '[name]_[hash]',
  // },
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
      id: 'js',
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
        output: { comments: false },
        compress: { warnings: false }
      }
    }),
    // new WebpackDeepScopeAnalysisPlugin(),

    new webpack.DllPlugin({
      // 生成的映射关系文件
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),

    // 文件结构可视化，找出导致体积过大的原因
    new BundleAnalyzerPlugin()
  ]
})
