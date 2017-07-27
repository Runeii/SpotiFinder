<template>
  <div v-bind:class="this.$store.state.bodyClasses">
    <div class="leftpane album">
      <img :src="album.images[0].url" />
      <div class="info">
        <AudioPlayer :track="this.queue"></AudioPlayer>
        <h1>{{album.name}}</h1>
        <ul>
          <li>{{ new Date(album.release_date).getUTCFullYear()}}</li>
          <li>{{ length | tracktime }}</li>
        </ul>
      </div>
    </div>
    <ol class="rightpane list">
      <li v-for="track in album.tracks.items" v-on:click="playTrack(track.preview_url)" :track="track.preview_url">
        <div class="title">{{track.name}}</div>
        <div class="time">
          {{ track.duration_ms | tracktime }}
        </div>
      </li>
    </ol>

  </div>
</template>

<script>
import AudioPlayer from 'components/AudioPlayer';
export default {
  data: function() {
    return {
      album: {},
      length: 0,
      queue: ''
    }
  },
  components: {
    AudioPlayer
  },
  methods: {
    playTrack: function(track) {
      this.queue = track;
    }
  },
  mounted() {
    this.axios.get('albums/' + this.$route.params.albumId, {
      timeout: 1000,
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: 'Bearer ' + this.$store.state.token
      }
    }).then((response) => {
      this.$data.album = response.data;
      var temp = 0;
      this.$data.album.tracks.items.forEach(function(e){
        temp += e.duration_ms;
      });
      this.$data.length = temp;
    });
  }
}
</script>
<style>
  .info ul {
    list-style: none;
    width:50%;
    padding:0;
    margin:0;
    font-size:1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:100%;
  }
</style>
