<template>
  <div class="loading" :class="{ mask }">
    <div class="cube-popup-mask"></div>
    <section class="loading-wrapper">
      <cube-loading />
      <p class="text">{{ text }}</p>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: '加载中'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.loading
  fixed-full(2)
  .loading-wrapper
    pos-center()
    display flex
    justify-content center
    align-items center
    text-align center
    z-index 9
    .text
      padding 0 10px
</style>
