import Vue from 'vue'
import Vuex from 'vuex'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage, {
  namespace: 'vuejs__'
});
Vue.use(Vuex)

const state = {
  token: '',
  token_expiry: '',
  artists: {},
  artistDetails: {},
  albumDetails: {},
  discography: {},
  query: '',
  currentId: '',
  bodyClasses: 'page',
  playlist: ''
}
const getters = {
  TOKEN(){
    //Test expiry token
    var stored_token = state.token || Vue.ls.get("spotify_auth_token") || false;
    var stored_expiry = state.token_expiry || Vue.ls.get("spotify_auth_token_time") || 0;
    //Test if expired, or if we are lacking a token send for authorisation
    if(stored_token === false || stored_expiry < Date.now()){
      window.location.href = "https://accounts.spotify.com/authorize?" +
                                "response_type=token&" +
                                "client_id=067127d56abb4962ac118d781e9f86ab&" +
                                "redirect_uri=http%3A%2F%2Flocalhost%3A4000%2F?";
      return false;
    } else {
      state.token = stored_token;
      state.token_expiry = stored_expiry;
      return state.token;
    }
  },
  ARTISTS() {
    return state.artists;
  },
  ARTISTDETAILS: () => (id) => {
    return state.artistDetails[id];
  },
  DISCOGRAPHY: () => (id) => {
    return state.discography[id];
  },
  ALBUMDETAILS: () => (id) => {
    return state.albumDetails[id];
  }
}
const mutations = {
  TOKEN(state, received_token){
    state.token = received_token.access_token;
    state.token_expiry = Date.now() + (received_token.expires_in * 1000);

    //Save to local storage as well for permenance across sessions
    Vue.ls.set("spotify_auth_token", state.token);
    Vue.ls.set("spotify_auth_token_time", state.token_expiry);
  },
  ARTISTS(state, data){
    state.artists = data;
  },
  ARTISTDETAILS(state, data){
    Vue.set(state.artistDetails, data.artistid, data.response);
  },
  DISCOGRAPHY(state, data){
    Vue.set(state.discography, data.artistid, data.response);
  },
  ALBUMDETAILS(state, data){
    Vue.set(state.albumDetails, data.albumid, data.response);
  },
  BODYCLASSES(state, newclass){
    state.bodyClasses += ' ' + newclass;
  },
  ADDTOPLAYLIST(state, track){
    state.playlist = track;
  }
}
const actions = {
  SETTOKEN(){
    var received_token = {
      'access_token': getParameterByName('access_token'),
      'expires_in': getParameterByName('expires_in')
    };
    if(received_token.access_token != null && received_token.access_token != '') {
      store.commit('TOKEN', received_token);
    }
  },
  PULL_ARTISTS(state, query){
    Vue.axios.get('search', {
      timeout: 1000,
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: 'Bearer ' + getters.TOKEN()
      },
      params: {
        q: query,
        type: 'artist',
        limit: '50',
        market: 'GB'
      }
    }).then((response) => {
      store.commit('ARTISTS', response.data.artists.items);
    });
  },
  PULL_ARTISTDETAILS(state, id){
    Vue.axios.get('artists/' + id, {
      timeout: 1000,
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: 'Bearer ' + getters.TOKEN()
      }
    }).then((response) => {
      var payload = {
        artistid: id,
        response: response.data
      }
      store.commit('ARTISTDETAILS', payload);
      store.commit('BODYCLASSES','artistloaded');
    });
  },
  PULL_DISCOGRAPHY(state, artistid){
    Vue.axios.get('artists/' + artistid + '/albums', {
      timeout: 1000,
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: 'Bearer ' + getters.TOKEN()
      }
    }).then((response) => {
      var payload = {
        artistid: artistid,
        response: response.data.items
      }
      store.commit('DISCOGRAPHY',payload);
      store.commit('BODYCLASSES','albumsloaded');
    });
  },
  PULL_ALBUMDETAILS(state, albumid){
    Vue.axios.get('albums/' + albumid, {
      timeout: 1000,
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: 'Bearer ' + getters.TOKEN()
      }
    }).then((response) => {
      var payload = {
        albumid: albumid,
        response: response.data
      }
      store.commit('ALBUMDETAILS',payload);
      store.commit('BODYCLASSES','albumsloaded');
    });
  },
  BODYCLASSES(state, newclass){
    store.commit('BODYCLASSES',newclass);
  },
  PLAYSONG(state, track) {
    store.commit('ADDTOPLAYLIST',track);
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
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
