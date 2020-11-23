<template>
  <div v-show="playList.length>0" class="player-wrap">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-show="fullScreen" class="normal-player">
        <div class="background">
          <img class="img" :src="currentSong.image" alt="">
        </div>
        <div class="top">
          <div v-fb class="down" @click="toogleFullScreen">
            <i class="iconfont i-down" />
          </div>
          <h2 class="h2">
            {{ currentSong.name }}
          </h2>
          <h3 class="h3">
            {{ currentSong.singer }}
          </h3>
        </div>
        <div class="middle">
          <div class="middle-left">
            <div class="cd-wrap">
              <div ref="cdRef" class="cd">
                <img class="img" :class="playing?'play':'play pause'" :src="currentSong.image" alt="">
              </div>
            </div>
            <div class="lyric">
              我这里是歌词啊
            </div>
          </div>
          <scroll ref="lyricScrollRef" class="middle-right" :scroll-data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric" class="lyric-box">
                <p
                  v-for="(line,index) in currentLyric.lines"
                  :key="index"
                  ref="lyricLineRef"
                  class="lyric-text"
                  :class="{'active':currentLineNum===index}"
                >
                  {{ line.txt }}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':playPageShow==='cd'}" />
            <span class="dot" :class="{'active':playPageShow==='lyric'}" />
          </div>
          <div class="progress-wrap">
            <span class="time time-l">{{ currentTime | filterTime(this) }}</span>
            <div class="progress-bar-warp">
              <progress-bar :percent="percent" @changePercent="onPercentChange" @changingPercent="onPercentChanging" />
            </div>
            <span class="time time-r">{{ currentSong.duration | filterTime(this) }}</span>
          </div>
          <div class="operators">
            <div class="operate-item" @click="changeMode">
              <i :class="iconMode" />
            </div>
            <div class="operate-item tab" :class="isDisabled" @click="prevSong">
              <i class="iconfont i-shangyiqu" />
            </div>
            <div class="operate-item center" :class="isDisabled" @click="togglePlay">
              <i :class="iconPlay" />
            </div>
            <div class="operate-item tab" :class="isDisabled" @click="nextSong">
              <i class="iconfont i-xiayiqu" />
            </div>
            <div class="operate-item" @click="toggleFavorite">
              <i :class="iconFavorite" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div v-show="!fullScreen" class="mini-player">
        <div class="cd-box" @click="toogleFullScreen">
          <div class="cd">
            <img class="img" :class="playing?'play':'play pause'" :src="currentSong.image" alt="">
          </div>
          <div class="name-singer">
            <h3 class="h3">
              {{ currentSong.name }}
            </h3>
            <h4 class="h4">
              {{ currentSong.singer }}
            </h4>
          </div>
        </div>
        <div class="operate">
          <circle-progress
            :width="32"
            bar-color="var(--font-color-active)"
            background-color="transparent"
            :progress="percent*100"
          >
            <i :class="iconPlay" @click.stop="togglePlay" />
          </circle-progress>
          <i class="iconfont i-gedan" />
        </div>
      </div>
    </transition>
    <audio ref="audioRef" :src="currentSong.url" @canplay="audioReady" @ended="audioEnd" @timeupdate="audioUpdateTime" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getLyricById } from '@/api/song'
