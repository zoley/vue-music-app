<template>
  <div class="loading-wrap">
    <span class="iconfont i-xingzhuang" />
    <p>{{ loadingMsg }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loadingMsg: {
      type: String,
      default() {
        return '拼命加载中···'
      }
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .loading-wrap{
    text-align: center;
    @include font_color($font-color-theme);
    .iconfont{
      font-size:20px;
      margin-bottom:$sm;
      display:inline-block;
      animation:rotate 0.7s linear infinite;
    }
  }
  @keyframes rotate {
    0%{transform: rotate(0);}
    100%{transform: rotate(360deg);}
  }
</style>
