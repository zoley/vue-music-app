<template>
  <div class="song-list-wrap">
    <ul>
      <li
        v-for="(item,index) in listData"
        :key="index"
        v-fb="{cls:'tap-active'}"
        class="li"
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

  }
}
</script>

<style lang='scss' scoped>
  .song-list-wrap{
    .li{
      padding:$xs $sm;
      .name{
        margin-bottom: $xs;
        @include font_sec_color($font-color-theme-sec);
      }
      .desc{
        line-height: 20px;
      }
    }
  }
</style>
