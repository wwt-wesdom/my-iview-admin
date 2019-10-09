import axios from 'axios'
import store from '@/store'
import { getStorage } from './util'
import router from '@/router'
import { stringify } from 'qs'

const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  /* constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  } */
  static getInsideConfig () {
    return {}
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      const accessToken = getStorage('accessToken')
      if (accessToken) {
        config.headers.accessToken = accessToken
      }
      if (config.method === 'post') {
        config.data = stringify(config.data)
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      const { data: { success, message }, status } = res
      if (status !== 200) {
        if (status === '401') {
          router.replace({ name: 'login' })
        } else if (status === 500) {
          router.push({ name: 'error_500' })
        }
      } else {
        if (success) {
          return res.data
        } else {
          this.$Message.error(message)
          return Promise.reject(message)
        }
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(HttpRequest.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
