import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import singer from './modules/singer'
import disc from './modules/disc'
import song from './modules/song'
import ranking from './modules/ranking'

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
    singer,
    disc,
    song,
    ranking
  },
  plugins
})

export default store
