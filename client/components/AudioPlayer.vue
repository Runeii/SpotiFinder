<template>
  <div class="audioplayer">
    <audio id="audioplayer" ref="audio" :src="audioSrc"></audio>
    <button v-on:click="playTrack()">Play</button>
    <button v-on:click="pauseTrack()">Pause</button>
  </div>
</template>

<script>
export default {
  computed: {
    audioSrc(){
      return this.$store.state.playlist
    },
    player(){
      return this.$refs.audio
    }
  },
  methods: {
    playTrack(){
      this.player.play();
    },
    pauseTrack(){
      this.player.pause();
    }
  }
}
</script>
