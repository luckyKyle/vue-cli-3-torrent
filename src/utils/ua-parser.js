// 判断设备UA环境
import UAParser from 'ua-parser-js'

export function checkVersion(curVersion, reqVersion = '') {
  const curV = curVersion.split('.')
  const reqV = reqVersion.split('.')

  const [a1 = '0', b1 = '0', c1 = '0'] = curV
  const [a2 = '0', b2 = '0', c2 = '0'] = reqV

  const a = parseInt(a1, 10) - parseInt(a2, 10)
  const b = parseInt(b1, 10) - parseInt(b2, 10)
  const c = parseInt(c1, 10) - parseInt(c2, 10)

  return a > 0 || (a === 0 && (b > 0 || (b === 0 && c >= 0)))
}

class UA {
  constructor() {
    const parser = new UAParser()
    this.ua = parser.getUA()
    this.os = parser.getOS()
    this.device = parser.getDevice()
    this.browser = parser.getBrowser()
  }

  isIOS() {
    return this.os.name === 'iOS'
  }

  isIphoneX() {
    return (
      this.os.name === 'iOS' &&
      (window.screen.height === 812 && window.screen.width === 375)
    )
  }

  isAndroid() {
    return this.os.name === 'Android'
  }

  isWX() {
    return this.browser.name === 'WeChat'
  }

  isQQ() {
    return this.browser.name === 'QQ'
  }

  isWB() {
    // return true
    return this.browser.name === 'WB'
  }

  isChrome() {
    return this.browser.name === 'Chrome'
  }

  isMobile() {
    return this.device.type === 'mobile'
  }

  isAppName(name) {
    return this.ua.indexOf(name) !== -1
  }

  isApp() {
    return this.isAppName('sunline')
  }

  isIOSApp() {
    return this.isIOS() && this.isApp()
  }

  isUnderIOS8() {
    return this.isIOS() && checkVersion('9', this.os.version)
  }
}

export default new UA()
