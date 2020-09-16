import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import singer from './modules/singer'

Vue.use(Vuex)

const plugins = [
  createPersistedState({
    key: 'APP_',
    storage: window.sessionStorage
    /*
     * reducer (val) {
     *   return {
     *     user: val.user // 只储存state中的user
     *   }
     * }
     */
  })
]
const store = new Vuex.Store({
  modules: {
    user,
    singer
  },
  plugins
})

export default store
