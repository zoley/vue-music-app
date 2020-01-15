<template>
  <div class="recommend-wrap">
    <div class="slider-box">
      <slider>
        <div>123</div>
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
      recommends: []
    }
  },
  mounted () {
    this._getRecommend();
    this._getSheetList();
  },
  components: {
    slider
  },
  computed: {},
  methods: {
    // 请求轮播图片并初始化this.recommends
    _getRecommend () {
      getBanner().then((res) => {
        console.log(res);
        this.recommends = res.data.slider
      })
    },
    // 请求推荐歌单并初始化this.discList
    _getSheetList () {
      getSheetList().then((res) => {
        console.log(res);
        this.discList = res.data.list
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>