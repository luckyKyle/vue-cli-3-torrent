import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'
import storage from '@/utils/storage'
// import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const isDev = process.env.NODE_ENV !== 'production'

const createPersisted = createPersistedState({
  key: 'vuexStorage',
  storage: {
    getItem: key => storage.get(key),
    setItem: (key, value) => storage.set(key, value),
    removeItem: key => storage.remove(key)
  },
  // 该参数配置需要单独存入storage的state对象
  reducer: state => {
    return {
      userinfo: state.userinfo
    }
  }
})

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: isDev,
  //插件: 状态持久化
  plugins: isDev ? [createPersisted] : []
})
