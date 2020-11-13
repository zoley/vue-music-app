import Utils from '@/utils/index'
const song = {
  namespaced: true,
  state: {
    // 是否播放
    playing: false,
    // 是否全屏
    fullScreen: false,
    // 播放顺序列表（默认）
    sequenceList: [],
    // 当前的播放列表
    playList: [],
    // 播放模式 sequence: 0, loop: 1, random: 2
    mode: 0,
    // 当前歌曲索引
    currentIndex: -1
  },
  getters: {
    currentSong(state) {
      return state.playList[state.currentIndex] || {}
    }
  },
  mutations: {
    SET_PLAYING_STATE: (state, payload) => {
      state.playing = payload
    },
    SET_FULL_SCREEN: (state, payload) => {
      state.fullScreen = payload
    },
    SET_PLAY_LIST: (state, payload) => {
      state.playList = payload
    },
    SET_SEQUENCE_LIST: (state, payload) => {
      state.sequenceList = payload
    },
    SET_MODE: (state, payload) => {
      state.mode = payload
    },
    SET_CURRENT_INDEX: (state, payload) => {
      state.currentIndex = payload
    }
  },
  actions: {
    // 选择歌曲播放
    SELECT_SONG_PLAY({ commit, state }, { list, index }) {
      commit('SET_SEQUENCE_LIST', list)
      if (state.mode === 2) {
        const randomList = Utils.shuffle(list)
        commit('SET_PLAY_LIST', randomList)
        index = randomList.findIndex(x => Object.is(x.id, list[index].id))
      } else {
        commit('SET_PLAY_LIST', list)
      }
      commit('SET_CURRENT_INDEX', index)
      commit('SET_PLAYING_STATE', true)
      commit('SET_FULL_SCREEN', true)
    },
    // 随机播放
    RANDOM_SONG_PLAY({ commit, state }, { list }) {
      commit('SET_SEQUENCE_LIST', list)
      commit('SET_MODE', 2)
      const randomList = Utils.shuffle(list)
      commit('SET_PLAY_LIST', randomList)
      commit('SET_CURRENT_INDEX', 0)
      commit('SET_PLAYING_STATE', true)
      commit('SET_FULL_SCREEN', true)
    }

  }
}

export default song
