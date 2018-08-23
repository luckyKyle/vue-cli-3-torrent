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
      newsList: [],
      pageTitle: '新闻'
    }
  },
  metaInfo() {
    return {
      title: this.pageTitle,
      titleTemplate: '%s - Test',
      script: [{ innerHTML: 'console.log("Hey!~~!")', type: 'text/javascript' }]
    }
  },
  methods: {
    // 获取数据
    async _fetchData() {
      try {
        const res = await this.$mock('users')
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
@import './main'
</style>
