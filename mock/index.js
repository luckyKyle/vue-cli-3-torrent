import Vue from 'vue'
import axios from 'axios'
const Mock = require('mockjs')
const MockAdapter = require('axios-mock-adapter')
const instance = axios.create({
  baseURL: '/',
  method: 'get',
  timeout: 10000
})
Object.defineProperty(Vue.prototype, '$ajax', { value: instance })
const mock = new MockAdapter(instance)

mock.onGet('/users').reply((config) => {
  // console.log(config)
  return [
    200,
    Mock.mock({
      ['list|3-' + config.maxCount]: [{
        'id|+1': 1,
        userName: '@cname()'
      }]
    })
  ]
})
mock.onGet('/user').reply(200, { user: 'whidy' })
