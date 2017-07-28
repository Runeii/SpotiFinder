<template>
  <div v-bind:class="this.$store.state.bodyClasses">
    <div class="leftpane album">
      <img :src="album.images[0].url" />
      <div class="info">
        <AudioPlayer></AudioPlayer>
        <h1>{{album.name}}</h1>
        <ul>
          <li>{{ new Date(album.release_date).getUTCFullYear()}}</li>
          <li>{{ totallength | tracktime }}</li>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    album() {
      return this.ALBUMDETAILS(this.$route.params.albumId)
    },
    totallength() {
      var temp = 0;
      this.album.tracks.items.forEach(function(e){
        temp += e.duration_ms;
      });
      return temp;
    },
    ...mapGetters(['ALBUMDETAILS'])
  },
  components: {
    AudioPlayer
  },
  mutations: {
    QUEUE(state, track){
        this.queue = track;
    }
  },
  methods: {
    playTrack: function(track) {
      this.$store.dispatch('PLAYSONG',track);
    },
    ...mapActions(['PULL_ALBUMDETAILS'])
  },
  mounted() {
    this.PULL_ALBUMDETAILS(this.$route.params.albumId);
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
