<template>
  <div ref="progressBarRef" class="parogress-bar" @click="progressBarClick">
    <div class="bar-inner">
      <div ref="progressRef" class="progress" />
      <div ref="progressButtonRef" class="progress-button-wrap">
        <div class="progress-button" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  components: {
  },
  props: {
    // 百分比
    percent: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {
    // 监听进度变化
    percent(val) {
      this.setProgressOffset(val)
    }
  },
  created() {
    this.touch = {}
  },
  mounted() {
  },
  methods: {
    /**
     * 设置进度条的偏移量
     * @param percent 进度百分比
     */
    setProgressOffset(percent) {
      if (percent >= 0) {
        const barWidth = this.$refs.progressBarRef.clientWidth - 16
        const offsetWidth = percent * barWidth
        this.setOffsetWidth(offsetWidth)
      }
    },
    /**
     * 设置进度条宽度
     * @param w 宽度
     */
    setOffsetWidth(w) {
      this.$refs.progressRef.style.width = w + 'px'
      this.$refs.progressButtonRef.style.transform = `translate3d(${w}px,0,0)`
    },
    /**
     * 点击进度条
     * @param e 事件
     */
    progressBarClick(e) {
      //  这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
      const rect = this.$refs.progressBarRef.getBoundingClientRect()
      const offsetWith = e.pageX - rect.left
      this.setOffsetWidth(offsetWith)
      this.emitPercent(offsetWith)
    },
    /**
     * 发送子数据到父集
     * @param w 宽度
     */
    emitPercent(w) {
      const tempPercent = w / (this.$refs.progressBarRef.clientWidth - 16)
      this.$emit('changePercent', tempPercent)
    }
  }
}
</script>

<style lang='scss' scoped>
.parogress-bar{
  position:relative;
  height:30px;
  display: inline-block;
  width:90%;
  .bar-inner{
    height:4px;
    margin-top:13px;
    background:rgba(255,255,255,0.2);
    .progress{
      height:100%;
      width:0;
      @include bg_foot_active_color($font-color-theme-active)
    }
    .progress-button-wrap{
      position:absolute;
      width:30px;
      height:30px;
      top:0;
      left:-8px;
      .progress-button{
        width:16px;
        height:16px;
        margin:7px;
        border:3px solid;
        border-radius:50%;
        box-sizing: border-box;
        @include bg_foot_active_color($font-color-theme-active);
        @include border_sec_color($font-color-theme-sec);
      }
    }
  }
}
</style>
