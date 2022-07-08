import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import Toasted from 'vue-toasted';
Vue.use(Toasted)
 
axios.defaults.baseURL = 'http://katyera.pythonanywhere.com/';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
