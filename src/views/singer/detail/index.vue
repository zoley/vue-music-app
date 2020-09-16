<template>
  <div class="frame-wrap singer-detail-wrap">
    <custom-nav :title="currentSinger.name" :bar-type="2"/>
    <div class="bg-avatar" :style="bgStyle"></div>
    <scroll>
      <song-list :list-data="songList"></song-list>
    </scroll>
  </div>
</template>

<script>
import { getSingerDetailById } from '@/api/singer'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 歌手mid
      mid: this.$route.params.mid,
      // 歌曲列表
      songList: []
    }
  },
  created() {
    // 获取歌手详情页
    this.getDetailData()
  },
  mounted() {
  },
  computed: {
    ...mapState({
      currentSinger: state => state.singer.currentSinger
    }),
    // 歌手头像背景
    bgStyle() {
      return `background-image:url(${this.currentSinger.avatar});`
    }
  },
  methods: {
    /**
     * 获取歌手详情页
     */
    getDetailData() {
      getSingerDetailById(this.mid).then((res) => {
        if (res.code === 0) {
          this.songList = res.data.list
        }
      })
    }

  }
}
</script>

<style lang='scss' scoped>
  .singer-detail-wrap{
    .bg-avatar{
      width:100%;
      height:0;
      padding-top:70%;
      background-size: cover;
    }
  }
</style>
