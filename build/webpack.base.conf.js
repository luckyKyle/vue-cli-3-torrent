const path = require('path')
const OS = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length })

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=babel'
      },
      {
        test: /\.vue$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=vue'
      },
      {
        test: /\.styl$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=stylus'
      }
    ]
  },
  plugins: [
    // HappyPack 可以将 Loader 的同步执行转换为多线程并行的，这样就能充分利用系统资源来加快打包效率了
    new HappyPack({
      // HappyPack的id，和上面module里rules的查询参数一致
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threads: 4, // 开启 4 个线程
      threadPool: happyThreadPool, // 指定进程池
      verbose: true
    }),
    new HappyPack({
      id: 'vue',
      threads: 4,
      loaders: ['vue-loader']
    }),
    new HappyPack({
      id: 'stylus',
      threads: 4,
      loaders: ['stylus-loader']
    })
  ]
}
