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
input.search::placeholder {
  color:rgba(255,255,255,0.6);
}
</style>
