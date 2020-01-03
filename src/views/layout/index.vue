<template>
  <div class="layout">
    <div class="nav z-flex">
      <router-link class="nav-item" to="/recommend">推荐</router-link>
      <router-link class="nav-item" to="/singer">歌手</router-link>
      <router-link class="nav-item" to="/ranking">排行</router-link>
      <router-link class="nav-item" to="/search">搜索</router-link>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <button @click="changheme">啊啊啊啊啊啊变色</button>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <button @click="changheme2">啊啊啊啊啊啊变色2</button>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
    ...mapActions('user', [
      'changeTheme'
    ]),
    /**
     * 改变主题
     */
    changheme () {
      this.changeTheme('theme1');
    },
    changheme2 () {
      this.changeTheme('theme');
    }
  }
};
</script>
<style scoped lang="scss">
.layout {
  max-width: 1024px;
  margin: 0 auto;
  @include bg_color($bg-color-theme);
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
