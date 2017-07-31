<template>
  <img :src="imageSrc"></img>
</template>

<script>
export default {
  data: function () {
    return {
      imageSrc: this.small
    }
  },
  props: [
    'src',
    'small'
  ],
  mounted() {
    var img, that
    img = new Image()
    that = this
    img.onload = function(){
      that.imageSrc = that.src
    }
    img.src = this.src
  }
}
</script>
