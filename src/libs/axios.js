import axios from 'axios'
import { getStorage } from './util'
import router from '@/router'
import { stringify } from 'qs'
import { Message } from 'iview'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

class HttpRequest {
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
      console.log(error)
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
          Message.error(message)
          return Promise.reject(message)
        }
      }
    }, error => {
      // this.destroy(url)
      console.log(error)
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
