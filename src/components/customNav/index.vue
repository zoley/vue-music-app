<template>
  <div class="custom-nav-box" :class="{'immerse':barType===2}">
    <div class="custom-nav z-flex">
      <div class="left-wrap">
        <div v-if="left" v-fb class="left z-flex" @click="backFn">
          <span class="iconfont i-left" />
        </div>
      </div>
      <div class="center-wrap z-flex">
        <div v-if="title==='Smile Music'" class="portrait-wrap">
          <span class="iconfont i-mouse" />
        </div>
        <span class="title">{{ title }}</span>
      </div>
      <div class="right-wrap">
        <div v-if="right" v-fb class="right z-flex" @click="rightFn" v-html="right" />
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
      type: Function,
      default: null
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
      default: null
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
  computed: {},
  mounted() {
  },
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
          @include font_size($font_vast);
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
    max-width: 1024px;
    right:0;
    margin:0 auto;
    z-index:10;
    .custom-nav{
      border:none;
    }
  }
}
</style>
