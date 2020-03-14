<template>
  <div class="recommend-wrap">
    <div class="slider-box" v-if="recommends.length">
      <slider>
        <div v-for="(item,index) in recommends" :key="index" class="slider-item">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" alt="">
          </a>
        </div>
      </slider>
    </div>
  </div>
</template>

<script>

import { getBanner, getSheetList } from '@/api/recommend'
import slider from '@/components/slider'
export default {
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  mounted () {
    this._getRecommend()
    this._getSheetList()
  },
  components: {
    slider
  },
  computed: {},
  methods: {
    // 请求轮播图片并初始化this.recommends
    _getRecommend () {
      getBanner().then((res) => {
        this.recommends = res.data.slider
      })
    },
    // 请求推荐歌单并初始化this.discList
    _getSheetList () {
      getSheetList().then((res) => {
        this.discList = res.playlist.data.v_playlist
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
