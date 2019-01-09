<template>
  <div class="news">

    <!-- ScollView -->
    <div class="scroll-list-wrap"
         v-if="newsList.length">
      <cube-scroll ref="scroll"
                   :data="newsList">
        <ul class="news-list">
          <li class="item border-bottom-1px"
              v-for="(item, index) in newsList"
              :key="index">
            {{item.userName}}
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
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
      script: [{ innerHTML: 'console.log("Hey!~~!")' }]
    }
  },
  methods: {
    // 获取数据
    async _fetchData() {
      try {
        const res = await this.$http.get('users')
        const data = res.data
        this.newsList = data.list
        this.$store.commit('SET_LOADING', false)
      } catch (err) {
        console.error('获取数据错误 ', err)
      }
    }
  },
  created() {
    this._fetchData()
  }
}
</script>

<style scoped lang="stylus">
@import './main.styl'
</style>
