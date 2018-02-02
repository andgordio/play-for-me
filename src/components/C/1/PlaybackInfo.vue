<template>
  <div class="absolute pin-l w-full px-6" style="bottom: 50px;" @click="containerPressed()">
    <div class="w-full text-center pt-1 pb-2 rounded" :class="{'bg-box': view !== 'player'}">
      <div class="text-4xl overflow-hidden h-12 relative">
        <transition name="titlePlayback" appear>
          <div v-if="!doShowNotification" class="absolute w-full">
            {{meta1}}
          </div>
        </transition>
        <transition name="titleNotification" appear>
          <div v-if="doShowNotification" class="absolute w-full">
            {{notificationMessage}}
          </div>
        </transition>
      </div>
      <div class="text-xl overflow-hidden h-6 relative">
        <transition name="subtitlePlayback" appear>
          <div v-if="!doShowNotification" class="absolute w-full">
            {{meta2}}
          </div>
        </transition>
        <transition name="subtitleNotification" appear>
          <div v-if="doShowNotification" class="absolute w-full">
            {{notificationMessage2 || "Playing now"}}
          </div>
        </transition>
      </div>
      <!-- <span v-else>{{notificationMessage}}</span> -->
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
    'notificationMessage',
    'notificationMessage2'
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
/*
  Line 1
*/
.titlePlayback-enter-active, .titlePlayback-leave-active {
  transition: all .7s;
}
.titlePlayback-enter, .titlePlayback-leave-to {
  transform: translate(0,-50px);
  opacity: 0;
}

.titleNotification-enter-active, .titleNotification-leave-active {
  transition: all .7s;
}
.titleNotification-enter, .titleNotification-leave-to {
  transform: translate(0,50px);
  opacity: 0;
}

/*
  Line 2
*/
.subtitlePlayback-enter-active, .subtitlePlayback-leave-active {
  transition: all .7s .2s;
}
.subtitlePlayback-enter, .subtitlePlayback-leave-to {
  transform: translate(0,-50px);
  opacity: 0;
}

.subtitleNotification-enter-active, .subtitleNotification-leave-active {
  transition: all .7s .2s;
}
.subtitleNotification-enter, .subtitleNotification-leave-to {
  transform: translate(0,50px);
  opacity: 0;
}
</style>
