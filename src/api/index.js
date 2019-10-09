import axiosConfig from '@/libs/axiosConfig'

export default {
  getByAdType (params) {
    return axiosConfig.get('advert/getByAdType.json', params)
  },
  getAliToken () {
    return axiosConfig.get('/console/aliyun/ali-token')
  }
}
