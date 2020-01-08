<template>
  <div class="mine">
    <customNav :title="title"/>
    <div class="z-flex">
      <div class="img-wrap">
        <span class="iconfont i-mouse"></span>
      </div>
      <label>
        <span>主题颜色</span>
        <span class="iconfont i-right"></span>
      </label>
    </div>
  </div>
</template>

<script>
import customNav from '@/components/customNav'
export default {
  data () {
    return {
      title: '我的'
    };
  },
  components: {
    customNav
  },
  mounted () {
  },
  methods: {

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
  }
</style>