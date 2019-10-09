import axios from 'axios'
import store from '@/store'
import { getStorage, removeStorage } from './util'
import { stringify } from 'qs'
import router from './../router'

// 配置请求响应时间
axios.defaults.timeout = 100000
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    config.headers.platForm = 'H5'
    const token = getStorage('token')
    if (token) config.headers['token'] = `${token}`
    if (config.method === 'post') {
      let isFormData =
        Object.prototype.toString.call(config.data) === '[object FormData]'
      if (!isFormData) {
        config.data = stringify(config.data)
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          // token过期
          store.commit('OUT_LOGIN')
          router.replace({ path: '/login' })
          error.response.statusText = '账号过期，请重新登录！'
          break
        case 403:
          removeStorage('token')
          error.response.statusText = '登录失效，请重新登录！'
          break
        case 404:
          error.response.statusText = 'api地址不存在！'
          break
        default:
          error.response.statusText = '服务端异常'
      }
    }
    return Promise.reject(error)
  }
)

// 返回一个Promise(发送post请求)
const axiosPost = (url, params = {}) => {
  return axios.post(`/${url}`, params)
}

// 返回一个Promise(发送get请求)
const axiosGet = (url, params = {}) => {
  return axios.get(`/${url}`, { params: params })
}

export default {
  get: axiosGet,
  post: axiosPost
}
