
const ranking = {
  namespaced: true,
  state: {
    // 当前排行信息
    currentRanking: {}
  },
  getters: {
  },
  mutations: {
    SET_CURRENT_RANKING: (state, payload) => {
      state.currentRanking = payload
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

export default ranking
