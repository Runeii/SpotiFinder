import Vue from 'vue'
import Vuex from 'vuex'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage, {
  namespace: 'vuejs__'
});
Vue.use(Vuex)

const state = {
  token: Vue.ls.get("spotify_auth_token"),
  token_expiry: Vue.ls.get("spotify_auth_token_time"),
  artists: [{
    'images': [{
      url: ''
    }]
  }],
  albums: [],
  query: ''
}

const mutations = {
  getToken(){
    if(state.token === false || state.token_expiry < Date.now()){
      window.location.href = "https://accounts.spotify.com/authorize?" +
                                "response_type=token&" +
                                "client_id=067127d56abb4962ac118d781e9f86ab&" +
                                "redirect_uri=http%3A%2F%2Flocalhost%3A4000%2F?";
      return false;
    } else {
      return state.token;
    }
  },
  setToken(){
    var access_token = getParameterByName('access_token');
    if(access_token != null && access_token != '') {
      state.token = access_token;
      Vue.ls.set("spotify_auth_token", access_token);
      //Expiry time is in seconds, so convert to milliseconds and save time expires
      state.token_expiry = Date.now() + (getParameterByName('expires_in') * 1000);
      Vue.ls.set("spotify_auth_token_time", state.token_expiry);
    }
  }
}
const actions = {
  getArtistDiscography(){
    this.axios.get('artists/' + this.$route.params.artistId + '/albums', {
      timeout: 1000,
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: 'Bearer ' + this.$store.state.token
      }
    }).then((response) => {
      this.$data.albums = response.data.items;
    });
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
