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
      this.setRootColorCss(this.themes[index].code)
      this.CHANGE_THEME_ACT(this.themes[index].code)
    },
    setRootColorCss(code) {
      let bgColor = '#212121'// 背景主题颜色
      let bgColorSec = '#333'// 背景次要主题颜色
      let bgColorThird = 'rgba(255,255,255,0.1)'// 背景次次要主题颜色
      let borderColor = '#343434'// 边框主题颜色
      let fontColor = '#999'// 字体主题颜色默认
      let fontColorSec = '#fff'// 字体次要主题颜色
      let fontColorThird = 'rgba(255, 255, 255, 0.7)'// 字体次要主题颜色
      let fontColorActive = '#fdcd08'// 字体高亮主题颜色
      switch (code) {
        case 'theme1':
          bgColor = '#212121'
          bgColorSec = '#333'
          bgColorThird = 'rgba(255,255,255,0.1)'
          borderColor = '#343434'
          fontColor = '#999'
          fontColorSec = '#fff'
          fontColorThird = 'rgba(255, 255, 255, 0.7)'
          fontColorActive = '#fdcd08'
          break
        case 'theme2':
          bgColor = '#fff'
          bgColorSec = '#f2f2f2'
          bgColorThird = 'rgba(0,0,0,0.1)'
          borderColor = '#eee'
          fontColor = '#666'
          fontColorSec = '#333'
          fontColorThird = 'rgba(51,51,51, 0.7)'
          fontColorActive = '#409EFF'
          break
      }
      document.documentElement.style.setProperty('--bg-color', bgColor)
      document.documentElement.style.setProperty('--bg-color-sec', bgColorSec)
      document.documentElement.style.setProperty('--bg-color-third', bgColorThird)
      document.documentElement.style.setProperty('--border-color', borderColor)
      document.documentElement.style.setProperty('--font-color', fontColor)
      document.documentElement.style.setProperty('--font-color-sec', fontColorSec)
      document.documentElement.style.setProperty('--font-color-third', fontColorThird)
      document.documentElement.style.setProperty('--font-color-active', fontColorActive)
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
      border:1px solid var(--border-color);
      .text{
        b{
          width:20px;
          height:16px;
          border-radius:4px;
          border:1px solid;
          margin-left:$xs;
          display:inline-block;
          vertical-align: text-bottom;
          border:1px solid var(--font-color-active);
        }
      }
      .iconfont{
        color:var(--font-color-active);
      }
    }
  }
</style>
