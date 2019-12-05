// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueTouch from 'vue-touch'
// Vue.use(VueTouch, {name: 'v-touch'})
// import vueAwesomeSwiper from 'vue-awesome-swiper'
// import "swiper/css/swiper.min.css";
// import animated from 'animate.css'
// Vue. use (animated)
// Vue. use (vueAwesomeSwiper)
// VueTouch.config.swipe = {
//   threshold: 100 //手指左右滑动距离
// }
Vue.prototype.axios = axios;
Vue.use(VueAxios,axios);
import $ from 'jquery'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
