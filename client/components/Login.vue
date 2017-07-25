<template>
  <div class="login-wrapper">
    <h2>SpotiFinder</h2>
    <p>First, please click the button below to login to Spotify and authorise this application</p>
    <button @click="redirectAuth">Login to Spotify</button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectAuth(e) {
      window.location.href = "https://accounts.spotify.com/authorize?" +
                                "response_type=token&" +
                                "client_id=067127d56abb4962ac118d781e9f86ab&" +
                                "redirect_uri=http%3A%2F%2Flocalhost%3A4000%2F?";
    }
  }
}
</script>

<style>
</style>
