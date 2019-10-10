import axios from '@/libs/api.request'

export const login = (data) => {
  return axios.request({
    url: '/console/sys/user/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/console/sys/user/getUserInfo',
    method: 'get'
  })
}
