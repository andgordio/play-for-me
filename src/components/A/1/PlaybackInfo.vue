<template>
  <div class="absolute pin-l w-full px-6" style="bottom: 50px;" @click="containerPressed()">
    <div class="w-full text-xl text-center py-4 font-light" :class="{'bg-blue': view !== 'player'}">
      {{meta}}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [
    'view',
    'meta'
  ],
  data () {
    return {
      //
    }
  },
  methods: {
    containerPressed () {
      console.log('1')
      this.$emit('containerPressed')
    }
  }
}
</script>

<style>
</style>
