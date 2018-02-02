<template>
  <div  class="flex flex-col h-screen w-screen bg-black text-white overflow-hidden">
    <div  class="absolute bg-cover"
          style="top: -100px; left: -50px; width: calc(100vw + 100px); height: calc(100vh + 200px); transition: .5s"
          :style="{ 'background-image': 'url(' + videoBackground + ')' }"
          :class="{blurry: view !== 'player'}"></div>
    <div  class="absolute bg-cover w-screen h-screen"
          style="top: -50px; left: -50px; width: calc(100vw + 100px); height: calc(100vh + 100px);"
          :style="{ 'background-image': 'url(' + videoCurtain + ')' }"></div>
    <div class="flex-1 z-10">

      <transition name="playerControls" appear>
        <HomeView     v-if = "view === 'home'"
                      class="absolute pin-t pin-l w-full"
                      style="height: calc(100vh - 114px)"
                      @goTo = "goFromHomeTo($event)"/></transition>

      <transition name="playerControls" appear>
        <MoodView     v-if = "view === 'mood'"
                      class="absolute pin-t pin-l w-full"
                      style="height: calc(100vh - 114px)"
                      @goTo = "goFromMoodTo($event)"/></transition>

      <transition name="playerControls" appear>
        <PlayerView   v-if = "view === 'player'"
                      class="absolute pin-t pin-l w-full"
                      style="height: calc(100vh - 114px)"
                      :isPlaying = "isPlaying"
                      :didPlayLongEnough = "didPlayLongEnough"
                      :isRepeatOn = "isRepeatOn"
                      @playbackPlay = "playbackPlay"
                      @playbackPause = "playbackPause"
                      @playbackNext = "playbackNext"
                      @playbackPrevious = "playbackPrevious"
                      @playbackAgain = "playbackAgain"
                      @disliked = "playbackDisliked"
                      @liked = "playbackLiked"
                      @playbackRepeatOn = "playbackRepeatOn"
                      @playbackRepeatOff = "playbackRepeatOff"/>
      </transition>
    </div>
    <PlaybackInfo     v-if = "didStartPlaying || doShowNotification"
                      class="z-20"
                      :view = "view"
                      :meta1 = "videoMeta1"
                      :meta2 = "videoMeta2"
                      :doShowNotification = "doShowNotification"
                      :notificationMessage = "notificationMessage"
                      :notificationMessage2 = "notificationMessage2"
                      @containerPressed = "containerPressed"/>

    <!-- <Notification     v-if = "doShowNotification"
                      :message = "notificationMessage"/> -->

    <StatusBar        @goBack="goBack()"/>
    <div class="absolute" style="top: 1000px; right: 1000px;">
      <!--  -->
      <youtube :player-vars="{ start: 0, autoplay: 0, allowfullscreen: 0, playsinline: 1}" :video-id="videoId" @ready="videoReady" @ended="playbackNextAuto"></youtube>
    </div>
  </div>
</template>

<script>
import HomeView from './HomeView'
import MoodView from './MoodView'
import PlayerView from './PlayerView'
import PlaybackInfo from './PlaybackInfo'
import Notification from './Notification'
import StatusBar from './StatusBar'

import SONGS_DATA from '../../SONGS_DATA_2.json'

