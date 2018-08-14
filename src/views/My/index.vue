<template>
  <div class="container">
    个人中心
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      myTitle: '标题'
    }
  },
  metaInfo: {
    title: '个人中心',
    titleTemplate: '%s - Test',
    script: [{ innerHTML: 'console.log("hello hello!")', type: 'text/javascript' }]
  }
}
</script>

<style scoped lang="stylus">
</style>
