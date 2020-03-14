// import { logout } from '../../api/recommend'
import { CHANGE_THEME_ACT } from './type'

const user = {
  namespaced: true,
  state: {
    themes: [{
      name: '玄潭黑',
      code: 'theme',
      color: '#212121',
      checked: true
    }, {
      name: '霜荼白',
      code: 'theme1',
      color: '#fff',
      checked: false
    }],
    dataTheme: 'theme'
  },
  getters: {
  },
  mutations: {
    CHANGE_THEME_MUT: (state, payload) => {
      state.dataTheme = payload
      state.themes.forEach((item) => {
        if (Object.is(item.code, payload)) {
          item.checked = true
        } else {
          item.checked = false
        }
      })
      document.documentElement.setAttribute('data-theme', payload)
    }
  },
  actions: {
    // 用户名登录
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', undefined)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 改变主题颜色
    [CHANGE_THEME_ACT] ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_THEME_MUT', data)
        resolve()
      })
    }
  }
}

export default user