import Lyric from 'lyric-parser'
const Animation = require('create-keyframe-animation')
import Utils from '@/utils'
export default {
  name: 'Player',
  filters: {
    // 过滤转换时间格式
    filterTime(val, that) {
      val = val | 0
      const min = val / 60 | 0
      // const sec = val % 60 > 9 ? val % 60 : '0' + val % 60
      const sec = that.suppleNum(val % 60, 2)
      return min + ':' + sec
    }
  },
  data() {
    return {
      // 是否可以播放
      readyPlay: false,
      // 当前播放时间
      currentTime: 0,
      // 当前歌词-对象
      currentLyric: null,
      // 当前歌词播放所在行
      currentLineNum: 0
    }
  },
  computed: {
    ...mapState('song', [
      'playing',
      'playList',
      'sequenceList',
      'fullScreen',
      'mode',
      'currentIndex'
    ]),
    ...mapGetters('song', ['currentSong']),
    // 播放模式
    iconMode() {
      // 播放模式 sequence: 0, loop: 1, random: 2
      return this.mode === 0 ? 'iconfont i-liebiaoxunhuan' : this.mode === 1 ? 'iconfont i-danquxunhuan' : 'iconfont i-suiji'
    },
    // 是否播放
    iconPlay() {
      return this.playing ? 'control iconfont i-pause' : 'control iconfont i-bofang'
    },
    // 是否喜欢
    iconFavorite() {
      return this.playing ? 'iconfont i-xin1' : 'iconfont i-xin2'
    },
    // 是否禁用置灰
    isDisabled() {
      return this.readyPlay ? '' : 'disabled'
    },
    // 音乐dom
    audioRef() {
      return this.$refs.audioRef
    },
    // 歌曲播放进度
    percent() {
      return this.currentTime / this.currentSong.duration
    }
  },
  watch: {
    // 播放状态监听
    playing(newVal) {
      if (!this.readyPlay) return
      this.$nextTick(() => {
        newVal ? this.audioRef.play() : this.audioRef.pause()
      })
    },
    // 当前歌曲监听
    currentSong: {
      handler(newVal, oldVal) {
        if (Object.is(newVal.id, oldVal.id)) return
        this.$nextTick(() => {
          this.$refs.audioRef.play()
        })
        this.getLyric()
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapMutations('song', [
      'SET_FULL_SCREEN',
      'SET_PLAYING_STATE',
      'SET_MODE',
      'SET_CURRENT_INDEX',
      'SET_PLAY_LIST'
    ]),
    /**
     * 给数字前面补零
     * @param val 数值
     * @param num 需要的位数
     */
    suppleNum(val, num) {
      let len = val.toString().length
      while (len < num) {
        val = '0' + val
        len++
      }
      return val
    },
    /**
     * 获取歌词
     */
    getLyric() {
      getLyricById(this.currentSong.id).then((res) => {
        const tempLyric = function(lrc) {
          var t = document.createElement('div')
          t.innerHTML = lrc + ''
          return t.innerHTML
        }
        this.currentLyric = new Lyric(tempLyric(res.lyric), this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    /**
     * 设置歌词回调方法
     * @param lineNum 行数
     * @param txt 文字
     */
    handleLyric({ lineNum, txt }) {
      if (!this.$refs.lyricLineRef) return
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        this.$refs.lyricScrollRef.scrollToElement(this.$refs.lyricLineRef[lineNum - 5], 1000)
      } else {
        this.$refs.lyricScrollRef.scrollTo(0, 0, 1000)
      }
    },
    /**
     * 切换全屏显示状态
     */
    toogleFullScreen() {
      this.SET_FULL_SCREEN(!this.fullScreen)
    },
    /**
     * 改变播放模式 播放模式 sequence: 0, loop: 1, random: 2
     */
    changeMode() {
      const a = (this.mode + 1) % 3
      this.SET_MODE(a)
      let list = []
      if (a === 2) {
        list = Utils.shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      const index = list.findIndex(x => Object.is(x.id, this.currentSong.id))
      this.SET_CURRENT_INDEX(index)
      this.SET_PLAY_LIST(list)
    },
    /**
     * 上一首
     */
    prevSong() {
      if (!this.readyPlay) return
      let index = this.currentIndex - 1
      if (index < 0) {
        index = this.playList.length - 1
      }
      this.SET_CURRENT_INDEX(index)
      if (!this.playing) {
        this.togglePlay()
      }
      this.readyPlay = false
    },
    /**
     * 下一首
     */
    nextSong() {
      if (!this.readyPlay) return
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.SET_CURRENT_INDEX(index)

      if (!this.playing) {
        this.togglePlay()
      }
      this.readyPlay = false
    },
    /**
     * 切换播放/暂停
     */
    togglePlay() {
      if (!this.readyPlay) return
      this.SET_PLAYING_STATE(!this.playing)
    },
    /**
     * 切换喜欢
     */
    toggleFavorite() {
    },
    /**
     * 获取cd动画目标的相对位置、缩放大小
     */
    _getTargetPosScale() {
      const wrapWidth = Math.min(window.innerWidth, 1024)
      const elWidth = wrapWidth * 0.8
      const elTop = 100
      const targetWidth = 40
      const targetLeft = 20
      const targetBottom = 10
      const scale = targetWidth / elWidth
      const x = -(wrapWidth / 2 - (targetWidth / 2 + targetLeft))
      const y = window.innerHeight - elTop - (elWidth / 2) - (targetWidth / 2) - targetBottom
      return { x, y, scale }
    },
    /**
     * transition 动画控制 进入
     * @param el 目标dom
     * @param done 进入之后执行方法
     */
    enter(el, done) {
      const { x, y, scale } = this._getTargetPosScale()
      const animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      Animation.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      Animation.runAnimation(this.$refs.cdRef, 'move', done)
    },
    /**
     * transition 动画控制 进入之后
     */
    afterEnter() {
      Animation.unregisterAnimation('move')
      this.$refs.cdRef.style.animation = ''
    },
    /**
     * transition 动画控制 离开
     * @param el 目标dom
     * @param done 离开之后执行方法
     */
    leave(el, done) {
      this.$refs.cdRef.style.transition = 'all 0.4s'
      const { x, y, scale } = this._getTargetPosScale()
      this.$refs.cdRef.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdRef.addEventListener('transitionend', done)
    },
    /**
     * transition 动画控制 离开之后
     */
    afterLeave() {
      this.$refs.cdRef.style.transition = ''
      this.$refs.cdRef.style.transform = ''
    },
    /**
     * 歌曲准备就绪
     */
    audioReady() {
      this.readyPlay = true
    },
    /**
     * 歌曲结束
     */
    audioEnd() {
      this.currentTime = 0
      // 播放模式 sequence: 0, loop: 1, random: 2
      if (this.mode === 1) {
        this.singleLoop()
      } else {
        this.nextSong()
      }
    },
    /**
     * 单曲循环
     */
    singleLoop() {
      this.$refs.audioRef.currentTime = 0
      this.$refs.audioRef.play()
      this.SET_PLAYING_STATE(true)
    },
    /**
     * 歌曲时间更新
     * @param e 事件
     */
    audioUpdateTime(e) {
      this.currentTime = e.target.currentTime
    },
    /**
     * 播放进度改变
     * @param percent 进度
     */
    onPercentChange(percent) {
      const time = percent * this.currentSong.duration
      this.currentTime = this.$refs.audioRef.currentTime = time
      if (!this.playing) {
        this.togglePlay()
      }
    },
    /**
     * 播放进度改变中
     * @param percent 进度
     */
    onPercentChanging(percent) {
      this.currentTime = percent * this.currentSong.duration
    }
  }
}
</script>

<style lang='scss' scoped>
  .player-wrap{
    .normal-player{
      position:fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      z-index:11;
      max-width:1024px;
      margin:0 auto;
      background:var(--bg-color);
      &.normal-enter-active,&.normal-leave-active{
        transition: all .4s ease;
        .top,.bottom{
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        }
      }
      &.normal-enter,&.normal-leave-to{
        opacity:0;
        .top{
          transform: translate3d(0, -100px, 0)
        }
        .bottom{
          transform: translate3d(0, 100px, 0)
        }
      }
      .background{
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index:-1;
        opacity:0.6;
        filter:blur(20px);
        .img{
          width:100%;
          height:100%;
          object-fit: cover;
        }
      }
      .top{
        position:relative;
        color:var(--font-color-sec);
        font-size:$font_medium;
        .down{
          position:absolute;
          top:0;
          left:0;
          padding:$xs $sm;
          color:var(--font-color-active);
          .iconfont{
            font-size:$font_vast;
          }
        }
        .h2{
          text-align: center;
          height:44px;
          line-height: 44px;
          margin-bottom:$xxs;
          padding:0 56px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size:$font_huge;
        }
        .h3{
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size:$font_medium;
        }
      }
      .middle{
        position:absolute;
        top:100px;
        bottom:170px;
        left:0;
        right:0;
        display:flex;
        flex-wrap:nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        .middle-left,.middle-right{
          flex:0 0 100%;
          overflow: hidden;
          height:100%;
        }
        .cd-wrap{
          width:100%;
          height:0;
          position:relative;
          padding-top:80%;
          .cd{
            position:absolute;
            left:10%;
            top:0;
            width:80%;
            height:100%;
            border-radius:50%;
            .img{
              width:100%;
              height:100%;
              object-fit: cover;
              border-radius:50%;
              border:10px solid hsla(0,0%,100%,.1);
              box-sizing: border-box;
              &.play{
                animation: rotate 20s infinite linear;
              }
              &.pause{
                animation-play-state: paused;
              }
            }
          }
        }
        .lyric{
          text-align: center;
          line-height: 44px;
          margin-top:$xl;
          color:var(--font-color-third);
          font-size:$font_medium;
        }
        .middle-right .lyric-text{
          color:var(--font-color-third);
          font-size:$font_small;
          text-align: center;
          line-height: $xl;
          &.active{
            color:var(--font-color-active);
          }
        }
      }
      .bottom{
        position:absolute;
        width:100%;
        bottom:50px;
        left:0;
        .progress-wrap{
          display:flex;
          justify-content: space-between;
          align-items: center;
          width:80%;
          margin:0 auto $xs;
          .progress-bar-warp{
            flex:1;
            text-align: center;
          }
          .time{
            color:var(--font-color-sec);
          }
        }
        .operators{
          display:flex;
          flex-direction: row;
          align-items: center;
          width:90%;
          margin:0 auto;
          .operate-item{
            flex:1;
            text-align: center;
            color:var(--font-color-active);
            .iconfont{
              font-size:$xl;
            }
            &.center{
              .iconfont{
                font-size:$xxl;
              }
            }
            &.tab{
              .iconfont{
                font-size:34px;
              }
            }
            &.disabled{
              .iconfont{
                color:var(--font-color);
              }
            }
          }
        }
      }
    }
    .mini-player{
      position:fixed;
      bottom:0;
      height:60px;
      left:0;
      right:0;
      z-index:11;
      max-width:1024px;
      margin:0 auto;
      display:flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      background:var(--bg-color-sec);
      &.mini-enter-active,&.mini-leave-active{
        transition: all .4s ease;
      }
      &.mini-enter,&.mini-leave-to{
        opacity:0;
      }
      .cd-box{
        flex:1;
        height:100%;
        display:flex;
        justify-content: flex-start;
        align-items: center;
        .cd{
          width:40px;
          height:40px;
          border-radius:50%;
          margin:0 $xs 0 $sm;
          overflow: hidden;
          .img{
            width:100%;
            height:100%;
            border-radius:50%;
            &.play{
              animation: rotate 10s infinite linear;
            }
            &.pause{
              animation-play-state: paused;
          }
          }
        }
        .name-singer{
          color:var(--font-color-sec);
          .h4{
            margin-top:$xxs;
            color:var(--font-color);
          }
        }
      }
      .operate{
        display:flex;
        align-items: center;
        width:90px;
        .iconfont{
          font-size:36px;
          opacity:0.7;
          padding-right:$xs;
          color:var(--font-color-active);
          &.control{
            position:absolute;
            top:-1px;
            left:-2px;
            padding:0;
          }
        }
      }
    }
  }
  @keyframes rotate {
    0% {transform:rotate(0)}
    100% {transform:rotate(360deg)}
  }
  @-webkit-keyframes rotate {
    0% {transform:rotate(0)}
    100% {transform:rotate(360deg)}
  }
</style>
