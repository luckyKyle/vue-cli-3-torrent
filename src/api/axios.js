import axios from 'axios'
import Qs from 'qs'
import cookie from '@/utils/cache'
import Vue from 'vue'
import { MAX_TIME_OUT, ERR_OK, HOST } from './config'

const vm = new Vue()

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
    return config
  },
  error => {
    console.log('error')
    vm.$createToast({ txt: error.data.message }).show()
    return Promise.reject(error)
  }
)

// http响应拦截器<done>
Axios.interceptors.response.use(
  response => {
    console.log('response', response)
    let data = response.data
    // 判断返回数据格式
    if (typeof data === 'string' && data !== '') {
      data = JSON.parse(data)
    }
    if (data.code === ERR_OK) {
      console.log('后台原始数据===', response.data)
    } else {
      vm.$createToast({ txt: data.message }).show()
    }
    return response
  },
  error => {
    console.log('error.response', error.response.message)
    return Promise.reject(error.response)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default Axios
