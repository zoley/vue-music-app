<template>
  <div class="slider">
    <div class="slider-group">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dots: []
    }
  },
  mounted () {

  },
  computed: {},
  methods: {

  }
}
</script>

<style lang='scss' scoped>

</style>