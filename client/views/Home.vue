<template>
  <div class="homepage">
    <search v-if="TOKEN != false"></search>
  </div>
</template>

<script>
import Search from 'components/Search'
import { mapGetters } from 'vuex'

export default {
  components: {
    Search
  },
  computed: {
    ...mapGetters(['TOKEN'])
  }
}
</script>
