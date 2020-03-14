<template>
  <div class="custom-nav-box">
    <div class="custom-nav z-flex">
      <div class="left-wrap">
        <div class="left z-flex" v-if="left" @click="backFn" v-fb>
          <span class="iconfont i-left"></span>
        </div>
      </div>
      <div class="center-wrap z-flex">
        <div class="portrait-wrap" v-if="title==='Smile Music'">
          <span class="iconfont i-mouse"></span>
        </div>
        <span class="title">{{title}}</span>
      </div>
      <div class="right-wrap">
        <div class="right z-flex" v-if="right" v-html="right" @click="rightFn" v-fb></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: Boolean,
      default () {
        return true
      }
    },
    leftFn: {
      type: Function
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
    return {}
  },
  mounted () {},
  computed: {},
  methods: {
    /**
     * 返回上一级
     */
    backFn () {
      this.leftFn ? this.leftFn() : this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-nav-box {
  .custom-nav {
    justify-content: space-between;
    position: relative;
    height: 44px;
    box-sizing: border-box;
    border-bottom: 1px solid;
    @include border_color($border-color-theme);
    @include font_size($font-medium);
    @include font_active_color($font-color-theme-active);
    .left-wrap {
      width: 50px;
      height: 100%;
      .left {
        width: 100%;
        height: 100%;
        justify-content: center;
        .iconfont {
          font-size: 24px;
        }
      }
    }
    .portrait-wrap {
      margin-right: $xs;
      .iconfont {
        font-size: 40px;
      }
    }
    .right-wrap {
      width: 50px;
      height: 100%;
      .right {
        width: 100%;
        height: 100%;
        justify-content: center;
      }
    }
  }
}
</style>
