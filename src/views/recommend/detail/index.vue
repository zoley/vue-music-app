<template>
  <music-list :title="currentDisc.title" :background-url="currentDisc.cover_url_medium" :song-list="songList" />
</template>

<script>
import { getDiscContentList } from '@/api/recommend'
import { mapState } from 'vuex'
import Utils from '@/utils/index'
export default {
  data() {
    return {
      // 歌手mid
      discId: this.$route.params.discId,
      // 歌曲列表
      songList: []
    }
  },
  computed: {
    ...mapState({
      currentDisc: state => state.disc.currentDisc
    })
  },
  created() {
    // 获取推荐歌单详情页
    this.getDetailData()
  },
  methods: {
    /**
     * 获取推荐歌单详情页
     */
    getDetailData() {
      getDiscContentList(this.discId).then((res) => {
        if (res.code === 0) {
          const list = res.cdlist[0].songlist
          // ☆☆☆☆☆☆☆小难点☆☆☆☆☆☆☆☆
          Utils.handleSongUrl(list.filter(y => this.isValidMusic(y)).map(x => Utils.createNewSong(x))).then(songs => {
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
      return musicData.id && musicData.album.mid && (!musicData.pay || musicData.pay.pay_play === 0)
    }
  }
}
</script>

<style>

</style>
