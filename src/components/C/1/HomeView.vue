<template>
  <div class="flex items-center h-full"> <!--overflow-scroll-->
    <div class="flex-1 text-center playbackButton1" @click="goTo('mood')">
      <div>
        <img src="./../../../assets/icn-mood.png" style="width: 186px; height: 186px;" alt="">
        <!-- <span class="icon ion-android-happy text-12xl"/> -->
      </div>
      <!-- <div>
        Mood
      </div> -->
    </div>
    <div class="flex-1 text-center playbackButton2" @click="goTo('smart')">
      <div>
        <!-- <span class="icon ion-flash text-20xl"/> -->
        <img src="./../../../assets/icn-smart.png" style="width: 186px; height: 186px;" alt="">
      </div>
      <!-- <div>
        Smart
      </div> -->
    </div>
    <div class="flex-1 text-center playbackButton3" @click="goTo('fresh')">
      <div>
        <img src="./../../../assets/icn-mood.png" style="width: 186px; height: 186px;" alt="">
        <!-- <span class="icon ion-leaf text-12xl"/> -->
      </div>
      <!-- <div>
        Fresh
      </div> -->
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
    goTo (view) {
      this.$emit('goTo', view)
    }
  }
}
</script>

<style>

</style>
