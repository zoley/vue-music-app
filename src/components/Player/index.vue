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
        </div>
        <div class="bottom">
          <div class="progress-wrap">
            1
          </div>
          <div class="operators">
            <div class="operate-item" @click="changeMode">
              <i :class="iconMode" />
            </div>
            <div class="operate-item tab" @click="prevSong">
              <i class="iconfont i-shangyiqu" />
            </div>
            <div class="operate-item center" @click="togglePlay">
              <i :class="iconPlay" />
            </div>
            <div class="operate-item tab" @click="nextSong">
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
          <i :class="iconPlay" />
          <i class="iconfont i-gedan" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
const Animation = require('create-keyframe-animation')
import Utils from '@/utils'
export default {
  name: 'Player',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('song', [
      'playing',
      'playList',
      'fullScreen',
      'mode',
      'currentIndex'
    ]),
    ...mapGetters('song', ['currentSong']),
    // 播放模式
    iconMode() {
      return this.mode ? 'iconfont i-suiji' : 'iconfont i-liebiaoxunhuan'
    },
    // 是否播放
    iconPlay() {
      return this.playing ? 'iconfont i-pause' : 'iconfont i-bofang'
    },
    // 是否喜欢
    iconFavorite() {
      return this.playing ? 'iconfont i-xin1' : 'iconfont i-xin2'
    }
  },
  watch: {
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
      'SET_FULL_SCREEN',
      'SET_CURRENT_INDEX'
    ]),
    /**
     * 切换全屏显示状态
     */
    toogleFullScreen() {
      this.SET_FULL_SCREEN(!this.fullScreen)
    },
    /**
     * 改变播放模式
     */
    changeMode() {
      const a = this.mode ? 0 : 1
      this.SET_MODE(a)
    },
    /**
     * 上一首
     */
    prevSong() {

    },
    /**
     * 下一首
     */
    nextSong() {

    },
    /**
     * 切换播放/暂停
     */
    togglePlay() {
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
      @include bg_color($bg-color-theme);
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
        @include font_sec_color($font-color-theme-sec);
        @include font_size($font-medium);
        .down{
          position:absolute;
          top:0;
          left:0;
          padding:$xs $sm;
          @include font_active_color($font-color-theme-active);
          .iconfont{
            @include font_size($font_vast);
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
          @include font_size($font_huge);
        }
        .h3{
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          @include font_size($font-medium);
        }
      }
      .middle{
        position:absolute;
        top:100px;
        bottom:170px;
        left:0;
        right:0;
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
          @include font_third_color($font-color-theme-third);
          @include font_size($font-medium);
        }
      }
      .bottom{
        position:absolute;
        width:100%;
        bottom:50px;
        left:0;
        .operators{
          display:flex;
          flex-direction: row;
          align-items: center;
          width:90%;
          margin:0 auto;
          .operate-item{
            flex:1;
            text-align: center;
            @include font_active_color($font-color-theme-active);
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
      @include bg_sec_color($bg-color-theme-sec);
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
          @include font_sec_color($font-color-theme-sec);
          .h4{
            margin-top:$xxs;
            @include font_color($font-color-theme);
          }
        }
      }
      .operate{
        .iconfont{
          font-size:36px;
          opacity:0.7;
          padding-right:$xs;
          @include font_active_color($font-color-theme-active);
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
