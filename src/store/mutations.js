import * as types from './mutation-types'

const mutations = {
  [types.SET_USETINFO](state, userinfo) {
    state.userinfo = userinfo
  }
}

export default mutations
