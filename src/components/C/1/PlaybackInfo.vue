<template>
  <div class="absolute pin-l w-full px-6" style="bottom: 50px;" @click="containerPressed()">
    <div class="w-full text-xl text-center py-4 font-light" :class="{'bg-blue': view !== 'player'}">
      <span v-if="!doShowNotification">{{meta1}}</span>
      <span v-if="!doShowNotification">{{meta2}}</span>
      <span v-else>{{notificationMessage}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [
    'view',
    'meta1',
    'meta2',
    'doShowNotification',
    'notificationMessage'
  ],
  data () {
    return {
      //
    }
  },
  methods: {
    containerPressed () {
      this.$emit('containerPressed')
    }
  }
}
</script>

<style>
</style>
