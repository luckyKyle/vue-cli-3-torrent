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
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  metaInfo() {
    return {
      title: 'vue-cli种子项目',
      titleTemplate: '%s | 首页'
    }
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
  margin-top 50px
  a
    font-weight bold
    color $color-green
    &.router-link-exact-active
      color #42b983
</style>
