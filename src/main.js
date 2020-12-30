import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.less'// 导入全局样式
import Vant from 'vant'// 导入Vant组件库
import 'vant/lib/index.css'// 导入Vant样式
import 'amfe-flexible'// 自动设定REM标准值
import './utils/dayjs'// dayjs的使用
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
