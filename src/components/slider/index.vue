<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active:currentPageIndex===index}" v-for="(item,index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSlideWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => { // 视口改变自适应
      if (!this.slider) {
        return
      }
      this._setSlideWidth(true) // 重新设置宽度
      this.slider.refresh() // 刷新轮播
    })
  },
  computed: {},
  methods: {
    /**
     * 設置輪播寬度
     */
    _setSlideWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth // 如果是循环播放，在首尾各多一个，所以是本例中是（5+2）倍大小
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    /**
     * 初始化slider组件
     */
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) { // 继续轮播
          clearTimeout(this.timer)
          this._play()
        }
      })
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    /**
     * 初始化点点
     */
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    /**
     * 轮播
     */
    _play () {
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>

<style lang='scss' scoped>
.slider{
  position:relative;
  overflow:hidden;
  .slider-group{
    position:relative;
    overflow:hidden;
    white-space:nowrap;
    .slider-item{
      float:left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a{
        width:100%;
        display:block;
        overflow: hidden;
        img{
          vertical-align: top;
          width:100%;
        }
      }
    }
  }
  .dots{
    position: absolute;
    left:0;
    right:0;
    bottom:12px;
    text-align: center;
    font-size:0;
    .dot{
      display:inline-block;
      margin:0 4px;
      width:8px;
      height:8px;
      border-radius:50%;
      transition:0.3s all linear;
      @include bg_foot_color($font-color-theme);
      &.active{
        width:20px;
        border-radius:5px;
        @include bg_foot_active_color($font-color-theme-active);
      }
    }
  }
}

</style>
