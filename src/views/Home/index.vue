<template>
  <div class="container">
    <h1>首页</h1>
    <cube-slide class="slide-wrapper"
                :options="options">
      <cube-slide-item v-for="(item, index) in imgList"
                       :key="index"
                       class="slide-item">
        <div @click="selelctSlide(index)">
          <img class="img"
               :src="item.url">
        </div>
      </cube-slide-item>
    </cube-slide>

    <cube-button @click.native="showDatePicker"
                 class="btn">
      Show DatePicker
    </cube-button>

    <cube-button :light="true"
                 :inline="true"
                 :outline="true"
                 @click="handleTestClick"
                 class="btn2">
      Button
    </cube-button>

    <!-- skeleton component -->
    <skeleton slot="skeleton"
              v-if="!imgList.length"></skeleton>
  </div>
</template>

<script type="text/ecmascript-6">
import { getHome } from '@/api'
import { mapGetters, mapMutations } from 'vuex'
import { chunk } from 'lodash-es'
export default {
  data() {
    return {
      imgList: [],
      options: {
        click: true,
        listenScroll: true,
        probeType: 3
      }
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  methods: {
    // 点击按钮
    handleTestClick() {
    },
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
      try {
        const res = await getHome()
        const data = res.data
        this.imgList = data.data.imgList
      } catch (err) {
        console.log('获取数据错误', err)
      }
    },
    ...mapMutations({
      setUserInfo: 'SET_USETINFO'
    })
  },
  created() {
    this._fetchData()
    console.log(chunk(['a', 'b', 'c', 'd'], 2))
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
