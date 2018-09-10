const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OS = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length })
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happybabel'
      }]
  },
  plugins: [
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader'],
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
    new WebpackDeepScopeAnalysisPlugin()
  ]
}
