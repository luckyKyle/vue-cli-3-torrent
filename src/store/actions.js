import * as types from './mutation-types'

export const setLoading = ({ commit }, state) => {
  commit(types.SET_LOADING, state)
}