export default {
  name: 'Home',
  components: {
    HomeView,
    MoodView,
    PlayerView,
    PlaybackInfo,
    Notification,
    StatusBar
  },
  data () {
    return {
      view: 'home',
      doShowNotification: false,
      isPlaying: false,
      didStartPlaying: false,
      notificationMessage: 'hi',
      isBackToMood: false,
      player: null,
      // playback
      didPlayLongEnough: false,
      isRepeatOn: false,
      // current video data
      videoId: '',
      videoMeta1: '',
      videoMeta2: '',
      videoBackground: 'http://wsum.org/wp-content/uploads/2018/01/lorde-melodrama-album-review.jpg',
      videoCurtain: 'https://firebasestorage.googleapis.com/v0/b/play-4-me.appspot.com/o/curtains%2Fcurtain-gorillaz.png?alt=media&token=0e857c08-c108-44de-9033-415050ca2380',
      // playlists
      songs: [],
      energy: [],
      chill: [],
      classy: [],
      fresh: [],
      chosenPlaylist: [],
      chosenSong: 0,
      // misc
      didChooseNewSong: false
    }
  },
  methods: {
    // HomeView
    goFromHomeTo (view) {
      this.isBackToMood = view === 'mood'
      switch (view) {
        case 'mood':
          this.view = view
          this.isBackToMood = true
          break
        case 'smart':
          this.view = 'player'
          this.setPlaylist('smart')
          break
        case 'fresh':
          this.view = 'player'
          this.setPlaylist('fresh')
          break
      }
    },
    // MoodView
    goFromMoodTo (genre) {
      this.setPlaylist(genre)
      this.view = 'player'
    },
    // PlayerView
    playbackPlay () {
      this.isPlaying = true
      this.didStartPlaying = true
      // again/previous functionality p.I:
      let currentSong = this.chosenSong
      this.didPlayLongEnough = false
      //
      setTimeout(() => {
        this.player.playVideo()
      }, 100)
      // again/previous functionality p.II:
      setTimeout(() => {
        if (currentSong === this.chosenSong) {
          this.didPlayLongEnough = true
        }
      }, 7000)
      //
    },
    playbackPause () {
      this.isPlaying = false
      this.player.pauseVideo()
    },
    playbackNext () {
      if (this.chosenPlaylist.length - 1 !== this.chosenSong) {
        this.chosenSong++
      } else {
        this.chosenSong = 0
      }
      this.pickSong()
    },
    playbackNextAuto () {
      if (this.isRepeatOn) {
        this.playbackAgain()
      } else {
        this.playbackNext()
      }
    },
    playbackPrevious () {
      if (this.chosenSong !== 0) {
        this.chosenSong--
      }
      this.pickSong()
    },
    playbackAgain () {
      this.player.stopVideo()
      this.playbackPlay()
    },
    playbackDisliked () {
      this.notificationMessage = 'You disliked the song 🙉'
      this.notificationMessage2 = 'Let\'s try something different'
      this.showNotification(true)
    },
    playbackLiked () {
      this.notificationMessage = 'You liked the song 🤟'
      this.notificationMessage2 = 'We\'ll find more songs like this for you'
      this.showNotification(true)
    },
    playbackRepeatOn () {
      this.isRepeatOn = true
      this.notificationMessage = 'Repeat is on'
      this.notificationMessage2 = ' '
      this.showNotification(true)
    },
    playbackRepeatOff () {
      this.isRepeatOn = false
      this.notificationMessage = 'Repeat is off'
      this.notificationMessage2 = ' '
      this.showNotification(true)
    },
    // PlaybackInfo
    containerPressed () {
      if (this.view !== 'player') {
        this.view = 'player'
      }
    },
    // StatusBar
    goBack () {
      switch (this.view) {
        case 'home':
          alert('no going back from here, bro')
          break
        case 'player':
          if (this.isBackToMood) {
            this.view = 'mood'
          } else {
            this.view = 'home'
          }
          break
        case 'mood':
        default:
          this.view = 'home'
      }
    },
    // local
    showNotification (isSelfDestructing) {
      this.doShowNotification = true
      setTimeout(() => {
        this.doShowNotification = false
      }, 2000)
    },
    videoReady (player) {
      this.player = player
    },
    setPlaylist (playlist) {
      this.didChooseNewSong = true
      this.notificationMessage = ''
      switch (playlist) {
        case 'smart':
          this.notificationMessage += 'Smart playlist'
          this.chosenPlaylist = this.songs
          break
        case 'fresh':
          this.notificationMessage += 'Fresh playlist'
          this.chosenPlaylist = this.fresh
          break
        case 'energy':
          this.notificationMessage += 'Energizing playlist'
          this.chosenPlaylist = this.energy
          break
        case 'chill':
          this.notificationMessage += 'Relaxing playlist'
          this.chosenPlaylist = this.chill
          break
        case 'classy':
        default:
          this.notificationMessage += 'Classical playlist'
          this.chosenPlaylist = this.classy
      }
      this.shuffleArray(this.chosenPlaylist)
      this.notificationMessage2 = 'Playing now'
      this.showNotification(true)
      this.chosenSong = 0
      this.pickSong()
    },
    pickSong () {
      this.isRepeatOn = false
      this.videoId = this.chosenPlaylist[this.chosenSong].videoId
      this.videoMeta1 = this.chosenPlaylist[this.chosenSong].meta1
      this.videoMeta2 = this.chosenPlaylist[this.chosenSong].meta2
      this.videoBackground = this.chosenPlaylist[this.chosenSong].coverUrl
      this.videoCurtain = this.chosenPlaylist[this.chosenSong].curtainUrl
      this.playbackPlay()
    },
    shuffleArray (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
  },
  created () {
    this.songs = SONGS_DATA
    this.energy = this.songs.filter(song => song.mood === 'energy')
    this.chill = this.songs.filter(song => song.mood === 'chill')
    this.classy = this.songs.filter(song => song.mood === 'classy')
    this.fresh = this.songs.filter(song => song.isFresh)
  }
}
</script>

<style lang="scss">
/*
  Player controls
*/

.playerControls-enter-active {
  transition: all 1.4s .3s;
}
.playerControls-leave-active {
  transition: all .3s;
}
.playerControls-enter, .playerControls-leave-to  {
  opacity: 0.99;
}

.playerControls-enter-active .playbackButton1 {
  transition: all .4s .4s;
}
.playerControls-leave-active .playbackButton1 {
  transition: all .3s;
}
.playerControls-enter .playbackButton1, .playerControls-leave-to .playbackButton1  {
  transform: scale(0.4);
  opacity: 0;
}

.playerControls-enter-active .playbackButton2 {
  transition: all .3s .3s;
}
.playerControls-leave-active .playbackButton2 {
  transition: all .3s;
}
.playerControls-enter .playbackButton2, .playerControls-leave-to .playbackButton2  {
  transform: scale(0.4);
  opacity: 0;
}

.playerControls-enter-active .playbackButton3 {
  transition: all .4s .4s;
}
.playerControls-leave-active .playbackButton3 {
  transition: all .3s;
}
.playerControls-enter .playbackButton3, .playerControls-leave-to .playbackButton3  {
  transform: scale(0.4);
  opacity: 0;
}
</style>
