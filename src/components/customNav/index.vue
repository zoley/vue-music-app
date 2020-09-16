<template>
  <div class="custom-nav-box" :class="{'immerse':barType===2}">
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
  name: 'CustomNav',
  props: {
    // 显示左边箭头
    left: {
      type: Boolean,
      default() {
        return true
      }
    },
    // 点击左边箭头方法
    leftFn: {
      type: Function
    },
    // 标题
    title: {
      type: String,
      default() {
        return 'Smile Music'
      }
    },
    // 显示右边按钮
    right: {
      type: String,
      default() {
        return ''
      }
    },
    // 右边按钮方法
    rightFn: {
      type: Function,
      default() {}
    },
    // 导航栏类型- 1-默认式（relative）,2-浸入式（fixed）
    barType: {
      type: Number,
      default() {
        return 1
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  computed: {},
  methods: {
    /**
     * 返回上一级
     */
    backFn() {
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
  &.immerse{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    .custom-nav{
      border:none;
    }
  }
}
</style>
