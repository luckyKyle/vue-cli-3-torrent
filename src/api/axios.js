import axios from 'axios'
import { MAX_TIME_OUT, ERR_OK, HOST } from './config'
import Qs from 'qs'
import cookie from '@/common/utils/cache'
import { Toast } from 'cube-ui'

// 超时时间
axios.defaults.timeout = MAX_TIME_OUT

// 设置默认地址
axios.defaults.baseURL = HOST

// 整理数据格式
axios.defaults.transformRequest = (data) => Qs.stringify(data)

// http请求拦截器
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

  // 判断是否存在ticket，即判断用户是否登录，如果存在的话，则每个http header都加上ticket
  if (cookie.get('token')) {
    // 用户每次操作，都将cookie设置成2小时
    cookie.set('token', cookie.get('token'), 1 / 12)
    // 每个http header都加上ticket
    config.headers.ticket = cookie.get('token')
    // 每个http header都加上personnelid
    if (sessionStorage.loginStaffInfo) {
      config.headers.personnelid = sessionStorage.personnelid
    }
  }
  return config
}, error => {
  // loadinginstace.close()
  Toast.$create({
    time: 0,
    txt: 'Toast time 0'
  })
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      console.log('状态码', response.status)
    }
    if (response.data.code !== ERR_OK) {

      // const toast = this.$createToast({
      //   time: 1000,
      //   txt: 'Toast time 1s'
      // })
      // toast.show()
    } else {
      console.log('this', this)
      return response
    }
  },
  error => {
    return Promise.reject(error.response) // 返回接口返回的错误信息
  })

export default axios
