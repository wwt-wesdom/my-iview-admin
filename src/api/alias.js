import axios from '@/libs/api.request'

export const getAliToken = () => {
  return axios.request({
    url: '/console/aliyun/ali-token',
    method: 'get'
  })
}
