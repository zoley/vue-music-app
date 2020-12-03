/*
 * 组件内容复用
 * 作用：多个组件可以共享数据和方法，在使用mixin的组件中引入后，mixin中的方法和属性也就并入到该组件中，可以直接使用。
 * 钩子函数会两个都被调用，mixin中的钩子首先执行。
 */
import { mapState } from 'vuex'

export const playListMixin = {
  computed: {
    ...mapState('song', [
      'playList'
    ])
  },
  mounted() {
    this.handlePlayListHeight(this.playList)
  },
  activated() {
    this.handlePlayListHeight(this.playList)
  },
  watch: {
    playList(val) {
      this.handlePlayListHeight(val)
    }
  },
  methods: {
    /**
     * 处理播放器最小化后列表的高度滚动问题
     * @param {*} list
     */
    handlePlayListHeight(list) {
      throw new Error('component must implement handlePlayListHeight method')
    }
  }
}
