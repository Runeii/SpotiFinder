<template>
  <div class="audioplayer">
    <audio id="audioplayer" ref="audio" :src="this.audioSrc"></audio>
    <button v-on:click="playTrack()">Play</button>
    <button v-on:click="pauseTrack()">Pause</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      audioSrc: this.$props.track
    }
  },
  props: [
    'track'
  ],
  methods: {
    playTrack(){
      var player = this.$refs.audio;
      if(player.paused){
        player.play();
        console.log("play")
      }else{
        player.pause();
        console.log(player.currentTime);
      }
    },
    pauseTrack(){
      var player = this.$refs.audio;
      player.pause();
      console.log(player.currentTime);
    }
  }
}
</script>
