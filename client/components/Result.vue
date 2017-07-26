<template>
  <a v-bind:href="'/artist/' + artist.id" class="artist-card">
    <li>
      <h3 class="h4">{{artist.name}}</h3>
      <span class="plus"></span>
      <ul>
        <li v-for="genre in artist.genres">{{genre}}</li>
      </ul>
    </li>
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
  .artist-card ul {
    display: none;
  }
</style>
