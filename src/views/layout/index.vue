<template>
  <div class="layout">
    <div class="nav z-flex">
      <router-link class="nav-item" to="/recommend">推荐</router-link>
      <router-link class="nav-item" to="/singer">歌手</router-link>
      <router-link class="nav-item" to="/ranking">排行</router-link>
      <router-link class="nav-item" to="/search">搜索</router-link>
    </div>
    <p @click="changeTheme">啊啊啊啊啊啊变色</p>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request';
export default {
  data () {
    return {
      seller: {}
    };
  },
  components: {},
  created () {},
  methods: {
    /**
     * 获取header数据
     */
    getSellerData () {
      request.get('/api/seller').then(res => {
        this.seller = Object.assign({}, res.data);
      });
    },
    /**
     * 改变主题
     */
    changeTheme () {
      window.document.documentElement.setAttribute('data-theme', 'theme1');
    }
  }
};
</script>
<style scoped lang="scss">
@import '../../assets/css/mixin';
.layout {
  max-width: 1024px;
  margin: 0 auto;
  @include bg_color($background-color-theme);
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
