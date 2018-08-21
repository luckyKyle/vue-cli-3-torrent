<template>
  <div class="container">
    个人中心
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      pageTitle: '个人中心'
    }
  },
  metaInfo() {
    return {
      title: this.pageTitle,
      titleTemplate: '%s - Test',
      script: [{ innerHTML: 'console.log("Hey!~~!")', type: 'text/javascript' }]
    }
  }
}
</script>


<style scoped lang="stylus">
@import './main'
</style>

