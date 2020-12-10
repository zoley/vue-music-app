
const disc = {
  namespaced: true,
  state: {
    // 当前歌单信息
    currentDisc: {}
  },
  getters: {
  },
  mutations: {
    SET_CURRENT_DISC: (state, payload) => {
      state.currentDisc = payload
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

export default disc
