<template>
  <div class="recommend-wrap">
    <scroll :scroll-data="discList" class="recommend-content">
      <div>
        <div class="slider-box" v-if="recommends.length">
          <slider>
            <div v-for="(item,index) in recommends" :key="index" class="slider-item">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h3 class="h3">KTV热歌推荐</h3>
          <ul class="ul">
            <li class="li z-flex" v-for="(item,index) in discList" :key="index">
              <div class="media-img">
                <img v-lazy="item.cover_url_small">
              </div>
              <div class="media-content">
                <h3>{{item.creator_info.nick}}</h3>
                <p>{{item.title}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>

import { getBanner, getSheetList } from '@/api/recommend'
import slider from '@/components/slider'
import scroll from '@/components/scroll'
export default {
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  created () {
    // 轮播图
    this._getRecommend()
    // 歌单列表
    this._getSheetList()
  },
  components: {
    slider,
    scroll
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
  .recommend-wrap{
    .recommend-content{
      height:calc(100vh - 84px);
      overflow: hidden;
      .recommend-list{
        >.h3{
          text-align: center;
          margin:$sm 0;
          @include font_active_color($font-color-theme-active);
        }
        .li{
          padding:$xs $sm;
          .media-img{
            width:70px;
            height:70px;
            border-radius:$radius;
            overflow: hidden;
            background: #f2f2f2;
            margin-right:$sm;
            img{
              width:100%;
              height:100%;
              vertical-align: top;
            }
          }
          .media-content{
            flex:1;
            h3{
              margin-bottom:$xs;
              @include font_sec_color($font-color-theme-sec);
            }
            p{
              line-height: 20px;
            }
          }
        }
      }
    }

  }
</style>
