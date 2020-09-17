<template>
  <div class="frame-wrap mine">
    <custom-nav :title="title" />
    <div class="cell z-flex" @click="showThemeDialog">
      <span class="cell-name">主题颜色</span>
      <span class="iconfont i-right" />
    </div>
    <transition name="shift">
      <div v-if="isShowThemeDialog" class="theme-wrap">
        <theme @closeThemeDialog="closeThemeDialog" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '我的',
      isShowThemeDialog: false
    }
  },
  mounted() {
  },
  methods: {
    showThemeDialog() {
      this.isShowThemeDialog = true
    },
    closeThemeDialog() {
      this.isShowThemeDialog = false
    }
  }
}
</script>

<style scoped lang="scss">
  .mine{
    .cell{
      height:40px;
      justify-content: space-between;
      margin-bottom:$xs;
      padding:0 $xs;
      font-size:$font-mini;
      @include bg_sec_color($bg-color-theme-sec);
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
