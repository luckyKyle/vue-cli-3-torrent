<template>
  <div class="container">
    <h1 class="tip-text"> {{msg}}</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      msg: '未授权，跳到登陆'
    }
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
