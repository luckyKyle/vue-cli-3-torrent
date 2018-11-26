<template>
  <div class="container">

    <!-- ScollView -->
    <div class="scroll-list-wrap"
         v-if="newsList.length">
      <cube-scroll ref="scroll">
        <ul class="news-list">
          <li class="item border-bottom-1px"
              v-for="(item, index) in newsList"
              px-border="bottom"
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
        const res = await this.$http.get('users')
        const data = res.data
        this.newsList = data.list
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
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
