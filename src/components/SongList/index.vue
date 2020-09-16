<template>
  <div class="song-list-wrap">
    <ul>
      <li class="li" v-for="(item,index) in listData" :key="index">
        <h2 class="name">{{item.Fupload_time}}</h2>
        <p class="desc"></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongList',
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
  created() {
  },
  mounted() {
  },
  components: {
  },
  computed: {},
  methods: {

  }
}
</script>

<style lang='scss' scoped>
</style>
