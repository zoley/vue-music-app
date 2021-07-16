<template>
  <music-list :title="currentRanking.title" :background-url="currentRanking.topAlbumURL" :song-list="songList" />
</template>

<script>
import { getRankingSongList } from '@/api/ranking'
import { mapState } from 'vuex'
import Utils from '@/utils/index'
export default {

  provide() {
    return {
      ranking: true
    }
  },
  data() {
    return {
      // 歌曲列表
      songList: []
    }
  },
  computed: {
    ...mapState({
      currentRanking: state => state.ranking.currentRanking
    })
  },
  created() {
    // 获取排行歌单详情页
    this.getDetailData()
  },
  methods: {
    /**
     * 获取排行歌单详情页
     */
    getDetailData() {
      const topid = Number(this.$route.params.topId)
      getRankingSongList(topid).then((res) => {
        if (res.code === 0) {
          const list = res.songlist
          // ☆☆☆☆☆☆☆小难点☆☆☆☆☆☆☆☆
          Utils.handleSongUrl(list.filter(y => this.isValidMusic(y.data)).map(x => Utils.createNewSong(x.data))).then(songs => {
            this.songList = songs
          })
        }
      })
    },
    /**
     * 是否为免费音乐啊
     * @param musicData 音乐数据
     */
    isValidMusic(musicData) {
      return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payplay === 0)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
