<template>
  <div class="absolute pin-l w-full px-6" style="top: 10px;" @click="containerPressed()">
    <div class="w-full text-xl text-center py-4 font-light bg-orange">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [
    'message'
  ],
  data () {
    return {
      //
    }
  },
  methods: {
    //
  }
}
</script>

<style>

</style>
