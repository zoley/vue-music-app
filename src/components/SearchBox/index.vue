<template>
  <div class="search-box z-flex">
    <div class="input-box">
      <input v-model="searchKey" type="search" class="input" placeholder="请输入歌手、歌曲名" @keyup.enter="doSearch">
      <i v-if="searchKey" class="iconfont i-close gray-color" @click="clearKey" />
    </div>
    <button v-ripple="{color:'var(--font-color-active)'}" class="btn" @click="doSearch">
      搜索
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchKey: ''
    }
  },
  created() {
    this.$watch('searchKey', val => {
      this.$emit('getSearchKey', val)
    })
  },
  methods: {
    /**
     * 清除搜索词
     */
    clearKey() {
      this.searchKey = ''
    },
    /**
     * 搜索
     */
    doSearch() {
      this.$emit('goToSearch', this.searchKey)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-box{
    padding:$xs 0;
    width:100%;
    box-sizing: border-box;
    justify-content: space-between;
    .input-box{
      position:relative;
      flex:1;
      padding-left:$sm;
      .input{
        border-radius:32px;
        background: var(--bg-color-sec);
        border:1px solid var(--bg-color-sec);
        padding:$xxs $sm;
        height:32px;
        width:100%;
        color:var(--font-color-sec);
        box-sizing: border-box;
        &:focus{
          border-color: var(--font-color-active);
        }
      }
      .iconfont{
        font-size:$font_small;
        position:absolute;
        right:$sm;
        top:$xs;
      }
    }
    .btn{
      width:60px;
      line-height: 32px;
      height:32px;
      text-align: center;
      color:var(--font-color-active);
      font-size:$font_small;
      border:none;
      background:transparent;
    }
  }
</style>
