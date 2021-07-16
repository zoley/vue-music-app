<template>
  <div class="song-list-wrap">
    <ul>
      <li
        v-for="(item,index) in listData"
        :key="index"
        v-fb="{cls:'tap-active'}"
        class="li z-flex"
        @click="selectItem(item,index)"
      >
        <div v-if="ranking" class="ranking">
          <i v-if="index<3" class="iconfont i-jiangbei" :class="'rank'+(index+1)" />
          <i v-else class="num">{{ index+1 }}</i>
        </div>
        <div class="li-content">
          <h3 class="name">
            {{ item.name }}
          </h3>
          <p class="desc">
            {{ item.singer }} - {{ item.album }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  components: {
  },
  // 接收父组件的注入函数---进度条相关
  inject: {
    ranking: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  props: {
    // 数据列表
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    /**
     * 选中歌曲
     * @param item 歌曲对象
     * @param index 索引
     */
    selectItem(item, index) {
      this.$emit('select-item', item, index)
    }
  }
}
</script>

<style lang='scss' scoped>
  .song-list-wrap{
    .li{
      padding:$xs $sm;
      .li-content{flex:1;}
      .name{
        margin-bottom: $xs;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color:var(--font-color-sec);
      }
      .desc{
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ranking{
        margin-right:$sm;
        width:$font_vast;
        text-align: center;
        .iconfont{
          font-size:$font_vast;
        }
        .rank1{
          color:$golden;
        }
        .rank2{
          color:$light-gray;
        }
        .rank3{
          color:$orange;
        }
        .num{
          font-size:$font_medium;
          color:var(--font-color-active);
        }
      }
    }
  }
</style>
