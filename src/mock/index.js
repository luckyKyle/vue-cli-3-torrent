import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'
import Axios from '@/api/axios'

/**********************************************
 * 具体配置参考以下链接，可自行搭配参数
 * https://github.com/ctimmerm/axios-mock-adapter
 * *******************************************/

const files = require.context('./data/', false, /\.js$/) // 获取data文件夹下所有js文件
const interfaces = files.keys().map(key => key.replace(/(\.\/|\.js)/g, '')) // 过滤仅保留文件名

class CreateInterface {
  constructor() {
    this.SUCCESS_STATUS = 200 // 成功状态
    this.FAIL_STATUS = 500 // 失败状态
    this.mocker = new MockAdapter(Axios)
    this.interfaces = interfaces // mock接口列表
  }
  init() {
    const { interfaces, mocker, SUCCESS_STATUS } = this
    interfaces.forEach(filename => {
      mocker
        .onGet(filename)
        .reply(() => [SUCCESS_STATUS, Mock.mock(require(`./data/${filename}`))])
    })
  }
}

const createInterface = new CreateInterface()

createInterface.init()

export default createInterface.mocker
