<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/news">News</router-link>|
      <router-link to="/my">My</router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <loading v-if="showLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  metaInfo() {
    return {
      title: 'vue-cli种子项目',
      titleTemplate: '%s | 首页'
    }
  },
  computed: {
    ...mapGetters(['showLoading'])
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
body
  font-size $font-28
  color $font-text
  background $color-background
#nav
  padding 30px
  text-align center
  line-height 30px
  margin 50px 0
  a
    font-weight bold
    &.router-link-exact-active
      color #42b983
</style>
