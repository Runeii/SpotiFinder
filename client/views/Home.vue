<template>
  <div class="page">
    <search v-bind:artists="this.$store.state.artists" v-if="this.$store.state.token != false"></search>
    <login v-else=""></login>
  </div>
</template>

<script>
import Search from 'components/Search'
import Login from 'components/login'

export default {
  components: {
    Search,
    Login
  }
}
</script>
