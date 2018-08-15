import axios from 'axios'
import Qs from 'qs'
import cookie from '@/utils/cache'
import Vue from 'vue'
import { MAX_TIME_OUT, ERR_OK, HOST } from './config'

const vm = new Vue()
const axiosDefaults = axios.defaults

// 超时时间
axiosDefaults.timeout = MAX_TIME_OUT

// 设置默认地址
axiosDefaults.baseURL = HOST

// 整理数据格式
axiosDefaults.transformRequest = (data) => Qs.stringify(data)

// http请求拦截器<pedding>
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  const token = cookie.get('token')
  // 判断是否存在token，即判断用户是否登录
  if (token) {
    // 用户每次操作，都将cookie设置成2小时
    cookie.set('token', token, 1 / 12)
    // 每个http header都加上token
    config.headers.token = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// http响应拦截器<done>
axios.interceptors.response.use(
  (response) => {
    let data = response.data
    // 判断返回数据格式
    if (typeof data === 'string' && data !== '') {
      data = JSON.parse(data)
    }

    if (data.code === ERR_OK) {
      console.log('后台原始数据===', response.data)
      return response
    } else {
      vm.$createToast({ txt: data.message }).show()
    }
  },
  error => {
    return Promise.reject(error.response)
  })

export default axios
