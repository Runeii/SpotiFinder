<template>
  <div v-bind:class="this.$store.state.bodyClasses">
    <input :value="query" @input="update" class="leftpane search" v-on:keyup.enter="search" placeholder="Type an artist to start" autofocus />
    <transition-group name="fade" tag="div" class="rightpane list">
      <result v-for="(artist, key) in artists" v-bind:artist="artist" :key="key"></result>
    </transition-group>
  </div>
</template>

<script>
import Result from 'components/Result';
import { mapGetters, mapActions } from 'vuex'

export default {
  data: function () {
    return {
      query: ''
    }
  },
  computed: {
    artists(){
      return this.ARTISTS;
    },
    ...mapGetters(['ARTISTS'])
  },
  components: {
    Result
  },
  methods: {
    update(e) {
      this.query = e.target.value;
    },
    search(e) {
      this.PULL_ARTISTS(this.query);
    },
    ...mapActions(['PULL_ARTISTS'])
  }
}
</script>


<style>
input.search::placeholder {
  color:rgba(255,255,255,0.6);
}
</style>
