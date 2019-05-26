<template>
  <div class="login">
    <h1 class="tip-text">登陆页</h1>
    <cube-input v-model="username"
                class="input" />
    <cube-input v-model="password"
                :type="'password'"
                class="input"
                autocomplete="new-password" />

    <cube-button @click.native="handleLogin">登录</cube-button>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  data() {
    return {
      username: '', //账户名
      password: '' //密码
    }
  },
  methods: {
    handleLogin() {
      const { username, password } = this
      storage.set('userinfo', { username, password })
      if (!this.username || !this.password) {
        this.$createToast({
          type: 'error',
          txt: '不得为空'
        }).show()
        return
      }
      this.$router.push({ path: '/my' })
    }
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
