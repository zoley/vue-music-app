import { logout } from '../../api/user'
import { changeTheme } from './type'

const user = {
  namespaced: true,
  state: {
    dataTheme: 'theme'
  },
  getters: {
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    CHANGE_THEME: (state, payload) => {
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
          commit('SAVE_USER_INFO', {})
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 改变主题颜色
    [changeTheme] ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_THEME', data);
        resolve();
      })
    }
  }
}

export default user
