<template>
  <div v-bind:class="this.$store.state.bodyClasses">
    <input :value="this.$store.state.query" @input="update" class="leftpane search" v-on:keyup.enter="search" placeholder="Type an artist to start" autofocus />
    <transition-group name="fade" tag="div" class="rightpane list">
      <result v-for="(artist, key) in artists" v-bind:artist="artist" :key="key"></result>
    </transition-group>
  </div>
</template>

<script>
import Result from 'components/Result';

export default {
  components: {
    Result
  },
  props: ['artists'],
  computed: {
    currentSearch: function(e){
      return this.$store.state.query;
    }
  },
  methods: {
    update(e) {
      this.$store.state.query = e.target.value;
    },
    search(e) {
      console.log(this.$store.state.token);
      this.axios.get('search', {
        timeout: 1000,
        baseURL: 'https://api.spotify.com/v1/',
        headers: {
          Authorization: 'Bearer ' + this.$store.state.token
        },
        params: {
          q: this.$store.state.query,
          type: 'artist',
          limit: '50',
          market: 'GB'
        }
      }).then((response) => {
        this.$store.state.artists = response.data.artists.items;
        console.log(this.$store.state.artists);
      });
    }
  }
}
</script>


<style>
.leftpane {
  cursor: pointer;
  position: fixed;
  right:50%;
  top:0;
  width:50%;
  height:0;
  background-color:rgb(223,142,115);
  transition:all 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.5s;
  padding:0 0 0 5%;
  font-size:2.25rem;
  color:white;
  overflow: hidden;
}
.leftpane img {
  height:100vh;
  min-width:50vw;
  object-fit: cover;
  position: absolute;
  left:50%;
  top:0;
  transform: translateX(-50%);
  filter:blur(5px);
}
.leftpane .info {
  position: absolute;
  left:50%;
  top:50%;
  transform: translateX(-50%) translateY(-50%);
}
.leftpane h1 {
  margin:0;
}
.rightpane {
  position: fixed;
  right:0;
  bottom:0;
  width:50%;
  height:0;
  background-color: rgb(243, 220, 206);
  transition:all 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.5s;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: scroll;
  padding:0;
  margin: 0;
}
.rightpane.list > a {
  width:100%;
  text-decoration: none;
  color:#333;
}
.rightpane.list li {
  width:100%;
  color:#333;
  text-align:left;
  padding:2.25rem;
  font-size:2.25rem;
  border: 1.5rem solid rgb(243, 220, 206);
  border-bottom:1px solid rgba(50,50,50,0.3);
  border-top: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor:pointer;
}
.rightpane.list li:hover {
  background-color:rgba(50,50,50,0.1);
  border: 1.5rem solid rgba(50,50,50,0);
  border-bottom:1px solid rgba(50,50,50,0.3);
  border-top: none;
}
.rightpane.list li h3 {
  margin:0;
  font-size:3.375rem;
}
.connected > * {
  height:100%;
}
.connected .rightpane {
  padding:1.5rem;
}
input.search::placeholder {
  color:rgba(255,255,255,0.6);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
