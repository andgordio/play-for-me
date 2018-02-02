<template>
  <div class="flex items-center h-full"> <!--overflow-scroll-->
    <div class="flex-1 text-center playbackButton1" @click="goTo('energy')">
      <div>
        <span class="icon ion-fireball text-12xl"/>
      </div>
      <div>
        Energy
      </div>
    </div>
    <div class="flex-1 text-center playbackButton2" @click="goTo('chill')">
      <div>
        <span class="icon ion-umbrella text-12xl"/>
      </div>
      <div>
        Chill
      </div>
    </div>
    <div class="flex-1 text-center playbackButton3" @click="goTo('classy')">
      <div>
        <span class="icon ion-coffee text-12xl"/>
      </div>
      <div>
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
