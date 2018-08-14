import axios from 'axios'
import { MAX_TIME_OUT, ERR_OK } from './config'
import Qs from 'qs'
import cookie from '@/utils/cache'
import Vue from 'vue'

// 超时时间
axios.defaults.timeout = MAX_TIME_OUT

// 设置默认地址
axios.defaults.baseURL = process.env.VUE_APP_MOCK_URL

// 整理数据格式
axios.defaults.transformRequest = (data) => Qs.stringify(data)

const vm = new Vue()

// http请求拦截器
axios.interceptors.request.use(config => {
  const toast = vm.$createToast({
    time: 1000,
    text: ''
  })
  toast.show()
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  // 判断是否存在token，即判断用户是否登录，如果存在的话，则每个http header都加上token
  if (cookie.get('token')) {
    // 用户每次操作，都将cookie设置成2小时
    cookie.set('token', cookie.get('token'), 1 / 12)
    // 每个http header都加上token
    config.headers.token = cookie.get('token')
    // 每个http header都加上personnelid
    if (sessionStorage.loginStaffInfo) {
      config.headers.personnelid = sessionStorage.personnelid
    }
  }
  toast.hide()
  return config
}, error => {
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      vm.$createToast({
        time: 1000,
        txt: response.status + '错误'
      }).show()
    }
    if (response.data.code !== ERR_OK) {
      console.log('错误码有误==', response.data)
    } else {
      console.log('拦截请求结果========', response.data)
      return response
    }
  },
  error => {
    return Promise.reject(error.response) // 返回接口返回的错误信息
  })

export default axios