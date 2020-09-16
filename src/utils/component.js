import Vue from 'vue'

/**
 * 前端工程自动化-优化组件的引用
 * directory=@/components 扫描当前目录下的所有文件
 * useSubdirectories = false 不需要递归的扫描所有子文件夹
 * regExp =/\.vue$/ 所有以.vue结尾的文件
 */
const context = require.context('@/components', true, /index.vue$/)
// context.keys()返回所有匹配的文件路径
context.keys().forEach(key => {
  const component = context(key).default
  Vue.component(component.name, component)
})

/*
 * 滚动组件
 * import Scroll from '@/components/Scroll'
 * Vue.component('Scroll', Scroll)
 */
