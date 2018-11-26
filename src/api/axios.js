import axios from 'axios'
import Qs from 'qs'
import cookie from '@/utils/cache'
import { toastError } from '@/utils/common'
import { MAX_TIME_OUT, ERR_OK, HOST } from './config'

const Axios = axios.create({
  baseURL: HOST, // 前缀
  timeout: MAX_TIME_OUT, // 超时时间
  responseType: 'json', // 数据格式
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// http请求拦截器<pendding>
Axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // 整理数据格式
      config.data.transformRequest = data => Qs.stringify(data)
    }
    const token = cookie.get('token')
    // 判断是否存在token，即判断用户是否登录
    if (token) {
      cookie.set('token', token, 1 / 12) // 用户每次操作，都将cookie设置成2小时
      config.headers.Authorization = token // 每个http header都加上token
    }

    // 防止get请求获取数据304缓存，必须保证状态为200
    if (config.method === 'get') {
      if (config.params) {
        config.params['_'] = +new Date()
      } else {
        config.params = { _: +new Date() }
      }
    }
    return config
  },
  error => {
    toastError(error.data.message)
    return Promise.reject(error)
  }
)

// http响应拦截器<done>
Axios.interceptors.response.use(
  response => {
    let data = response.data

    if (data.code === ERR_OK) {
      // 判断返回数据格式
      if (typeof data === 'string' && data !== '') {
        data = JSON.parse(data)
      }
      return data
    } else {
      toastError(data.message)
      return Promise.reject(data)
    }
  },
  error => {
    let message = error.message
    // 超时错误
    if (error.code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      message = '网络请求超时，请稍后重试'
      toastError(message)
    }
    return Promise.reject(error)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default Axios
