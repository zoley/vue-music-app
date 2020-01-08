<template>
  <div class="layout">
    <customNav :right="rightCustom" :rightFn="viewMine" :left="false"/>
    <div class="nav z-flex">
      <router-link class="nav-item" to="/recommend"><span>推荐</span></router-link>
      <router-link class="nav-item" to="/singer"><span>歌手</span></router-link>
      <router-link class="nav-item" to="/ranking"><span>排行</span></router-link>
      <router-link class="nav-item" to="/search"><span>搜索</span></router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import customNav from '@/components/customNav'
export default {
  data () {
    return {
      rightCustom: '<span class="iconfont i-user" style="font-size:24px;"></span>'
    };
  },
  components: {
    customNav
  },
  mounted () {
  },
  methods: {
    /**
     * 跳转我的页面
     */
    viewMine () {
      this.$router.push({ path: '/mine' });
    }
  }
};
</script>
<style scoped lang="scss">
.layout {
  max-width: 1024px;
  min-height: 100vh;
  margin: 0 auto;
  @include bg_color($bg-color-theme);
  @include font_color($font-color-theme);
  .header {
    justify-content: center;
    position:relative;
    height:60px;
    box-sizing: border-box;
    border-bottom:1px solid;
    @include border_color($border-color-theme);
    @include font_size($font-medium);
    @include font_color($font-color-theme-active);
    .portrait-wrap{
      margin-right:$xs;
      .iconfont{
        font-size:40px;
      }
    }
    .user{
      position: absolute;
      top:2px;
      right:0;
      padding:$sm;
      @include font_size($font-vast);
    }
  }
  .nav {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    box-sizing: border-box;
    .nav-item {
      flex: 1;
      text-align: center;
      color: rgb(77, 85, 93);
      font-size: 14px;
      text-decoration: none;
      height: 100%;
      line-height: 40px;
      @include font_color($font-color-theme);
      &.router-link-active {
        @include font_color($font-color-theme-active);
      }
    }
  }
}
</style>
