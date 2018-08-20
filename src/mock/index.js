import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'
import Axios from './mock'

/**********************************************
 * 具体配置参考以下链接，可自行搭配参数
 * https://github.com/ctimmerm/axios-mock-adapter
 * *******************************************/
class CreateInterface {
  constructor() {
    this.SUCCESS_STATUS = 200 // 成功状态
    this.FAIL_STATUS = 500 // 失败状态
    this.mocker = new MockAdapter(Axios)
    // mock接口列表
    this.interfaces = [
      'users'
    ]
  }
  init() {
    const { interfaces, mocker, SUCCESS_STATUS } = this
    interfaces.forEach(filename => {
      mocker.onGet(filename).reply((config) => [SUCCESS_STATUS, Mock.mock(require(`./data/${filename}`))])
    })
  }
}

const createInterface = new CreateInterface()

createInterface.init()

export default Axios
