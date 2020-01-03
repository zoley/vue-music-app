<template>
  <div class="theme">
    <ul>
      <li class="z-flex" v-for="(v,k) in themes" :key="k" @click="changeTheme(k)">
        <span class="text">{{v.name}}</span>
        <span v-if="v.checked" class="iconfont i-duihao"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      themes: [{
        name: '玄潭黑',
        code: 'theme',
        checked: true
      }, {
        name: '霜荼白',
        code: 'theme1',
        checked: false
      }]
    }
  },
  methods: {
    ...mapActions('user', [
      'CHANGE_THEME_ACT'
    ]),
    /**
     * 改变主题颜色
     */
    changeTheme (index) {
      this.themes.forEach(val => {
        val.checked = false;
      })
      this.themes[index].checked = true;
      this.CHANGE_THEME_ACT(this.themes[index].code);
    }
  }
}
</script>

<style>

</style>