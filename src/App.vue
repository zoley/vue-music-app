<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="layout">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  computed: {
    ...mapState({
      dataTheme: state => state.user.dataTheme
    })
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.dataTheme)
  }
}
</script>
<style scoped lang="scss">
  .slide-left-enter-active,.slide-left-leave-active{transition:0.4s all linear;}
  .slide-left-enter,.slide-left-leave-to{transform:translate3d(-100%,0,0);opacity: 0;}
</style>
