<template>
  <div class="layout">
    <custom-nav :right="rightCustom" :rightFn="viewMine" :left="false"/>
    <div class="nav z-flex">
      <router-link v-for="(item,index) in navList" :key="index" class="nav-item" :to="item.path" @click.native="viewPage(index)">{{item.text}}</router-link>
      <b class="slide-line" :style="'transform:translate3d('+(translateX / 0.11)+'%,0,0)'"></b>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import CustomNav from '@/components/CustomNav'
export default {
  data () {
    return {
      navList: [
        {
          text: '推荐',
          path: '/recommend'
        },
        {
          text: '歌手',
          path: '/singer'
        },
        {
          text: '排行',
          path: '/ranking'
        },
        {
          text: '搜索',
          path: '/search'
        }
      ],
      rightCustom: '<span class="iconfont i-user" style="font-size:24px;"></span>',
      translateX: 7
    }
  },
  components: {
    CustomNav
  },
  mounted () {
    // 设置导航下划线与路由匹配
    this.findRouteIndex()
  },
  methods: {
    /**
     * 找到当前路由对应的导航索引
     */
    findRouteIndex () {
      let index = this.navList.findIndex(item => Object.is(item.path, this.$route.path))
      this.viewPage(index)
    },
    /**
     * 跳转我的页面
     */
    viewMine () {
      this.$router.push({ path: '/mine' })
    },
    /**
     * 跳转页面
     */
    viewPage (i) {
      this.translateX = i * 25 + 7
    }
  }
}
</script>
<style scoped lang="scss">
.layout {
  max-width: 1024px;
  min-height: 100vh;
  margin: 0 auto;
  @include bg_color($bg-color-theme);
  @include font_color($font-color-theme);
  .nav {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    box-sizing: border-box;
    position:relative;
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
        @include font_active_color($font-color-theme-active);
      }
    }
    .slide-line{
      position: absolute;
      left:0;
      bottom:0;
      height:2px;
      width:11%;
      transition: 0.2s all ease;
      @include bg_foot_active_color($font-color-theme-active);
    }
  }
}
</style>
