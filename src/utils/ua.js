const systemInfo = {
  isIpad: 'ipad',
  isIphoneOs: 'iphone',
  isMidp: 'midp',
  isUc7: 'rv:1.2.3.4',
  isUc: 'ucweb',
  isAndroid: 'android',
  isCE: 'windows ce',
  isWM: 'windows mobile',
  isWeiXin: 'micromessenger',
  isApp: 'sunline',
  isCustomApp: 'sunline_custom'
}

const checkVersion = (version1 = [], version2 = []) => {
  if (!Array.isArray(version1) || !Array.isArray(version2)) return false
  const [a1 = '0', b1 = '0', c1 = '0'] = version1
  const [a2 = '0', b2 = '0', c2 = '0'] = version2

  const a = parseInt(a1, 10) - parseInt(a2, 10)
  const b = parseInt(b1, 10) - parseInt(b2, 10)
  const c = parseInt(c1, 10) - parseInt(c2, 10)

  return a > 0 || (a === 0 && (b > 0 || (b === 0 && c >= 0)))
}

class UserAgent {
  ua = navigator.userAgent
  uaLower = this.ua.toLowerCase()
  s = {}

  constructor() {
    Object.keys(systemInfo).forEach(i => {
      this.s[i] = false
      if (this.uaLower.indexOf(systemInfo[i]) > 0) {
        this.s[i] = true
      }
    })

    const appUAStr = this.uaLower.substr(this.uaLower.search(/sunline/)) || ''
    const appUAArr = appUAStr.split('-')
    const versionStr = appUAArr[2] || ''
    this.version = versionStr.split('.') || []
  }

  isIOSApp() {
    return this.isIOS() && this.isApp()
  }

  isCustomApp() {
    return this.s.isCustomApp
  }

  isIOS() {
    return this.s.isIpad || this.s.isIphoneOs
  }

  isAndroid() {
    return this.s.isMidp || this.s.isUc7 || this.s.isUc || this.s.isAndroid
  }

  isUnderIOS8() {
    const OS_INFO = this.ua.match(/OS (\d+)_(\d+)_?(\d+)?/)
    if (!OS_INFO) return false
    return parseInt(OS_INFO[1], 10) <= 8
  }

  isApp() {
    return this.s.isApp
  }

  isAppName(name) {
    return this.ua.indexOf(name) !== -1
  }

  isOldVersion() {
    if (!this.version || this.version === '') return false
    return checkVersion(['0', '0', '2'], this.version)
  }

  isNewVersion(appVersion) {
    if (!this.version || this.version === '') return false
    if (!appVersion || appVersion === '') return false

    return checkVersion(this.version, appVersion.split('.'))
  }

  isMobile() {
    return !!this.ua.match(/AppleWebKit.*Mobile.*/)
  }

  isMobileQQ() {
    /* eslint-disable */
    return (
      /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(this.ua) ||
      /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(this.ua)
    )
  }

  isWeiXin() {
    return /MicroMessenger/i.test(this.ua)
  }

  // 小程序的webview
  isMpWebview() {
    return window.__wxjs_environment === 'miniprogram'
  }

  isChrome() {
    return this.ua.match(/Chrome\/([\d.]+)/) || this.ua.match(/CriOS\/([\d.]+)/)
  }
}

export default new UserAgent()
