import * as types from './mutation-types'

const mutations = {
  [types.SET_USETINFO](state, userinfo) {
    state.userinfo = userinfo
  },
  [types.SET_LOADING](state, isShow) {
    state.showLoading = isShow
  }
}
export default mutations
