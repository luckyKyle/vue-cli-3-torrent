<template>
  <div class="container">
    <h1>首页</h1>

    <cube-slide v-if="imgUrls.length"
                class="slide-wrapper">
      <cube-slide-item v-for="(item, index) in imgUrls"
                       :key="index"
                       class="slide-item">
        <img class="img"
             v-lazy="item.url">
      </cube-slide-item>
    </cube-slide>

    <cube-button @click.native="showDatePicker"
                 class="btn">
      Show DatePicker
    </cube-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { getHome } from '@/api'
export default {
  data() {
    return {
      imgUrls: []
    }
  },
  methods: {
    // 触发时间选择
    showDatePicker() {
      this.$createDatePicker({
        title: 'Date Picker',
        min: new Date(2008, 7, 8),
        max: new Date(2020, 9, 20),
        value: new Date(),
        onSelect: this.selectHandle, // 确定回调
        onCancel: this.cancelHandle // 取消回调
      }).show()
    },
    // 获取数据
    async _fetchData() {
      const res = await getHome()
      try {
        const data = res.data
        this.imgUrls = data.data.imgUrls
        console.log(this.newsList)
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
.container
  background #fff
  overflow hidden
  .slide-wrapper
    width 100%
    height 450px
    .slide-item
      width inherit
      height inherit
      .img
        width 100%
  .btn
    width 300px
    margin auto
</style>
