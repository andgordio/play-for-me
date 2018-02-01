<template>
  <div id="manager">
    <div class="menu-button-container">
      <button class="w-12 h-12 rounded-full bg-white shadow-md text-grey" :class="{fab: $route.name === 'Home'}" @click="openManager()">
        <span v-if="isHome" class="icon ion-android-menu text-2xl"></span>
        <span class="text-sm" v-else>{{selectedVersion}}</span>
      </button>
    </div>
    <transition name="toggleShade">
      <div class="shade" v-if="toggleManager" @click="toggleManager = !toggleManager">
      </div>
    </transition>
    <transition name="toggleManager">
      <div v-if="toggleManager" class="content-container" style="">

        <!-- <div class="flexy padding-vert-m padding-hor-m prototype-header" :class="{shadowy: didScroll}" style="flex: 0 0 auto; min-height: 56px; z-index: 100; transition: all .4s;"> -->
        <div class="flex items-center px-6" :class="{shadowy: didScroll}" style="min-height: 56px; z-index: 100; transition: all .4s;">
          <h3 class="flex-1 text-2xl">Prototype manager</h3>
          <div class="" @click="toggleManager = !toggleManager">
            <button class="pt-2">
              <span class="icon ion-android-close text-xl text-grey"></span>
            </button>
          </div>
        </div>

        <div id="watchMeScroll" @scroll="checkScrollPosition" class="flex-1 overflow-y-scroll">
          <ul class="list borderless list-reset pt-4">
            <li class="mx-3 px-3 py-3 rounded" @click="goHome()" :class="{selected: $route.name === 'Home'}">
              <div class="content cursor-pointer">
                <div class="text-base">Home</div>
                <div class="text-sm opacity-50 pt-1" style="padding-top:2px;">Project Meta</div>
              </div>
            </li>
          </ul>

          <div v-for="(iteration, i) in managerProps.iterations" :key="i">
            <div class="">
              <div class="px-6 pt-8 pb-3 uppercase text-sm opacity-50">{{iteration.description}}</div>
              <!--<h4>{{iteration.description}}</h4> {{iteration.name}}. -->
              <!-- <p>Iteration {{iteration.name}}</p> -->
            </div>
            <ul class="list borderless list-reset">
              <li class="mx-3 px-3 py-3 rounded" v-for="(version, j) in iteration.versions" :key="j" @click="openPrototype(iteration.name,version.name)" :class="{selected: isSelected(iteration.name,version.name)}">
                <div class="content cursor-pointer">
                  <div class="text-base">{{iteration.name}}{{version.name}}</div>
                  <div class="text-sm opacity-50" style="padding-top:2px;">{{version.description}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'PrototypeManager',
  props: [
    'managerProps'
  ],
  data () {
    return {
      scrollable: null,
      didScroll: false,
      toggleManager: false
    }
  },
  computed: {
    selectedVersion () {
      // if (this.$route.name === 'ShoppingCart' || this.$route.name === 'Start' || this.$route.name === 'Checkout' || this.$route.name === 'Complete') {
      // return 'D2'
      // } else if (this.$route.name === 'ShoppingCart2' || this.$route.name === 'Start2' || this.$route.name === 'Checkout2' || this.$route.name === 'Complete2') {
      // return 'D3'
      // } else {
      return this.$route.name
      // }
    },
    isHome () {
      return this.$route.name === 'Home'
    }
  },
  methods: {
    checkScrollPosition () {
      if (this.scrollable.scrollTop > 10) {
        this.didScroll = true
      } else {
        this.didScroll = false
      }
    },
    openManager () {
      this.toggleManager = true
      setTimeout(() => {
        this.scrollable = document.getElementById('watchMeScroll')
      }, 500)
    },
    openPrototype (iteration, version) {
      this.toggleManager = false
      this.$router.push('/' + iteration + '/' + version)
    },
    goHome () {
      this.toggleManager = false
      this.$router.push('/')
    },
    isSelected (iteration, version) {
      // if (this.$route.name === 'ShoppingCart' || this.$route.name === 'Start' || this.$route.name === 'Checkout' || this.$route.name === 'Complete') {
      // return iteration + '' + version === 'D2'
      // } else if (this.$route.name === 'ShoppingCart2' || this.$route.name === 'Start2' || this.$route.name === 'Checkout2' || this.$route.name === 'Complete2') {
      // return iteration + '' + version === 'D3'
      // } else {
      return this.$route.name === iteration + '' + version
      // }
    }
  },
  created () {
    //
  }
}
</script>

<style lang="scss" scoped>

#manager {
  font-family: 'Roboto', -apple-system, 'Segoe UI', sans-serif;
}

.shadowy {
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
}

.fab {
  color: white;
  background-color: #409EFF !important;
}

.menu-button-container {
  z-index: 600;
  position: fixed;
  bottom: 24px;
  right: 24px;
}

.content-container {
  z-index: 700;
  position: fixed;
  width: 360px;
  height: 100vh;
  right: 0px;
  bottom: 0px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.shade {
  z-index: 601;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #050a0f;
  opacity: 0.95;
}

.button-icon {
  &.dark {
    opacity: 1;
  }
}

h4 {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  color: #2D2F33;
  opacity: 0.3;
  padding: 24px 16px 8px 24px;
}

.list.borderless {
  border: none;
  & li {
    border: none;
    & .content {
      border: none;
    }
  }
  //
  margin-top: 0;
  & li {
    // margin: 0px 12px;
    // padding: 8px 12px;
    // border-radius: 8px;

    &.selected {
      background-color: #409EFF !important;
      color: white;
    }

    &:hover {
      background-color: rgb(241, 241, 241);
    }

    & .content {
      margin: 0;
      padding: 0;
    }
  }
}

.toggleManager-enter-active, .toggleManager-leave-active {
  transition: all .4s;
}
.toggleManager-enter, .toggleManager-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(360px, 0);
  // opacity: 0;
}

.toggleShade-enter-active {
  transition: all .3s;
}
.toggleShade-leave-active {
  transition: all .4s;
}

.toggleShade-enter, .toggleShade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
