const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const devWebpackConfig = merge(baseWebpackConfig, {
  name: '',
  plugins: []
})

module.exports = devWebpackConfig