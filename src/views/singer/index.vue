<template>
  <div>
    {{singerList}}
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
export default {
  data () {
    return {
      singerList: []
    }
  },
  created () {
    // 获取歌手列表
    this._getSingerList()
  },
  mounted () {
  },
  components: {
  },
  computed: {},
  methods: {
    /**
     * 请求歌手列表
     */
    _getSingerList () {
      getSingerList().then(res => {
        this.singerList = res.singerList.data.singerlist
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
