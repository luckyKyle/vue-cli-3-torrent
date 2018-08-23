import axios from 'axios'
import Vue from 'vue'

const vm = new Vue()

const Axios = axios.create({
  baseURL: '/',
  method: 'get',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// http请求拦截器<pendding>
Axios.interceptors.request.use(
  config => config,
  error => {
    console.log('error')
    vm.$createToast({ txt: error.data.message }).show()
    return Promise.reject(error)
  }
)

// http响应拦截器<done>
Axios.interceptors.response.use(
  response => {
    console.log('原始mock数据', response)
    // 判断返回数据格式
    return response.data
  },
  error => {
    return Promise.reject(error.response.data.message)
  }
)

export default Axios
