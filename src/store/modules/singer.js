
const singer = {
  namespaced: true,
  state: {
    // 当前歌手信息
    currentSinger: {}
  },
  getters: {
  },
  mutations: {
    SET_CURRENT_SINGER: (state, payload) => {
      state.currentSinger = payload
    }
  },
  actions: {
    /*
     * 改变主题颜色
     * [CHANGE_THEME_ACT]({ commit, state }, data) {
     *   return new Promise((resolve, reject) => {
     *     commit('CHANGE_THEME_MUT', data)
     *     resolve()
     *   })
     * }
     */
  }
}

export default singer
