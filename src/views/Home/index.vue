<template>
  <div class="home">
    <h1>首页</h1>
    <div class="btn-wrapper">
      <Button class="btn">调整</Button>
      <Loading></Loading>
    </div>
    <img src=""
         class="banner"
         v-lazy="'https://8.9fpuhui.com/wlc2/images/newRegisterQ/register_banner_1.jpg?time=20170914'">
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Loading } from 'cube-ui'
import { HOME } from '@/api'
export default {
  components: {
    Button,
    Loading
  },
  data() {
    return {

    }
  },
  methods: {
    async _fetchData() {
      const res = await HOME({ id: 1 })
      console.log(res)
      try {
        const data = res.data
        console.log(data)
      } catch (err) {
        console.log('获取数据错误', err)
      }
    }
  },
  created() {
    this._fetchData()
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.home
  background red
  .banner
    text-align center
    max-width 100%
  .btn
    width 120px
</style>
