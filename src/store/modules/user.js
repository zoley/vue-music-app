import { logout } from '../../api/user'
import { CHANGE_THEME_ACT } from './type'

const user = {
  namespaced: true,
  state: {
    dataTheme: 'theme'
  },
  getters: {
  },
  mutations: {
    CHANGE_THEME_MUT: (state, payload) => {
      state.dataTheme = payload;
      document.documentElement.setAttribute('data-theme', payload);
    }
  },
  actions: {
    // 用户名登录
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', undefined)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 改变主题颜色
    [CHANGE_THEME_ACT] ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_THEME_MUT', data);
        resolve();
      })
    }
  }
}

export default user
