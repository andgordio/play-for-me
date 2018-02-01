<template>
  <div class="flex items-center" style="opacity: 0.6">
    <div class="w-2/5 flex">
      <div class="py-2 px-3" @click="goBack()">
        <span class="icon ion-android-arrow-back text-3xl"/>
      </div>
      <div class="py-2 px-3">
        <span class="icon ion-android-home text-3xl"/>
      </div>
    </div>
    <div class="flex-1 text-center text-2xl">
      12:30
    </div>
    <div class="w-2/5 flex flex-row-reverse">
      <div class="py-2 px-3">
        <span class="icon ion-social-instagram text-3xl"/>
      </div>
      <div class="py-2 px-3">
        <span class="icon ion-social-vimeo text-3xl"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      //
    }
  },
  methods: {
    goBack () {
      this.$emit('goBack')
    }
  }
}
</script>

<style>

</style>
