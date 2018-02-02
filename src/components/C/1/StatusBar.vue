<template>
  <div class="flex items-center z-20">
    <div class="w-2/5 flex items-center">
      <div class="mx-4" @click="goBack()" style="width: 40px; height: 40px;">
        <!-- <span class="icon ion-android-arrow-back text-3xl"/> -->
        <img src="./../../../assets/icn-back.png" style="width: 40px; height: 40px;" alt="">
      </div>
      <div class="mx-4" style="width: 40px; height: 40px;">
        <!-- <span class="icon ion-android-home text-3xl"/> -->
        <img src="./../../../assets/icn-home.png" style="width: 40px;" alt="">
      </div>
    </div>
    <div class="flex-1 text-center text-2xl my-3">
      12:30
    </div>
    <div class="w-2/5 flex flex-row-reverse items-center">
      <div class="mx-4" style="width: 40px; height: 40px;">
        <img src="./../../../assets/icn-app.png" style="width: 40px;" alt="">
      </div>
      <div class="mx-4" style="width: 40px; height: 40px;">
        <img src="./../../../assets/icn-app.png" style="width: 40px;" alt="">
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
