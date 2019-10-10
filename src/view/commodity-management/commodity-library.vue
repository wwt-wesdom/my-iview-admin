<template>
  <div>
    commodity-library<br>
    <button @click="updateUserInfo">更新用户信息</button>
  </div>
</template>

<script>
export default {
  name: 'commodity-library',
  methods: {
    async updateUserInfo () {
      await this.$store.dispatch('getUserInfo')
    }
  }
}
</script>

<style scoped>

</style>
