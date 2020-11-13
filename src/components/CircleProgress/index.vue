<template>
  <div class="svg-box">
    <svg style="transform: rotate(-90deg)" :width="width" :height="width" xmlns="http://www.w3.org/2000/svg">
      <circle
        :r="(width-radius)/2"
        :cy="width/2"
        :cx="width/2"
        :stroke-width="radius"
        :stroke="backgroundColor"
        fill="none"
      />
      <circle
        ref="$bar"
        :r="(width-radius)/2"
        :cy="width/2"
        :cx="width/2"
        :stroke="barColor"
        :stroke-width="radius"
        :stroke-dasharray="(width-radius)*3.14"
        :stroke-dashoffset="isAnimation ? (width-radius) * 3.1415926 : (width - radius) * 3.14 * (100 - progress) / 100"
        fill="none"
      />
    </svg>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CircleProgress',
  filters: {
    // 保留一位小数点
    filterNumber(val) {
      return val.toFixed(1)
    }
  },
  props: {
    // 圆的大小
    width: {
      type: Number,
      default: 60
    },
    // 进度条厚度
    radius: {
      type: Number,
      default: 5
    },
    // 进度条百分比
    progress: {
      type: Number,
      default: 68
    },
    // 是否中间显示进度条文字
    showProgressText: {
      type: Boolean,
      default: true
    },
    // 是否中间显示进度条文字
    textSize: {
      type: Number,
      default: 14
    },
    // 进度条颜色
    barColor: {
      type: String,
      default: '#23985D'
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: '#F0F0F4'
    },
    // 是否是动画效果
    isAnimation: {
      type: Boolean,
      default: false
    },
    // 是否是圆形画笔
    isRound: {
      type: Boolean,
      default: true
    },
    // 组件的id，多组件共存时使用
    id: {
      type: [String, Number],
      default: 1
    },
    // 整个动画时长
    duration: {
      type: [String, Number],
      default: 1000
    },
    // 延迟多久执行
    delay: {
      type: [String, Number],
      default: 100
    },
    // 动画缓动函数
    timeFunction: {
      type: String,
      default: 'cubic-bezier(0.99, 0.01, 0.22, 0.94)'
    }
  },
  data() {
    return {
      // id字符串处理
      idStr: `circle_progress_keyframes_${this.id}`
    }
  },

  beforeDestroy() {
    // 清除旧组件的样式标签
    document.getElementById(this.idStr) && document.getElementById(this.idStr).remove()
  },
  mounted() {
    /*
     * 初始化进度条
     * this.initProgress()
     */
  },
  methods: {
    /**
     * 初始化进度条
     */
    initProgress() {
      if (this.isAnimation) {
        // 重复定义判断
        if (document.getElementById(this.idStr)) {
          console.warn('vue-circle-progress should not have same id style')
          document.getElementById(this.idStr).remove()
        }

        // 生成动画样式文件
        const style = document.createElement('style')
        style.id = this.idStr
        style.innerHTML = `
          @keyframes circle_progress_keyframes_name_${this.id} {
            from {stroke-dashoffset: ${(this.width - this.radius) * 3.14}px;}
            to {stroke-dashoffset: ${(this.width - this.radius) * 3.14 * (100 - this.progress) / 100}px;}
          }
          .circle_progress_bar${this.id} {
            animation: circle_progress_keyframes_name_${this.id} ${this.duration}ms ${this.delay}ms ${this.timeFunction} forwards;
          }`

        // 添加新样式文件
        document.getElementsByTagName('head')[0].appendChild(style)

        // 往svg元素中添加动画class
        this.$refs.$bar.classList.add(`circle_progress_bar${this.id}`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .svg-box{
    position:relative;
    width:100%;
    height:100%;
  }
</style>
