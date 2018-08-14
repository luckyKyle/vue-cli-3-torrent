const path = require('path')
const merge = require('webpack-merge')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OS = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length })

const baseWebpackConfig = require('./webpack.base.conf')
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
      uglifyJS: {
        output: { comments: false },
        compress: { warnings: false }
      }
    })
  ]
}