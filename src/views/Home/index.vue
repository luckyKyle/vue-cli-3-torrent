<template>
  <div class="container">
    <h1>首页</h1>

    <div v-if="imgUrls.length">
      <div v-for="(item, index) in imgUrls"
           :key="index"
           class="slide-item">
        <img v-lazy="item.url"
             class="img">
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { Slide } from 'cube-ui'
import { HOME } from '@/api'
export default {
  components: {
    UiSlide: Slide
  },
  data() {
    return {
      imgUrls: []
    }
  },
  methods: {
    async _fetchData() {
      const res = await HOME({ id: 1 })
      try {
        const data = res.data
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
  .img
    max-width 50%
    
</style>
