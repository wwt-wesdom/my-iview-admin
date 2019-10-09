<template>
  <div class="text-center mt-20">
    <img :src="aboutUsImg" alt="">
  </div>
</template>

<script>
import aboutUsImg from '@/assets/images/home/about_us.png'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      aboutUsImg
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
