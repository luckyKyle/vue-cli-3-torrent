<template>
  <div class="container">
    <vue-lazy-component v-if="imgUrls.length"
                        :timeout="200">
      <h1>首页</h1>
      <cube-slide class="slide-wrapper">
        <cube-slide-item v-for="(item, index) in imgUrls"
                         :key="index"
                         class="slide-item">
          <img class="img"
               :src="item.url">
        </cube-slide-item>
      </cube-slide>

      <cube-button @click.native="showDatePicker"
                   class="btn">
        Show DatePicker
      </cube-button>

      <cube-button :light="true"
                   :inline="true"
                   :outline="true"
                   class="btn2">
        Button
      </cube-button>

    </vue-lazy-component>
    <!-- skeleton component -->
    <skeleton slot="skeleton"
              v-if="!imgUrls.length"></skeleton>
  </div>
</template>

<script type="text/ecmascript-6">
import { getHome } from '@/api'
import Skeleton from '@/components/Skeleton'
export default {
  components: {
    Skeleton
  },
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
        console.log('data===', data)
        this.imgUrls = data.data.imgUrls
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
      .img
        display block
        width 100%
  .btn
    margin auto
    width 750px
  .btn2
    margin 15px 0
    width 150px
</style>
