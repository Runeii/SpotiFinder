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
    var self = this;
    setTimeout(function(){
      if(self.$store.commit('getToken') != false) {
        self.$store.state.bodyClasses += ' connected';
      }
    }, 50);
  }
})

Vue.use(VueAxios, axios)

Vue.filter('tracktime', function (value) {
  var minutes = new Date(value).getUTCMinutes();
  var seconds = new Date(value).getUTCSeconds();
  if(seconds < 10) {
    seconds = seconds + '0';
  }
  return minutes + ':' + seconds;
})

export { app, router, store }
