import * as types from './mutation-types'

const mutations = {
  [types.SET_USETINFO](state, userinfo) {
    state.userinfo = userinfo
  },
  [types.SET_LOADING](state, isShow) {
    // error 的时候直接重置
    if (!isShow) {
      state.showLoading = false
      return
    }
    state.showLoading = isShow ? ++state.showLoading : --state.showLoading
  }
}
export default mutations
