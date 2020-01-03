<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      dataTheme: state => state.user.dataTheme
    })
  },
  mounted () {
    document.documentElement.setAttribute('data-theme', this.dataTheme);
  }
}
</script>
<style scoped lang="scss">

</style>
