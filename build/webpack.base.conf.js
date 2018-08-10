const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const HappyPack = require('happypack')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')

module.exports = {
  module: {},
  plugins: [
    new TransformModulesPlugin()
  ]
}