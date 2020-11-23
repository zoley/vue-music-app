<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="Layout">
        <router-view class="router" />
      </keep-alive>
    </transition>
    <player />
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      // 初始过渡动画方向
      transitionName: 'slide-right'
    }
  },
  computed: {
    ...mapState({
      dataTheme: state => state.user.dataTheme
    })
  },
  watch: {
    $route() {
      // 监听路由变化时的状态为前进还是后退
      const isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.dataTheme)
    // window.addEventListener('beforeunload', (e) => {})
    this.SET_FULL_SCREEN(false)
    this.SET_PLAYING_STATE(false)
    this.SET_PLAY_LIST([])
  },
  methods: {
    ...mapMutations('song', [
      'SET_FULL_SCREEN',
      'SET_PLAYING_STATE',
      'SET_PLAY_LIST'
    ])
  }
}
</script>
<style scoped lang="scss">
  #app{
    background:var(--bg-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    .router {
      transition: all .377s ease;
      // will-change: transform;
      // backface-visibility: hidden;
      // perspective: 1000;
    }
    .slide-left-enter,
    .slide-right-leave-active {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      transform: translate3d(-100%, 0 ,0);
    }
  }
</style>
