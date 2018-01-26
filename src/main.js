import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import '../src/common/stylus/index.styl'
 Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:'../src/common/image/default.png'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
