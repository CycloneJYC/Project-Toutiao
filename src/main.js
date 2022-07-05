import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './styles/theme.less'
import './styles/index.less'
import './styles/font/iconfont.css'

import router from './router'
import vant from '@/plugins/vant'
import 'vant/lib/index.less'

import 'amfe-flexible'

Vue.use(vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
