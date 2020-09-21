<template>
  <div class="song-list-wrap">
    <ul>
      <li
        v-for="(item,index) in listData"
        :key="index"
        v-fb="{cls:'tap-active'}"
        class="li"
        @click="selectItem(item,index)"
      >
        <h3 class="name">
          {{ item.name }}
        </h3>
        <p class="desc">
          {{ item.singer }} - {{ item.album }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  components: {
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
      .name{
        margin-bottom: $xs;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @include font_sec_color($font-color-theme-sec);
      }
      .desc{
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
