<template>
  <div class="player-wrap">
    <div v-show="fullScreen" class="normal-player">
      <div class="background">
        <img class="img" :src="currentSong.image" alt="">
      </div>
      <div class="top">
        <div v-fb class="down" @click="closeFullScreen">
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
            <div class="cd">
              <img class="img" :src="currentSong.image" alt="">
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
    <div v-show="!fullScreen" class="mini-player">
      <div class="cd-box">
        <div class="cd">
          <img class="img" :src="currentSong.image" alt="">
        </div>
        <div>
          <h3 class="h3">
            {{ currentSong.name }}
          </h3>
          <h4 class="h4">
            {{ currentSong.singer }}
          </h4>
        </div>
      </div>
      <div>
        <i :class="iconPlay" />
        <i class="iconfont icon-gedan" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
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
     * 关闭全屏显示状态
     */
    closeFullScreen() {
      this.SET_FULL_SCREEN(false)
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
              border:10px solid hsla(0,0%,100%,.1);;
              box-sizing: border-box;
            }
          }
        }
        .lyric{
          text-align: center;
          line-height: 44px;
          margin-top:$xl;
          @include font_color($font-color-theme);
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
      @include bg_color($bg-color-theme-sec);
    }
  }
</style>
