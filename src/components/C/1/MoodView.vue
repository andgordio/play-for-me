<template>
  <div class="flex items-center h-full"> <!--overflow-scroll-->
    <div class="flex-1 text-center playbackButton1" @click="goTo('energy')">
      <div>
        <img src="./../../../assets/icn-energy.png" style="width: 186px; height: 186px;" alt="">
        <!-- <span class="icon ion-fireball text-12xl"/> -->
      </div>
      <div class="uppercase font-bold iconName">
        Energy
      </div>
    </div>
    <div class="flex-1 text-center playbackButton2" @click="goTo('chill')">
      <div>
        <img src="./../../../assets/icn-chill.png" style="width: 186px; height: 186px;" alt="">
        <!-- <span class="icon ion-umbrella text-12xl"/> -->
      </div>
      <div class="uppercase font-bold iconName">
        Chill
      </div>
    </div>
    <div class="flex-1 text-center playbackButton3" @click="goTo('classy')">
      <div>
        <img src="./../../../assets/icn-classy.png" style="width: 186px; height: 186px;" alt="">
        <!-- <span class="icon ion-coffee text-12xl"/> -->
      </div>
      <div class="uppercase font-bold iconName">
        Classy
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
    goTo (genre) {
      this.$emit('goTo', genre)
    }
  }
}
</script>

<style>

</style>
