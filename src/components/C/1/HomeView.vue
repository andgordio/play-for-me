<template>
  <div class="flex items-center h-full"> <!--overflow-scroll-->
    <div class="flex-1 text-center" @click="goTo('mood')">
      <div>
        <span class="icon ion-android-happy text-12xl"/>
      </div>
      <div>
        Mood
      </div>
    </div>
    <div class="flex-1 text-center" @click="goTo('smart')">
      <div>
        <span class="icon ion-flash text-20xl"/>
      </div>
      <div>
        Smart
      </div>
    </div>
    <div class="flex-1 text-center" @click="goTo('fresh')">
      <div>
        <span class="icon ion-leaf text-12xl"/>
      </div>
      <div>
        Fresh
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
    goTo (view) {
      this.$emit('goTo', view)
    }
  }
}
</script>

<style>

</style>
