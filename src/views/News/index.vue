<template>
  <div class="container">

    <!-- ScollView -->
    <div class="scroll-list-wrap"
         v-if="newsList.length">
      <cube-scroll ref="scroll">
        <ul class="news-list">
          <li class="item border-bottom"
              v-for="(item, index) in newsList"
              :key="index">
            {{item.userName}}
          </li>
        </ul>
      </cube-scroll>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      newsList: []
    }
  },
  methods: {
    // 获取数据
    async _fetchData() {
      const res = await this.$mock('users')
      try {
        const data = res.data
        this.newsList = data.list
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
.scroll-list-wrap
  height 840px
  background #f4f4f4
  .news-list
    padding 0 20px
    .item
      nowrap()
      height 80px
      line-height 80px
</style>
