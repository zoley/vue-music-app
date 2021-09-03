<template>
  <div class="search-wrap">
    <search-box @sendSearch="doSearch" />
    <div class="history">
      <h3 class="history-name z-flex">
        <span>搜索历史</span>
        <i class="iconfont i-shanchu" />
      </h3>
      <ul>
        <li v-for="(item,index) in historyList" :key="index">
          <span>{{ item }}</span>
          <i class="iconfont i-close" />
        </li>
      </ul>
    </div>
    <div v-show="keywords" class="search-content">
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
      historyList: ['周杰伦', '我在那一角落患过伤风']
    }
  },
  mounted() {},
  methods: {
    /**
     * 搜索
     */
    doSearch(val) {
      this.keywords = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-wrap{
    .search-content{
      height: calc(100vh - 84px - 60px);
      overflow: hidden;
    }
  }
</style>
