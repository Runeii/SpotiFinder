import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App,
  mounted(){
    this.$store.commit('setToken');
    this.$store.commit('getToken');
  }
})

Vue.use(VueAxios, axios)

export { app, router, store }
