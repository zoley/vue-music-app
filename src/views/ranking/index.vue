<template>
  <div class="ranking-wrap">
    <scroll
      ref="rankingScroll"
      class="ranking-content"
      :scroll-data="rankingList"
    >
      <ul style="overflow:auto;">
        <li
          v-for="(item,index) in rankingList"
          :key="item.topId +'-' +index"
          v-fb="{cls:'tap-active-spec'}"
          class="li z-flex"
          @click="viewDetail(item)"
        >
          <img v-lazy="item.frontPicUrl" class="li-img">
          <div class="li-right">
            <p v-for="(x,y) in item.song" :key="x.songId +'-' + y" class="song-name">
              {{ y+1 }}、{{ x.title }}-{{ x.singerName }}
            </p>
          </div>
        </li>
      </ul>
    </scroll>
    <div v-show="rankingList.length<1" class="loading-container">
      <loading />
    </div>
  </div>
</template>

<script>
import { getRankingList } from '@/api/ranking'
import { mapMutations } from 'vuex'
import { playListMixin } from '@/utils/mixin'
export default {
  mixins: [playListMixin],
  data() {
    return {
      rankingList: []
    }
  },
  created() {
    this._getRankingList()
  },
  methods: {
    ...mapMutations({
      setCurrentRanking: 'ranking/SET_CURRENT_RANKING'
    }),
    /**
     * 处理播放器最小化后列表的高度滚动问题
     * @param {*} list
     */
    handlePlayListHeight(list) {
      const className = list.length > 0 ? 'ranking-content playing' : 'ranking-content'
      this.$refs.rankingScroll.$el.className = className
      this.$refs.rankingScroll.refresh()
    },
    /**
     * 请求榜单数据啊
     */
    _getRankingList() {
      getRankingList().then(res => {
        const group = res.req_1.data.group
        this.rankingList = group.reduce((prev, cur) => {
          prev = prev.concat(cur.toplist)
          return prev
        }, []).filter(x => x.topId !== 201)
      })
    },
    /**
     * 跳转详情
     */
    viewDetail(item) {
      this.setCurrentRanking(item)
      this.$router.push({ path: '/ranking/detail/' + item.topId, query: {
        period: item.period,
        totalNum: item.totalNum
      }})
    }
  }
}
</script>

<style scoped lang="scss">
.ranking-wrap {
  .ranking-content {
    height: calc(100vh - 84px);
    overflow: hidden;
    position: relative;
    &.playing{
      height: calc(100vh - 84px - 60px);
    }
    .li{
      background: var(--bg-color-sec);
      margin: $xs $sm;
      .li-img{
        width:100px;
        height:100px;
        object-fit: cover;
        margin-right:$xs;
      }
      .li-right{
        max-width:calc(100vw - 100px - #{$xs + $sm + $sm});
        .song-name{
          width:100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding:$xxs 0;
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
  .tap-active-spec{
    background: var(--bg-color-third) !important;
  }
}
</style>
