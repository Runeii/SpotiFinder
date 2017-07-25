<template>
  <div class="page">
    <div class="artist">
      <img :src="artist.images[0].url" />
      <h1>{{artist.name}}</h1>
    </div>
    <div class="discography">
      <ul>
        <li v-for="album in albums">
          <img :src="album.images[0].url" />
          <h2>{{album.name}}</h2>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data: function() {
    return {
      artist: {},
      albums: this.$store.dispatch('getDiscography')
    }
  },
  components: {

  },
  mounted() {
    this.axios.get('artists/' + this.$route.params.artistId, {
      timeout: 1000,
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: 'Bearer ' + this.$store.state.token
      }
    }).then((response) => {
      this.$data.artist = response.data;
    });
  }
}
</script>
