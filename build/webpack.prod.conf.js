const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')

const prodWebpackConfig = merge(baseWebpackConfig, {
  name: '',
  plugins: []
})

module.exports = devWebpackConfig
