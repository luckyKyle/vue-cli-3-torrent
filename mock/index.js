import * as userinfo from './data/userinfo'

// const path = require('path') // 引入path模块
const Mock = require('mockjs')
const fs = require('fs') // 引入文件系统模块
const Random = Mock.Random
// const getJsonFile = (filePath) => {
//   // const json = fs.readFileSync('./data/' + filePath, 'utf-8')
//   return './data/' + filePath
// }

// const userinfo = require('./data/userinfo')
console.log(fs)
// //返回一个函数
// module.exports = app => {
//   //监听http请求
//   app.get('userinfo', (rep, res) => {
//     //每次响应请求时读取mock data的json文件
//     //util.getJsonFile方法定义了如何读取json文件并解析成数据对象
//     const json = getJsonFile('userinfo.json')
//     console.log(Mock.mock(json))
//     //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
//     res.json(Mock.mock(json))
//   })
// }

// 获取 mock.Random 对象
// const Random = Mock.Random
// mock一组数据
const produceNewsData = function () {
  let test = Mock.mock('/user/userinfo', 'get', userinfo)
  console.log('test===', test)

  let articles = []

  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }
  return { code: 10000, data: { articles } }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData)
