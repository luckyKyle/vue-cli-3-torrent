<template>
  <div class="container">
    <cube-slide class="slide-wrapper"
                :data="banners"
                :options="options"
                v-if="banners.length">
      <cube-slide-item v-for="(item, index) in banners"
                       :key="index"
                       class="slide-item"
                       @click.native="selelctSlide(index)">
        <a>
          <img class="img"
               :src="item.imageUrl">
        </a>
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
                 class="btn2">Button
    </cube-button>

    <!-- skeleton component -->
    <skeleton slot="skeleton"
              v-if="!banners.length"></skeleton>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '@/api'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      banners: []
    }
  },
  computed: {
    options() {
      return {
        click: true,
        listenScroll: true,
        probeType: 3
      }
    },
    ...mapGetters(['userinfo'])
  },
  methods: {
    // 点击按钮
    handleTestClick() {
      this.$store.commit('SET_USETINFO', { name: '123' })
    },
    // 触发时间选择
    showDatePicker() {
      console.log(this.userinfo)
      this.$createDatePicker({
        title: 'Date Picker',
        min: new Date(2008, 7, 8),
        max: new Date(2020, 9, 20),
        value: new Date(),
        onSelect: this.selectHandle, // 确定回调
        onCancel: this.cancelHandle // 取消回调
      }).show()
    },
    selelctSlide(index) {
      let str = ''
      index = parseInt(index)
      switch (index) {
        case 1:
          str = 1
          break
        case 2:
          str = 2
          break
        case 3:
          str = 3
          break
        case 0:
          str = 0
          break
      }
      console.log('选择了', index, str)
    },
    selectHandle() {
      console.log('确定了')
    },
    cancelHandle() {
      console.log('取消了')
    },
    // 获取数据
    async _fetchData() {
      try {
        const res = await api.getBanner()
        const data = res.data
        this.banners = data.banners
        console.log('banner列表==', this.banners)
      } catch (err) {
        console.error('获取数据错误', err)
      }
    },
    ...mapMutations({
      setUserInfo: 'SET_USETINFO'
    })
  },
  created() {
    this._fetchData()
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
