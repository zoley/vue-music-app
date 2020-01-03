<template>
  <div class="layout">
    <div class="header z-flex">
      <div class="portrait-wrap">
        <span class="iconfont i-mouse"></span>
      </div>
      <span class="title">Smile Music</span>
      <span class="user iconfont i-user"></span>
    </div>
    <div class="nav z-flex">
      <router-link class="nav-item" to="/recommend">推荐</router-link>
      <router-link class="nav-item" to="/singer">歌手</router-link>
      <router-link class="nav-item" to="/ranking">排行</router-link>
      <router-link class="nav-item" to="/search">搜索</router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      seller: {}
    };
  },
  components: {},
  mounted () {
  },
  methods: {
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
    border-bottom:1px solid #343434;
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
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
