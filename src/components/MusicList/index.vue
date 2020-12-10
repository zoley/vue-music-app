<template>
  <div class="frame-wrap singer-detail-wrap">
    <custom-nav :title="title" :bar-type="2" />
    <div ref="bgImageRef" class="bg-avatar" :style="bgStyle">
      <div v-show="songList.length>0" ref="randomPlayBtnRef" v-fb class="play-box" @click="handleRandomPlay">
        <i class="iconfont i-bofang" />
        <span>随机播放全部</span>
      </div>
      <div ref="filterRef" class="filter" />
    </div>
    <div ref="bgLayerRef" class="bg-layer" />
    <scroll
      ref="songListRef"
      class="scroll-list"
      :listen-scroll="true"
      :probe-type="3"
      :scroll-data="songList"
      @scroll="onScroll"
    >
      <song-list :list-data="songList" @select-item="handleSelectSong" />
    </scroll>
    <div v-show="songList.length<1" class="loading-container">
      <loading />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { playListMixin } from '@/utils/mixin'
const NAV_HEIGHT = 44
export default {
  name: 'MusicList',
  mixins: [playListMixin],
  props: {
    // 标题
    title: {
      type: String,
      default() {
        return 'Smile Music'
      }
    },
    // 背景图片地址
    backgroundUrl: {
      type: String,
      default() {
        return ''
      }
    },
    // 歌曲列表
    songList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 滚动距离
      scrollY: 0
    }
  },
  computed: {
    // 歌手头像背景
    bgStyle() {
      return `background-image:url(${this.backgroundUrl});`
    }
  },
  watch: {
    // 监听列表滚动距离
    scrollY(newVal) {
      const translateY = Math.max(this.maxTranslateY, newVal)
      const percent = Math.abs(newVal / this.imageH)
      let zIndex = 0
      let scale = 1
      let blur = 0
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 2
      } else {
        blur = Math.min(20 * percent, 20)
      }
      if (newVal < this.maxTranslateY) {
        zIndex = 2
        this.$refs.bgImageRef.style.paddingTop = 0
        this.$refs.bgImageRef.style.height = NAV_HEIGHT + 'px'
        this.$refs.randomPlayBtnRef.style.display = 'none'
      } else {
        zIndex = 0
        this.$refs.bgImageRef.style.paddingTop = '70%'
        this.$refs.bgImageRef.style.height = 0
        this.$refs.randomPlayBtnRef.style.display = ''
      }
      this.$refs.bgLayerRef.style.transform = `translate3d(0,${translateY}px,0)`
      this.$refs.filterRef.style.backdropFilter = ` blur(${blur}px)`
      // this.$refs.bgImageRef.style.filter = ` blur(${blur}px)`
      this.$refs.bgImageRef.style.zIndex = zIndex
      this.$refs.bgImageRef.style.transform = `scale(${scale})`
    }
  },
  created() {
  },
  mounted() {
    // 设置歌曲列表top值
    this.imageH = this.$refs.bgImageRef && this.$refs.bgImageRef.clientHeight
    this.maxTranslateY = -this.imageH + NAV_HEIGHT
    this.$refs.songListRef.$el.style.top = this.imageH + 'px'
  },
  methods: {
    ...mapActions('song', [
      'SELECT_SONG_PLAY',
      'RANDOM_SONG_PLAY'
    ]),
    /**
     * 处理播放器最小化后列表的高度滚动问题
     * @param {*} list
     */
    handlePlayListHeight(list) {
      const bottom = list.length > 0 ? '60px' : 0
      this.$refs.songListRef.$el.style.bottom = bottom
      this.$refs.songListRef.refresh()
    },
    /**
     * 监听列表滚动
     * @param pos 位置信息
     */
    onScroll(pos) {
      this.scrollY = pos.y
    },
    /**
     * 处理选中某个歌曲事件
     * @param item 歌曲对象
     * @param index 歌曲索引
     */
    handleSelectSong(item, index) {
      this.SELECT_SONG_PLAY({ list: this.songList, index })
    },
    /**
     * 处理随机播放
     */
    handleRandomPlay() {
      this.RANDOM_SONG_PLAY({ list: this.songList })
    }

  }
}
</script>

<style lang='scss' scoped>
  .singer-detail-wrap{
    position:relative;
    height:100vh;
    overflow: hidden;
    .bg-avatar{
      width:100%;
      height:0;
      padding-top:70%;
      position: relative;
      transform-origin: top;
      background-size: cover;
      .play-box{
        position:absolute;
        width:136px;
        bottom:20px;
        z-index:1;
        border-radius:30px;
        border:1px solid;
        padding:$xs;
        left:0;
        right:0;
        margin:0 auto;
        text-align: center;
        font-size:$font_small;
        color:var(--font-color-active);
        border:1px solid var(--font-color-active);
        .iconfont{
          margin-right:$xs;
        }
      }
      .filter{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background: rgba(7, 17, 27, 0.4)
      }
    }
    .scroll-list{
      position: absolute;
      top:0;
      left:0;
      width:100%;
      bottom:0;
    }
    .bg-layer{
      position:relative;
      height:100vh;
      background:var(--bg-color);
    }
    .loading-container{
      position:fixed;
      left:0;
      width:100%;
      top:60%;
      transform:translateY(-50%);
    }
  }
</style>
