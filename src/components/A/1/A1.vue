<template>
  <div  class="flex flex-col h-screen w-screen bg-black text-white overflow-hidden">
    <div  class="absolute w-screen h-screen pin-t pin-l opacity-25 bg-cover"
          v-if = "view === 'player'"
          :style="{ 'background-image': 'url(' + videoBackground + ')' }"></div>
    <div class="flex-1 z-10">
      <HomeView       v-if = "view === 'home'"
                      @goTo = "goFromHomeTo($event)"/>

      <MoodView       v-if = "view === 'mood'"
                      @goTo = "goFromMoodTo($event)"/>

      <PlayerView     v-if = "view === 'player'"
                      :isPlaying = "isPlaying"
                      :didPlayLongEnough = "didPlayLongEnough"
                      @playbackPlay = "playbackPlay"
                      @playbackPause = "playbackPause"
                      @playbackNext = "playbackNext"
                      @playbackPrevious = "playbackPrevious"
                      @playbackAgain = "playbackAgain"
                      @disliked = "playbackDisliked"
                      @liked = "playbackLiked"/>
    </div>
    <PlaybackInfo     v-if = "didStartPlaying"
                      class="z-20"
                      :view = "view"
                      :meta = "videoMeta"
                      @containerPressed = "containerPressed"/>

    <Notification     v-if = "doShowNotification"
                      :message = "notificationMessage"/>

    <StatusBar        @goBack="goBack()"/>
    <div class="absolute" style="top: 1000px; right: 1000px;">
      <!--  -->
      <youtube :player-vars="{ start: 0, autoplay: 0, allowfullscreen: 0, playsinline: 1}" :video-id="videoId" @ready="videoReady" @ended="playbackNext"></youtube>
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

import SONGS_DATA from '../../SONGS_DATA.json'

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
      didPlayLongEnough: false,
      // current video data
      videoId: '',
      videoMeta: '',
      videoBackground: '',
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
      this.notificationMessage = 'You disliked the song :('
      this.showNotification(true)
    },
    playbackLiked () {
      this.notificationMessage = 'You liked the song :)'
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
      this.notificationMessage = 'Playing '
      switch (playlist) {
        case 'smart':
          this.notificationMessage += 'smart playlist '
          this.chosenPlaylist = this.songs
          break
        case 'fresh':
          this.notificationMessage += 'fresh playlist '
          this.chosenPlaylist = this.fresh
          break
        case 'energy':
          this.notificationMessage += 'energizing playlist '
          this.chosenPlaylist = this.energy
          break
        case 'chill':
          this.notificationMessage += 'relaxing playlist '
          this.chosenPlaylist = this.chill
          break
        case 'classy':
        default:
          this.notificationMessage += 'classical playlist '
          this.chosenPlaylist = this.classy
      }
      this.shuffleArray(this.chosenPlaylist)
      this.notificationMessage += 'now'
      this.showNotification(true)
      this.chosenSong = 0
      this.pickSong()
    },
    pickSong () {
      this.videoId = this.chosenPlaylist[this.chosenSong].videoId
      this.videoMeta = this.chosenPlaylist[this.chosenSong].meta
      this.videoBackground = this.chosenPlaylist[this.chosenSong].coverUrl
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

</style>
