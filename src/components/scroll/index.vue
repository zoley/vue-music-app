<template>
   <div ref="scrollWrapper">
     <slot/>
   </div>
</template>

<script>
/*
 * better-scroll 官方文档 http://ustbhuangyi.github.io/better-scroll/doc/options.html
 * https://better-scroll.github.io/docs/zh-CN/guide/#betterscroll-是什么
 */
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    /**
     * 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
     * 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
     * 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
     */
    probeType: {
      type: Number,
      default() {
        return 2
      }
    },
    /**
     * better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，
     * better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
     */
    click: {
      type: Boolean,
      default() {
        return true
      }
    },
    // 是否监听滚动事件
    listenScroll: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 是否派发滚动到底部的事件--用于上拉加载
    pullUp: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 是否派发滚动之前的事件
    beforeScroll: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 传入的列表数据
    scrollData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    // 初始化滚动
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  watch: {
    // 监听数据变化刷新组件
    scrollData(val) {
      setTimeout(() => {
        this.refresh()
      }, 200)
    }
  },
  methods: {
    /**
     * 初始化滚动组件
     */
    _initScroll() {
      const that = this
      that.scroll = new BScroll(that.$refs.scrollWrapper, {
        probeType: that.probeType,
        click: that.click
      })
      if (that.listenScroll) {
        that.scroll.on('scroll', (pos) => {
          that.$emit('scroll', pos)
        })
      }
      if (that.pullUp) {
        that.scroll.on('scrollEnd', (pos) => {
          that.$emit('scrollToEnd', pos)
          /*
           * if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
           *   this.$emit('scrollToEnd')
           * }
           */
        })
      }
      if (that.beforeScroll) {
        that.scroll.on('beforeScrollStart', () => {
          that.$emit('beforeScroll')
        })
      }
    },
    /**
     * 禁用滚动
     */
    disable() {
      this.scroll && this.scroll.disable()
    },
    /**
     * 启用滚动
     */
    enable() {
      this.scroll && this.scroll.enable()
    },
    /**
     * 刷新滚动
     */
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    /**
     *滚动到固定位置
     */
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    /**
     * 滚动到固定 dom
     */
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
