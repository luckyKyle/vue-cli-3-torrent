<template>
  <div class="container">
    <vue-lazy-component v-if="imgUrls.length">
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    Skeleton
  },
  data() {
    return {
      imgUrls: []
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
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
    async _fetchData(test) {
      try {
        const res = await getHome()
        const data = res.data
        this.imgUrls = data.data.imgUrls
      } catch (err) {
        console.log('获取数据错误', err)
      }
    },
    ...mapMutations({
      setUserInfo: 'SET_USETINFO'
    })
  },
  created() {
    setTimeout(() => {
      this._fetchData()
    }, 1500)
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
