<template>
  <div class="custom-nav z-flex">
    <div class="back-wrap">
      <span class="iconfont i-left"></span>
    </div>
    <div class="center-wrap">
      <div class="portrait-wrap">
        <span class="iconfont i-mouse"></span>
      </div>
      <span class="title">Smile Music</span>
    </div>
    <div class="right-wrap">
      <span @click="viewMine" class="user iconfont i-user"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: Boolean,
      default () {
        return false
      }
    },
    title: {
      type: String,
      default () {
        return 'Smile Music'
      }
    },
    right: {
      type: String,
      default () {
        return ''
      }
    },
    rightFn: {
      type: Function,
      default () {}
    }
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  computed: {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .custom-nav {
    justify-content: space-between;
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
</style>