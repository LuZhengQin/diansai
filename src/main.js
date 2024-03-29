import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Element from "element-ui";
import axios from 'axios'


Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
