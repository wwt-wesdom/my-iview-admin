<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getStorage } from '@/libs/util'
export default {
  name: 'App',
  created () {
    const userInfo = getStorage('userInfo')
    if (userInfo) {
      this.$store.commit('setUserInfo', userInfo)
    }
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
