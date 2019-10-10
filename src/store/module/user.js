import {
  login,
  getUserInfo
} from '@/api/user'
import { setStorage, removeStorage } from '@/libs/util'

export default {
  state: {
    userInfo: {},
    hasGetInfo: false
  },
  mutations: {
    setUserInfo (state, userInfo) {
      setStorage('userInfo', userInfo)
      state.userInfo = userInfo
    },
    userLogout (state, router) {
      removeStorage('userInfo')
      removeStorage('accessToken')
      state.userInfo = {}
      router.replace({ name: 'login' })
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  getters: {},
  actions: {
    // 登录
    async handleLogin ({ commit }, { username, password }) {
      username = username.trim()
      const { result } = await login({
        username,
        password
      })
      // setToken('accessToken', result)
      setStorage('accessToken', result)
      const { result: userInfoData } = await getUserInfo()
      commit('setUserInfo', userInfoData)
    },
    // 退出登录
    handleLogOut ({ commit }, router) {
      commit('userLogout', router)
    },

    // 更新用户相关信息
    async getUserInfo ({ state, commit }) {
      const { result: userInfoData } = await getUserInfo()
      commit('setUserInfo', userInfoData)
    }
  }
}
