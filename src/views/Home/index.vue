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

    <cube-button @click.native="showDatePicker"
                 class="btn">
      show dialog
    </cube-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button } from 'cube-ui'
import { HOME } from '@/api'
export default {
  components: {
    CubeButton: Button
  },
  data() {
    return {
      imgUrls: [],
      datePicker: null
    }
  },
  methods: {
    showDatePicker() {
      this.datePicker = this.$createDatePicker({
        title: 'Date Picker',
        min: new Date(2008, 7, 8),
        max: new Date(2020, 9, 20),
        value: new Date(),
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      this.$createDialog({
        type: 'warn',
        content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
        icon: 'cubeic-alert'
      }).show()
    },
    cancelHandle() {
      this.$createToast({
        type: 'correct',
        txt: 'Picker canceled',
        time: 1000
      }).show()
    },
    async _fetchData() {
      const res = await HOME()
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
  .btn
    width 300px
    margin auto
</style>
