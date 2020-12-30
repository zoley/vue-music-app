<template>
  <div class="recommend-wrap">
    <scroll ref="recommendScroll" :scroll-data="discList" class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-box">
          <slider>
            <div v-for="(item,index) in recommends" :key="index" class="slider-item">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt @load="loadImage">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h3 class="h3">
            热歌推荐
          </h3>
          <ul class="ul">
            <li v-for="(item,index) in discList" :key="index" v-fb="{cls:'tap-active'}" class="li z-flex" @click="viewDetail(item)">
              <div class="media-img">
                <img v-lazy="item.cover_url_small">
              </div>
              <div class="media-content">
                <h3>{{ item.creator_info.nick }}</h3>
                <p>{{ item.title }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div v-show="discList.length<1" class="loading-container">
      <loading />
    </div>
  </div>
</template>

<script>
import { getBanner, getSheetList } from '@/api/recommend'
import { playListMixin } from '@/utils/mixin'
import { mapMutations } from 'vuex'
export default {
  mixins: [playListMixin],
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  computed: {},
  created() {
    // 轮播图
    this._getRecommend()
    // 歌单列表
    this._getSheetList()
  },
  methods: {
    ...mapMutations({
      setCurrentDisc: 'disc/SET_CURRENT_DISC'
    }),
    /**
     * 处理播放器最小化后列表的高度滚动问题
     * @param {*} list
     */
    handlePlayListHeight(list) {
      const className = list.length > 0 ? 'recommend-content playing' : 'recommend-content'
      this.$refs.recommendScroll.$el.className = className
      this.$refs.recommendScroll.refresh()
    },
    // 请求轮播图片并初始化this.recommends
    _getRecommend() {
      getBanner().then(res => {
        this.recommends = res.data.slider
      })
    },
    // 请求推荐歌单并初始化this.discList
    _getSheetList() {
      // 1-国语 3-英语 9-寂寞 74-伤感 71-情歌 49-轻音乐 59-经典 3056-网络歌曲
      getSheetList(1).then(res => {
        const tempList = res.playlist.data.v_playlist
        getSheetList(74).then(res => {
          this.discList = res.playlist.data.v_playlist.concat(tempList)
        })
      })
    },
    /*
     * 判断图片是加载，从而刷新scroll--图片高度一致，仅需调用一次
     */
    loadImage() {
      if (!this.imgChecked) {
        this.imgChecked = true
        this.$refs.recommendScroll.refresh()
      }
    },
    /**
     * 跳转详情
     * @param item 数据对象
     */
    viewDetail(item) {
      this.setCurrentDisc(item)
      this.$router.push({ path: '/recommend/detail/' + item.tid })
    }
  }
}
</script>

<style lang='scss' scoped>
.recommend-wrap {
  .recommend-content {
    height: calc(100vh - 84px);
    overflow: hidden;
    &.playing{
      height: calc(100vh - 84px - 60px);
    }
    .recommend-list {
      > .h3 {
        text-align: center;
        margin: $sm 0;
        color:var(--font-color-active);
      }
      .li {
        padding: $xs $sm;
        .media-img {
          width: 70px;
          height: 70px;
          border-radius: $radius;
          overflow: hidden;
          margin-right: $sm;
          background:var(--bg-color-third);
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
        .media-content {
          flex: 1;
          h3 {
            margin-bottom: $xs;
            color:var(--font-color-sec);
          }
          p {
            line-height: 20px;
          }
        }
      }
    }
  }
  .loading-container {
    position: fixed;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}
</style>
