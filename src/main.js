import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/font/iconfont.css' // 字体图标
import './assets/css/reset.css' // 格式化样式
import './assets/css/base.scss' // 全局样式

import vueFeedback from './utils/feedback' // 触摸反馈 <button v-fb>按钮</button>  /  <button v-fb="{cls:'buttonActive'}"
import VueLazyload from 'vue-lazyload'
Vue.use(vueFeedback)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/image/mouse.png'),
  loading: require('@/assets/image/mouse.png'),
  attempt: 2
})

// 监听浏览器的返回操作，赋值
window.addEventListener('popstate', (e) => {
  router.isBack = true
}, false)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
