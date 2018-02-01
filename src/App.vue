<template>
  <div id="app">
    <router-view/>
    <PrototypeManager :managerProps="managerProps"/>
  </div>
</template>

<script>

import '@/styles/main.css'
import PrototypeManager from './components/PrototypeManager-v-0-4'

export default {
  name: 'app',
  data () {
    return {
      toggleManager: false,
      managerProps: {
        name: 'prototypeName',
        description: 'prototypeDescription',
        author: 'prototypeAuthor',
        website: 'authorWebsite',
        date: 'prototypeDate',
        iterations: [
          {
            name: 'C',
            description: 'variantDescription',
            versions: [
              {
                name: '1',
                description: 'versionDescription'
              }
            ]
          },
          {
            name: 'B',
            description: 'variantDescription',
            versions: [
              {
                name: '1',
                description: 'versionDescription'
              }
            ]
          },
          {
            name: 'A',
            description: 'variantDescription',
            versions: [
              {
                name: '1',
                description: 'versionDescription'
              }
            ]
          }
        ]
      }
    }
  },
  components: {
    PrototypeManager
  }
}
</script>

<style lang="scss">
</style>
