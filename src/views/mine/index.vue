<template>
  <div class="mine">
    <custom-nav :title="title"/>
    <div class="cell z-flex" @click="showThemeDialog">
      <span class="cell-name">主题颜色</span>
      <span class="iconfont i-right"></span>
    </div>
   <transition name="shift">
     <div class="theme-wrap" v-if="isShowThemeDialog">
        <theme @closeThemeDialog="closeThemeDialog"/>
     </div>
   </transition>
  </div>
</template>

<script>
import CustomNav from '@/components/CustomNav'
import Theme from '@/components/Theme'
export default {
  data () {
    return {
      title: '我的',
      isShowThemeDialog: false
    }
  },
  components: {
    CustomNav,
    Theme
  },
  mounted () {
  },
  methods: {
    showThemeDialog () {
      this.isShowThemeDialog = true
    },
    closeThemeDialog () {
      this.isShowThemeDialog = false
    }
  }
}
</script>

<style scoped lang="scss">
  .mine{
    max-width: 1024px;
    min-height: 100vh;
    margin: 0 auto;
    @include bg_color($bg-color-theme);
    @include font_color($font-color-theme);
    .cell{
      height:40px;
      justify-content: space-between;
      margin-bottom:$xs;
      padding:0 $xs;
      font-size:$font-mini;
      @include bg_color($bg-color-theme-sec);
      .iconfont{
        font-size:$font-mini;
      }
    }
    .theme-wrap{
      position:fixed;
      left:0;
      right:0;
      bottom:0;
      top:0;
      @include bg_color($bg-color-theme);
      z-index:100;
      &.shift-enter-active,&.shift-leave-active{
        transition: 0.4s all ease;
      }
      &.shift-enter,&.shift-leave-to{
        transform:translate3d(100%,0,0);
        opacity: 0;
      }
    }
  }
</style>
