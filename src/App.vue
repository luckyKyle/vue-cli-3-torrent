<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/news">News</router-link>|
      <router-link to="/my">My</router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
</script>

<style lang="stylus">
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
