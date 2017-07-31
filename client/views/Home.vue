<template>
  <div class="homepage">
    <search></search>
  </div>
</template>

<script>
import Search from 'components/Search'
import { mapGetters } from 'vuex'

export default {
  components: {
    Search
  }
}
</script>
