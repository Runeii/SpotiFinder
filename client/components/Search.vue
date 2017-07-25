<template>
  <div class="search-wrapper">
    <input :value="this.$store.state.query" @input="update" class="counter" v-on:keyup.enter="search" />
    <result v-for="artist in artists" v-bind:artist="artist"></result>
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
.counter {
  margin: 100px auto;
  border-radius: 3px;
  width: 50%;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 5rem;
  background-color: #f0f0f0;
  user-select: none;
}
</style>
