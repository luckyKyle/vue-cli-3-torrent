import axios from 'axios'
import { HOST } from './config'

// 首页
export const HOME = (params) => axios.get(HOST + 'home', params)
