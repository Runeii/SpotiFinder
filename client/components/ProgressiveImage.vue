<template>
  <img :src="imageSrc"></img>
</template>

<script>
export default {
  data: function () {
    console.log('Small image loading: ' + this.small);
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
      console.log('Large image loading: ' + that.src);
    }
    img.src = this.src
  }
}
</script>
