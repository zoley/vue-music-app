<template>
  <div class="search-wrap">
    <search-box @goToSearch="doSearch" @getSearchKey="getSearchKey" />
    <div v-if="!keywords" class="history">
      <h3 class="history-name z-flex">
        <span>搜索历史</span>
        <i class="iconfont i-shanchu" @click="batchDelete" />
      </h3>
      <ul class="ul">
        <li v-for="(item,index) in historyList" :key="index" class="li z-flex">
          <span>{{ item }}</span>
          <i class="iconfont i-close" @click="singleDelete(index)" />
        </li>
      </ul>
    </div>
    <div v-else class="search-content">
      内容
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      historyList: ['周杰伦', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风', '我在那一角落患过伤风']
    }
  },
  mounted() {},
  methods: {
    /**
     * 搜索
     */
    doSearch(val) {
      console.log(val)
    },
    getSearchKey(val) {
      this.keywords = val
    },
    singleDelete(i) {
      this.historyList.splice(i, 1)
    },
    batchDelete() {
      if (this.historyList.length > 0) {
        if (confirm('确认清空全部搜索历史吗？')) {
          this.historyList = []
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-wrap{
    .history{
      .history-name{
        padding:$xs $sm;
        justify-content: space-between;
        font-size:$font_medium;
        color:var(--font-color-sec);
      }
      .ul{
        padding:0 $sm;
        max-height: calc(100vh - 84px - 95px);
        overflow: auto;
        box-sizing: border-box;
        .li{
          line-height:32px;
          justify-content: space-between;
          .iconfont{
            font-size:$font_mini;
            padding-left:$xs;
          }
        }
      }
    }
    .search-content{
      height: calc(100vh - 84px - 60px);
      overflow: hidden;
    }
  }
</style>
