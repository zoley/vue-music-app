<template>
  <div class="theme">
    <custom-nav :title="title" :left-fn="leftBackFn" />
    <ul>
      <li v-for="(v,k) in themes" :key="k" class="cell-li z-flex" @click="changeTheme(k)">
        <span class="text">{{ v.name }} <b :style="'background:'+v.color" /></span>
        <span v-if="v.checked" class="iconfont i-duihao" />
      </li>
    </ul>
  </div>
</template>

<script>
import CustomNav from '@/components/CustomNav'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Theme',
  components: {
    CustomNav
  },
  data() {
    return {
      title: '设置主题'
    }
  },
  computed: {
    ...mapState({
      themes: state => state.user.themes
    })
  },
  methods: {
    ...mapActions('user', [
      'CHANGE_THEME_ACT'
    ]),
    /**
     * 改变主题颜色
     */
    changeTheme(index) {
      this.themes.forEach(val => {
        val.checked = false
      })
      this.themes[index].checked = true
      this.CHANGE_THEME_ACT(this.themes[index].code)
    },
    /**
     * 返回上一层、巴特不是路由跳转
     */
    leftBackFn() {
      this.$emit('closeThemeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
  .theme{
    .cell-li{
      height:40px;
      box-sizing: border-box;
      justify-content: space-between;
      padding:0 $xs;
      border-bottom: 1px solid;
      @include border_color($border-color-theme);
      .text{
        b{
          width:20px;
          height:16px;
          border-radius:4px;
          border:1px solid;
          margin-left:$xs;
          display:inline-block;
          vertical-align: text-bottom;
          @include border_active_color($font-color-theme-active);
        }
      }
      .iconfont{
        @include font_active_color($font-color-theme-active);
      }
    }
  }
</style>
