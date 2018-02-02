<template>
  <div class="flex items-center h-full"> <!--overflow-scroll-->
    <div class="flex-1 text-center playbackButton1">
      <div>
        <!-- <span v-if="!isRepeatOn" class="icon ion-skip-backward text-12xl" @click="playbackPrevious()"/>
        <span v-else class="icon ion-loop text-12xl" @click="playbackRepeatClicked()"/> -->
        <span v-if="!isRepeatOn" @click="playbackPrevious()">
          <img src="./../../../assets/icn-prev.png" style="width: 186px; height: 186px;" alt="">
        </span>
        <span v-if="isRepeatOn" @click="playbackRepeatClicked()">
          <img src="./../../../assets/icn-repeat.png" style="width: 186px; height: 186px;" alt="">
        </span>
      </div>
    </div>
    <div class="flex-1 text-center playbackButton2">
      <div @click="playbackPlay()">
        <!-- <span v-if="!isPlaying" class="icon ion-play text-20xl"/>
        <span v-else class="icon ion-pause text-20xl"/> -->
        <img v-if="!isPlaying" src="./../../../assets/icn-play.png" style="width: 186px; height: 186px;" alt="">
        <img v-if="isPlaying" src="./../../../assets/icn-pause.png" style="width: 186px; height: 186px;" alt="">
      </div>
    </div>
    <div class="flex-1 text-center playbackButton3" @click="playbackNext()">
      <div>
        <img src="./../../../assets/icn-next.png" style="width: 186px; height: 186px;" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [
    'isPlaying',
    'didPlayLongEnough',
    'isRepeatOn'
  ],
  data () {
    return {
      playClicks: 0,
      nextClicks: 0,
      prevClicks: 0
    }
  },
  methods: {
    playbackPlay () {
      this.nextClicks++
      if (this.nextClicks === 2) {
        this.$emit('liked')
        setTimeout(() => {
          this.nextClicks = 0
        }, 200)
      } else {
        setTimeout(() => {
          if (this.nextClicks < 2) {
            if (this.isPlaying) {
              this.$emit('playbackPause')
            } else {
              this.$emit('playbackPlay')
            }
            this.nextClicks = 0
          }
        }, 200)
      }
    },
    playbackNext () {
      this.nextClicks++
      if (this.nextClicks === 2) {
        this.$emit('disliked')
        this.nextClicks = 0
      } else {
        setTimeout(() => {
          if (this.nextClicks < 2) {
            this.$emit('playbackNext')
            this.nextClicks = 0
          }
        }, 200)
      }
    },
    playbackPrevious () {
      this.prevClicks++
      if (this.prevClicks === 2) {
        this.$emit('playbackRepeatOn')
        setTimeout(() => {
          this.prevClicks = 0
        }, 200)
      } else {
        setTimeout(() => {
          if (this.prevClicks < 2) {
            if (this.didPlayLongEnough) {
              this.$emit('playbackAgain')
            } else {
              this.$emit('playbackPrevious')
            }
            this.prevClicks = 0
          }
        }, 200)
      }
    },
    playbackRepeatClicked () {
      this.$emit('playbackRepeatOff')
    }
  }
}
</script>

<style>

</style>
