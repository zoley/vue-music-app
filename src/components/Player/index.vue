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
      </div>
      <div class="middle" />
      <div class="bottom" />
    </div>
    <div class="mini-player" />
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
      'currentIndex'
    ]),
    ...mapGetters('song', ['currentSong'])
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapMutations('song', [
      'SET_FULL_SCREEN'
    ]),
    /**
     * 关闭全屏显示状态
     */
    closeFullScreen() {
      this.SET_FULL_SCREEN(false)
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
    }
  }
</style>
