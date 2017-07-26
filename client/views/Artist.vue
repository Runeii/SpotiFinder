<template>
  <div v-bind:class="this.$store.state.bodyClasses">
    <div class="leftpane artist">
      <img :src="artist.images[0].url" />
      <div class="info">
        <h1>{{artist.name}}</h1>
      </div>
    </div>
    <ul class="rightpane discography">
      <a v-for="album in albums" v-bind:href="'/album/' + album.id">
        <li class="disc">
          <ProgressiveImage :small="album.images[2].url" :src="album.images[0].url"></ProgressiveImage>
          <div class="details">
            <p>{{album.name}}</p>
          </div>
        </li>
      </a>
    </ul>

  </div>
</template>

<script>
import ProgressiveImage from 'components/ProgressiveImage'
export default {
  data: function() {
    return {
      artist: {
        images: [
          {url: ''}
        ]
      },
      albums: {}
    }
  },
  components: {
    ProgressiveImage
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
    this.axios.get('artists/' + this.$route.params.artistId + '/albums', {
      timeout: 1000,
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: 'Bearer ' + this.$store.state.token
      }
    }).then((response) => {
      this.$data.albums = response.data.items;
    });
  }
}
</script>

<style>
  .discography > a {
    width:50%;
    padding:1.5rem;
    color:black;
    text-decoration: none;
  }
  .disc {
    width:100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
  }
  .disc img {
    width:50%;
    height: 100%;
    margin-right:50%;
  }
  .disc .details {
    width:50%;
    background-color: white;
    height: 100%;
    text-align: left;
    margin:0;
    font-size:1.5rem;
    position: absolute;
    top:0;
    left:50%;
    bottom:0;
    right:0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:0.667rem;
  }
  .details p {
    margin:0;
    font-size: 1rem;
    font-weight:bold;
    line-height:1.5;
  }
</style>
