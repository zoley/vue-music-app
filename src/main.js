import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/font/iconfont.css' // 字体图标
import './assets/css/reset.css' // 格式化样式
import './assets/css/base.scss' // 全局样式

import vueFeedback from './utils/feedback' // 触摸反馈 <button v-fb>按钮</button>  /  <button v-fb="{cls:'buttonActive'}"
Vue.use(vueFeedback)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
