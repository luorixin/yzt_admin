// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import VueCookie from 'vue-cookie'
import {get, put, post} from '@/service/httpRequest'
import { library } from '@fortawesome/fontawesome-svg-core'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(solid)
library.add(regular)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.prototype.$get = get // ajax请求方法
Vue.prototype.$post = post // ajax请求方法
Vue.prototype.$put = put // ajax请求方法

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
