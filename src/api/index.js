import axios from 'axios'
import { HOST } from './config'

// 首页
export const getHome = (params) => axios.get(HOST + 'home', params)

export const getNews = (params) => axios.get(HOST + 'test', params)
