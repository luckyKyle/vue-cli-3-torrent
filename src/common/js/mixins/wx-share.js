/**
 * 微信js-sdk接口
 * 官方地址：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */

export default {
  methods: {
    // 判断是否微信环境
    isWeiXin() {
      const ua = window.navigator.userAgent.toLowerCase()
      return /MicroMessenger/i.test(ua)
    },
    // 调用微信接口
    wxRegister(callback) {
      if (!this.isWeiXin()) return false

      // 页面url#前的完整url
      const url = window.location.href.split('#')[0]

      this.$store.dispatch('shareWechat', { url }).then(res => {
        const wx = window.wx
        wx.config({
          debug: window.WX_DEBUG || false,
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.noncestr,
          signature: res.sign,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })

        wx.ready(function() {
          // 执行回调
          callback && callback()
        })
      })
    },
    // 开启分享
    wxShare(opts = {}) {
      // 解构参数处理判断
      const { title, desc, link, imgUrl } = opts
      if (!title || !desc || !link || !imgUrl) {
        console.error('wxShare缺少必要参数title、desc、link、imgUrl')
        return false
      }

      const wx = window.wx
      // 分享到朋友圈
      wx.onMenuShareTimeline(opts)
      // 分享给朋友
      wx.onMenuShareAppMessage(opts)
    }
  }
}
