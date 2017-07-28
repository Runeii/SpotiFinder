import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import { mapGetters, mapActions } from 'vuex'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App,
  mounted(){
    store.dispatch('SETTOKEN');
    if(store.state.TOKEN != false) {
      store.dispatch('BODYCLASSES', 'connected');
    }
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
