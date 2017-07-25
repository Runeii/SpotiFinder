<template>
  <a v-bind:href="'/artist/' + artist.id" >
    <article class="artist-card">
      <h3>{{artist.name}}</h3>
      <ul v-for="genre in artist.genres">
        <li>{{genre}}</li>
      </ul>
    </article>
  </a>
</template>

<script>
export default {
  props: ['artist'],
  methods: {
  }
}
</script>

<style>
</style>
